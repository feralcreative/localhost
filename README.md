# Localhost OAuth Callback Server

A lightweight local development server for capturing OAuth 2.0 authorization codes and callback parameters.

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Purpose

When developing OAuth integrations, you need a local callback URL to receive authorization codes. This server provides a simple, visual interface to capture and copy those codes without setting up a full application.

## ✨ Features

- 🚀 **Express server** on port 3000
- 📋 **Displays all query parameters** dynamically
- 📝 **Individual copy buttons** for each parameter
- 🎨 **Auto-sizing textareas** that fit content perfectly
- 🔄 **Live reload** with BrowserSync during development
- 💅 **Clean, modern UI** with custom styling
- 🔒 **Localhost only** - secure by default

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm run dev

# 3. Use as your OAuth callback URL
# http://localhost:3000
```

That's it! The server will capture any query parameters sent to it.

## 📸 Screenshot

When an OAuth provider redirects to your callback URL with parameters like:

```text
http://localhost:3000?code=abc123&state=xyz789
```

You'll see a clean interface displaying each parameter with its own copy button.

## 🔧 Usage

### As OAuth Callback URL

Register `http://localhost:3000` as your OAuth callback URL with your provider:

- **Google OAuth:** Add to "Authorized redirect URIs"
- **GitHub OAuth:** Add to "Authorization callback URL"
- **Microsoft OAuth:** Add to "Redirect URIs"
- **Any OAuth 2.0 provider:** Use as callback/redirect URI

### Development Mode

```bash
npm run dev
```

- Starts Express server on `http://localhost:3000`
- Starts BrowserSync on `http://localhost:3001` (with live reload)
- Watches for file changes and auto-refreshes browser

### Production Mode

```bash
npm start
```

- Starts Express server only on `http://localhost:3000`
- No live reload (lighter weight)

## 📦 What's Included

```text
localhost/
├── index.html          # OAuth callback page
├── server.js           # Express server
├── package.json        # Dependencies and scripts
├── styles/
│   ├── style.scss      # Source styles (edit this)
│   └── style.min.css   # Compiled styles (auto-generated)
└── images/
    └── background.jpg  # Background image
```

## 🛠️ Technology Stack

- **Node.js** - Runtime
- **Express.js** `^4.18.2` - Web server
- **BrowserSync** `^3.0.2` - Live reload
- **Concurrently** `^8.2.2` - Run multiple commands
- **SCSS** - Styling (compiled via VS Code extension)
- **Font Awesome** `6.5.1` - Icons (CDN)

## 📖 Common OAuth Parameters

The server displays all query parameters. Common OAuth parameters include:

| Parameter           | Description                         |
| ------------------- | ----------------------------------- |
| `code`              | Authorization code (most common)    |
| `state`             | CSRF protection token               |
| `error`             | Error code if authorization failed  |
| `error_description` | Human-readable error message        |
| `access_token`      | Direct access token (implicit flow) |
| `token_type`        | Usually "Bearer"                    |
| `expires_in`        | Token expiration time               |

## 🔍 Testing

Test the server with query parameters:

```bash
# Test with single parameter
open "http://localhost:3000?code=test123"

# Test with multiple parameters
open "http://localhost:3000?code=abc123&state=xyz789&error=none"
```

## 🐛 Troubleshooting

### Port already in use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### CSS not updating

1. Check Live Sass Compile is running in VS Code
2. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### Copy button not working

- Verify you're on `localhost` (Clipboard API requires secure context)
- Check browser console for errors
- Try a different browser

## 📝 Configuration

### Change Port

Edit `server.js` line 5:

```javascript
const PORT = 3000; // Change to your preferred port
```

Also update `package.json` line 8 to match.

### Customize Styling

Edit `styles/style.scss` and save. If using VS Code with Live Sass Compile extension, it will auto-compile to `style.min.css`.

## 🤝 Contributing

This is a simple local development tool. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use this for any purpose.

## 🔗 Related Resources

- [OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749)
- [Express.js Documentation](https://expressjs.com/)
- [BrowserSync Documentation](https://browsersync.io/docs)

## 💡 Tips

- **Use with ngrok** for HTTPS callbacks: `ngrok http 3000`
- **Multiple OAuth providers?** This server works with all of them
- **Need history?** Consider adding localStorage persistence (see roadmap)

## 🗺️ Roadmap

- [ ] Error handling for Clipboard API
- [ ] localStorage persistence for parameter history

## 📚 Documentation

For detailed documentation, see [`_AI_AGENT_PRIMER.md`](./_AI_AGENT_PRIMER.md) - a comprehensive guide for developers and AI agents.
