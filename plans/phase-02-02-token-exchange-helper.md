# Phase 2: Token Exchange Helper

**Phase:** 2 - High Value Features (Core Utilities)  
**Priority:** High  
**Estimated Time:** 4-5 hours

## Overview

Complete the OAuth flow by adding a token exchange interface. After receiving an authorization code, developers can exchange it for access tokens without writing code.

## Tasks

- [ ] Create new route `/tokens` with token management page
- [ ] Add form with fields: auth code, client_id, client_secret, token_url
- [ ] Add OAuth provider presets (Google, GitHub, Microsoft, etc.)
- [ ] Make POST request to token endpoint with proper headers
- [ ] Display response: access_token, refresh_token, expires_in, scope
- [ ] Calculate and show token expiry time
- [ ] Store tokens in localStorage with labels/names
- [ ] Add "Copy Token" buttons for each token type
- [ ] Show token list with expiry status indicators
- [ ] Add "Delete Token" functionality
- [ ] Implement token refresh flow (if refresh_token available)
- [ ] Add PKCE support for OAuth 2.1 flows
- [ ] Show error responses with helpful debugging info

## Technical Details

**Files to create:**

- `tokens.html` - Token exchange and management page
- `utils/tokens.js` - Token exchange and storage functions

**Files to modify:**

- `server.js` - Add route for `/tokens` and proxy endpoint
- `styles/style.scss` - Add token page styles

**OAuth provider presets:**

```javascript
{
  google: {
    name: "Google",
    token_url: "https://oauth2.googleapis.com/token",
    grant_type: "authorization_code"
  },
  github: {
    name: "GitHub",
    token_url: "https://github.com/login/oauth/access_token",
    grant_type: "authorization_code"
  }
  // ... more providers
}
```

## Success Criteria

- [ ] Form successfully exchanges auth codes for tokens
- [ ] Provider presets auto-populate token URLs
- [ ] Tokens are stored securely in localStorage
- [ ] Token expiry is calculated and displayed
- [ ] Refresh flow works for providers that support it
- [ ] PKCE flow is supported
- [ ] Error messages are helpful and actionable

## Dependencies

- Navigation framework
- JWT Decoder (for inspecting access tokens)

## Notes

- Add link from OAuth callback page to token exchange
- Auto-populate auth code if coming from callback page
- Consider adding token introspection endpoint support
- Add warning about storing tokens in localStorage (dev only)
- Support both JSON and form-urlencoded token responses
