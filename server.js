require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Store the last request details
let lastRequestDetails = null;

// Load OAuth configurations
let oauthConfigs = {};
try {
  const configFile = fs.readFileSync(path.join(__dirname, "oauth-configs.json"), "utf8");
  oauthConfigs = JSON.parse(configFile);
  console.log(`✅ Loaded ${Object.keys(oauthConfigs).length} OAuth provider configurations`);
} catch (error) {
  console.error("⚠️  Failed to load oauth-configs.json:", error.message);
}

// Utility: Resolve ${ENV_VAR} placeholders in config
function resolveEnvVars(value) {
  if (typeof value === "string") {
    return value.replace(/\$\{([^}]+)\}/g, (match, envVar) => {
      return process.env[envVar] || match;
    });
  }
  if (Array.isArray(value)) {
    return value.map(resolveEnvVars);
  }
  if (typeof value === "object" && value !== null) {
    const resolved = {};
    for (const [key, val] of Object.entries(value)) {
      resolved[key] = resolveEnvVars(val);
    }
    return resolved;
  }
  return value;
}

// Utility: Resolve {{tokens.field}} and {{userInfo.field}} placeholders
function resolveDataPlaceholders(value, data) {
  if (typeof value === "string") {
    return value.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      const parts = path.split(".");
      let result = data;
      for (const part of parts) {
        result = result?.[part];
      }
      return result !== undefined ? result : match;
    });
  }
  if (Array.isArray(value)) {
    return value.map((v) => resolveDataPlaceholders(v, data));
  }
  if (typeof value === "object" && value !== null) {
    const resolved = {};
    for (const [key, val] of Object.entries(value)) {
      resolved[key] = resolveDataPlaceholders(val, data);
    }
    return resolved;
  }
  return value;
}

// Get resolved config for a provider
function getProviderConfig(providerId) {
  const config = oauthConfigs[providerId];
  if (!config) {
    return null;
  }
  return resolveEnvVars(config);
}

// Middleware to capture request details
app.use((req, res, next) => {
  // Capture details for all GET requests (not just root)
  if (req.method === "GET") {
    lastRequestDetails = {
      method: req.method,
      path: req.path,
      protocol: req.protocol,
      host: req.get("host"),
      headers: req.headers,
      query: req.query,
      ip: req.ip || req.connection.remoteAddress,
      timestamp: new Date().toISOString(),
      url: req.originalUrl,
    };
  }
  next();
});

// API endpoint to get request details
app.get("/api/request-details", (req, res) => {
  res.json(lastRequestDetails || {});
});

// API endpoint to list available providers
app.get("/api/providers", (req, res) => {
  const providers = Object.entries(oauthConfigs).map(([id, config]) => ({
    id,
    name: config.name,
    description: config.description || "",
  }));
  res.json(providers);
});

// Root route - provider selection page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "providers.html"));
});

