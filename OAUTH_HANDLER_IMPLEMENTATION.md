# OAuth Handler Implementation Guide

## Objective

Implement a Harvest OAuth callback handler that exchanges authorization codes for tokens and stores them in Firebase Firestore via Cloud Functions.

## Prerequisites

- Harvest OAuth credentials configured
- Firebase emulators running at `http://127.0.0.1:5001`
- OAuth handler running on `http://localhost:3000`

## Configuration Values

```javascript
const HARVEST_CLIENT_ID = "5V9LpCQBIDIvKsRQ5DpB1aCc";
const HARVEST_CLIENT_SECRET = "PH6DVS4WMODBXhMoe6ItOhaElG-d2ekTm7PKXRBhPlDSKaGDAmfGjC3oKeOIm-adV1e4gyMzCcYrfcVNDqqnAw";
const REDIRECT_URI = "http://localhost:3000/oauth/callback";
const FIREBASE_FUNCTION_URL = "http://127.0.0.1:5001/harvest-feralcreative-co/us-central1/storeHarvestTokens";
const FIREBASE_USER_ID = "ziad@feralcreative.co"; // Email used to sign into Harvest Sync app
```

## Harvest OAuth App Settings

Register this redirect URI in your Harvest OAuth app:

```
http://localhost:3000/oauth/callback
```

## Implementation Steps

### Step 1: Authorization Endpoint

Create an endpoint that redirects users to Harvest authorization:

```javascript
app.get("/oauth/authorize", (req, res) => {
  const authUrl = new URL("https://id.getharvest.com/oauth2/authorize");
  authUrl.searchParams.set("client_id", HARVEST_CLIENT_ID);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);

  res.redirect(authUrl.toString());
});
```

### Step 2: Callback Endpoint

Create the callback endpoint that handles the OAuth response:

```javascript
app.get("/oauth/callback", async (req, res) => {
  const { code, error } = req.query;

  // Handle authorization errors
  if (error) {
    return res.status(400).send(`Authorization failed: ${error}`);
  }

  if (!code) {
    return res.status(400).send("No authorization code received");
  }

  try {
    // STEP 2A: Exchange authorization code for tokens
    const tokenResponse = await fetch("https://id.getharvest.com/api/v2/oauth2/token", {
      method: "POST",
      headers: {
        "User-Agent": "HarvestSync (ziad@feralcreative.co)",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code: code,
        client_id: HARVEST_CLIENT_ID,
        client_secret: HARVEST_CLIENT_SECRET,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Token exchange failed: ${tokenResponse.status} ${errorText}`);
    }

    const tokens = await tokenResponse.json();
    // tokens = { access_token, refresh_token, token_type, expires_in }

    // STEP 2B: Get Harvest account information using /company endpoint
    const companyResponse = await fetch("https://api.harvestapp.com/v2/company", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        "User-Agent": "HarvestSync (ziad@feralcreative.co)",
      },
    });

    if (!companyResponse.ok) {
      const errorText = await companyResponse.text();
      throw new Error(`Failed to get company info: ${companyResponse.status} ${errorText}`);
    }

    const companyData = await companyResponse.json();
    const accountId = companyData.id.toString();
    const accountName = companyData.name;

    // STEP 2C: Store tokens in Firebase via Cloud Function
    const storeResponse = await fetch(FIREBASE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: FIREBASE_USER_ID,
        account: "agency",
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_in: tokens.expires_in,
        account_id: accountId,
        account_name: accountName,
      }),
    });

    if (!storeResponse.ok) {
      const errorText = await storeResponse.text();
      throw new Error(`Failed to store tokens: ${storeResponse.status} ${errorText}`);
    }

    const storeResult = await storeResponse.json();

    // STEP 2D: Success response
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Success</title>
          <style>
            body { font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; }
            .success { color: #22c55e; font-size: 48px; }
            .info { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="success">✓</div>
          <h1>Successfully Connected to Harvest!</h1>
          <div class="info">
            <p><strong>Account:</strong> ${accountName}</p>
            <p><strong>Account ID:</strong> ${accountId}</p>
            <p><strong>Type:</strong> Agency</p>
          </div>
          <p>Tokens have been securely stored. You can close this window.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>OAuth Error</title></head>
        <body>
          <h1>❌ OAuth Error</h1>
          <p>${error.message}</p>
          <a href="/oauth/authorize">Try Again</a>
        </body>
      </html>
    `);
  }
});
```

## Testing Procedure

### 1. Start Firebase Emulators

```bash
cd /Users/ziad/www/feral/harvest-tools
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
firebase emulators:start
```

Verify you see:

```
✔  functions[us-central1-storeHarvestTokens]: http function initialized
```

### 2. Start OAuth Handler

```bash
# In your OAuth handler project
npm start
```

### 3. Test OAuth Flow

1. Navigate to `http://localhost:3000/oauth/authorize`
2. Authorize on Harvest
3. Should redirect back with success message
4. Check Firebase logs for function execution

### 4. Verify Token Storage

Open Firestore Emulator UI: `http://127.0.0.1:4000/firestore`

Look for document at:

```
users/ziad@feralcreative.co/harvestTokens/agency
```

Should contain:

- `access_token`: string
- `refresh_token`: string
- `expires_at`: number (timestamp)
- `expires_in`: number (1209600)
- `account_id`: string
- `account_name`: "Feral Creative"
- `token_type`: "bearer"

## Expected API Responses

### Token Exchange Response

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "bearer",
  "expires_in": 1209600
}
```

### Company Info Response

```json
{
  "id": 789012,
  "name": "Cannonball Creative",
  "base_uri": "https://cannonballcreative.harvestapp.com",
  "full_domain": "cannonballcreative.harvestapp.com",
  "color_scheme": "orange"
}
```

### Firebase Function Response

```json
{
  "success": true
}
```

## Error Handling

Handle these potential errors:

- Missing authorization code
- Token exchange failure (invalid credentials)
- User info fetch failure (invalid token)
- Firebase function failure (network/validation)

## Security Notes

- Never log `access_token` or `refresh_token` values
- Use HTTPS in production
- Validate `state` parameter to prevent CSRF (optional but recommended)
- Store credentials in environment variables, not hardcoded

## Production Deployment

For production, update:

- `REDIRECT_URI` to production domain
- `FIREBASE_FUNCTION_URL` to production Cloud Functions URL:

  ```
  https://us-central1-harvest-feralcreative-co.cloudfunctions.net/storeHarvestTokens
  ```

- Register production redirect URI in Harvest OAuth app