// Manual mode route - original parameter display
app.get("/manual", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// OAuth Authorization Endpoint
app.get("/oauth/authorize", (req, res) => {
  const { provider } = req.query;

  if (!provider) {
    return res.status(400).send("Missing provider parameter");
  }

  const config = getProviderConfig(provider);
  if (!config) {
    return res.status(404).send(`Provider '${provider}' not found`);
  }

  // Build authorization URL
  const authUrl = new URL(config.authEndpoint);
  authUrl.searchParams.set("client_id", config.clientId);
  authUrl.searchParams.set("response_type", config.responseType);
  authUrl.searchParams.set("redirect_uri", config.redirectUri);

  // Add scopes if configured
  if (config.scopes && config.scopes.length > 0) {
    authUrl.searchParams.set("scope", config.scopes.join(" "));
  }

  // Add state parameter with provider ID for callback
  authUrl.searchParams.set("state", provider);

  console.log(`🔐 Redirecting to ${config.name} authorization...`);
  res.redirect(authUrl.toString());
});

// OAuth Callback Endpoint
app.get("/oauth/callback", async (req, res) => {
  const { code, error, error_description, state } = req.query;

  // Handle authorization errors
  if (error) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Error</title>
          <link rel="stylesheet" href="/styles/style.min.css">
        </head>
        <body>
          <div id="auth-code-container">
            <h1>❌ Authorization Failed</h1>
            <p style="color: white;">Error: ${error}</p>
            ${error_description ? `<p style="color: rgba(255,255,255,0.7);">${error_description}</p>` : ""}
            <a href="/" style="color: #f0f; text-decoration: underline;">Back to Provider Selection</a>
          </div>
        </body>
      </html>
    `);
  }

  if (!code) {
    return res.status(400).send("No authorization code received");
  }

  const providerId = state;
  if (!providerId) {
    return res.status(400).send("Missing state parameter");
  }

  const config = getProviderConfig(providerId);
  if (!config) {
    return res.status(404).send(`Provider '${providerId}' not found`);
  }

  try {
    console.log(`🔄 Exchanging authorization code for ${config.name}...`);

    // Exchange authorization code for tokens
    const tokenResponse = await fetch(config.tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...(config.headers || {}),
      },
      body: new URLSearchParams({
        code: code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: config.grantType,
        redirect_uri: config.redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Token exchange failed: ${tokenResponse.status} ${errorText}`);
    }

    const tokens = await tokenResponse.json();
    console.log(`✅ Successfully obtained tokens for ${config.name}`);

    // Fetch user info if endpoint is configured
    let userInfo = null;
    if (config.userInfoEndpoint) {
      console.log(`👤 Fetching user info from ${config.name}...`);
      const userResponse = await fetch(config.userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          ...(config.headers || {}),
        },
      });

      if (userResponse.ok) {
        userInfo = await userResponse.json();
        console.log(`✅ Successfully fetched user info`);
      } else {
        console.warn(`⚠️  Failed to fetch user info: ${userResponse.status}`);
      }
    }

    // Fetch company info if endpoint is configured (for Harvest)
    let companyInfo = null;
    if (config.companyInfoEndpoint) {
      console.log(`🏢 Fetching company info from ${config.name}...`);
      const companyResponse = await fetch(config.companyInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          ...(config.headers || {}),
        },
      });

      if (companyResponse.ok) {
        companyInfo = await companyResponse.json();
        console.log(`✅ Successfully fetched company info: ${companyInfo.name} (ID: ${companyInfo.id})`);
        console.log(`📋 Company data:`, JSON.stringify(companyInfo, null, 2));
      } else {
        console.warn(`⚠️  Failed to fetch company info: ${companyResponse.status}`);
      }
    }

    // Execute postExchange hook if configured
    let postExchangeResult = null;
    if (config.postExchange && config.postExchange.enabled) {
      console.log(`🔗 Executing postExchange hook...`);
      try {
        const payload = resolveDataPlaceholders(config.postExchange.mapping, {
          tokens,
          userInfo,
          companyInfo,
        });

        const postResponse = await fetch(config.postExchange.url, {
          method: config.postExchange.method || "POST",
          headers: config.postExchange.headers || {},
          body: JSON.stringify(payload),
        });

        if (postResponse.ok) {
          postExchangeResult = await postResponse.json();
          console.log(`✅ postExchange hook succeeded`);
        } else {
          const errorText = await postResponse.text();
          console.error(`❌ postExchange hook failed: ${postResponse.status} ${errorText}`);
        }
      } catch (postError) {
        console.error(`❌ postExchange hook error:`, postError);
      }
    }

    // Redirect to success page with data
    const successData = {
      provider: config.name,
      providerId,
      tokens,
      userInfo,
      companyInfo,
      postExchangeResult,
    };

    // Store in temporary session (in production, use proper session management)
    global.lastOAuthResult = successData;

    res.redirect("/oauth/success");
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>OAuth Error</title>
          <link rel="stylesheet" href="/styles/style.min.css">
        </head>
        <body>
          <div id="auth-code-container">
            <h1>❌ OAuth Error</h1>
            <p style="color: white;">${error.message}</p>
            <a href="/" style="color: #f0f; text-decoration: underline;">Back to Provider Selection</a>
          </div>
        </body>
      </html>
    `);
  }
});

// OAuth Success Page
app.get("/oauth/success", (req, res) => {
  res.sendFile(path.join(__dirname, "success.html"));
});

// API endpoint to get OAuth result data
app.get("/api/oauth-result", (req, res) => {
  res.json(global.lastOAuthResult || {});
});

// Serve static files from the root directory (after routes)
app.use(express.static(__dirname));

// Catch-all route: serve index.html for ALL other paths
// This allows any URL (e.g., /oauth/callback, /callback, /anything) to work
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 OAuth Callback URL: http://localhost:${PORT}`);
});
