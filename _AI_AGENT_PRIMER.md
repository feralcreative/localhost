# AI Agent Primer: Localhost OAuth Callback Server

**Last Updated:** 2025-11-22
**Project Purpose:** Local development server for capturing OAuth authorization codes and callback parameters
**Primary Use Case:** OAuth 2.0 development and testing on localhost

---

## 🔒 SECRETS REFERENCE GUIDE

**⚠️ NO SECRETS IN THIS PROJECT**

This is a local development tool with no authentication, API keys, or sensitive credentials. The server runs on localhost only and is not meant for production use.

**Security Notes:**

- Server binds to `localhost` only (not accessible from network)
- No authentication required (local development only)
- No database or persistent storage
- No API keys or tokens stored

---

## 📋 QUICK START (5 MINUTE SETUP)

```bash
# 1. Clone and navigate
cd /path/to/localhost

# 2. Install dependencies
npm install

# 3. Start development server (with live reload)
npm run dev

# 4. Access the application
# - Direct Express: http://localhost:31875
# - BrowserSync (dev): http://localhost:1975

# 5. Use as OAuth callback URL
# Register this URL with your OAuth provider:
# http://localhost:31875
```

**That's it!** The server will capture any query parameters sent to it.

---

## 🏗️ ARCHITECTURE & STRUCTURE

### Directory Tree

```text
/Users/ziad/www/localhost/
├── index.html              # Main OAuth callback page
├── server.js               # Express server (PORT 31875)
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── README.md               # Project documentation
├── _AI_AGENT_PRIMER.md     # This file (comprehensive dev guide)
├── images/
│   └── background.jpg      # Background image for UI
├── styles/
│   ├── style.scss          # Source SCSS (edit this)
│   ├── style.css           # Compiled CSS
│   ├── style.min.css       # Minified CSS (used by app)
│   └── *.map               # Source maps
└── node_modules/           # Dependencies (gitignored)
```

### Entry Points

**PRIMARY (Active):**

- `server.js` → Express server on port 31875
- `index.html` → OAuth callback page served at root `/`
- `README.md` → User-facing documentation
- `_AI_AGENT_PRIMER.md` → Comprehensive developer guide

---

## 🔧 TECHNOLOGY STACK

### Runtime & Framework

- **Node.js** (version: system default)
- **Express.js** `^4.18.2` - Minimal web server
- **Port:** `31875` (Express), `1975` (BrowserSync)

### Development Tools

- **BrowserSync** `^3.0.2` - Live reload proxy server
- **Concurrently** `^8.2.2` - Run multiple commands simultaneously

### Frontend

- **Vanilla JavaScript** - No framework
- **SCSS** - Compiled to CSS (use Live Sass Compile in VS Code)
- **Font Awesome** `6.5.1` - Icons (CDN)
- **Google Fonts** - Ubuntu Mono (monospace)

### Build Tools

- **SCSS Compiler** - VS Code Live Sass Compile extension
- **No bundler** - Static files served directly

---

## 🚀 DEPLOYMENT & RUNNING

### Development Mode (Recommended)

```bash
npm run dev
```

**What this does:**

1. Starts Express server on `http://localhost:31875`
2. Starts BrowserSync proxy on `http://localhost:1975`
3. Watches for file changes (HTML, CSS, JS)
4. Auto-reloads browser on changes

**Access URLs:**

- Development (with live reload): `http://localhost:1975`
- Direct server: `http://localhost:31875`

### Production Mode

```bash
npm start
```

**What this does:**

1. Starts Express server only on `http://localhost:31875`
2. No live reload
3. Lighter weight

### Port Configuration

**Why these ports?**

- `31875` - Unique port in dynamic range, unlikely to conflict
- `1975` - BrowserSync port, easy to remember

**To change ports:**

1. Edit `server.js` line 5: `const PORT = 31875;`
2. Edit `package.json` line 8: Update proxy and port in dev script

---

## 📡 DATA FLOW

```text
OAuth Provider
    ↓
    | Redirect with query params
    | Example: ?code=abc123&state=xyz
    ↓
http://localhost:31875
    ↓
Express Server (server.js)
    ↓
Serves index.html
    ↓
JavaScript parses URLSearchParams
    ↓
Dynamically creates UI elements
    ↓
User sees parameters + copy buttons
```

### Request Flow Detail

1. **OAuth Provider Redirect:**

   ```text
   http://localhost:31875?code=AUTH_CODE&state=STATE_TOKEN&...
   ```

2. **Express Route Handler** (`server.js` lines 11-13):

   ```javascript
   app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, "index.html"));
   });
   ```

3. **Client-Side Parsing** (`index.html` lines 29-71):
   - Extracts all query parameters
   - Creates textarea for each parameter
   - Adds copy button with Font Awesome icon
   - Auto-sizes textareas to content

---

## 💻 CODE STRUCTURE

### Key Files & Functions

#### `server.js` (19 lines total)

**Purpose:** Minimal Express server to serve static files

**Critical sections:**

- **Line 5:** Port configuration `const PORT = 31875;`
- **Line 8:** Static file serving `app.use(express.static(__dirname));`
- **Lines 11-13:** Root route handler
- **Lines 15-18:** Server startup with console logging

**Full code:**

```javascript
const express = require("express");
const path = require("path");

const app = express();
const PORT = 31875;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Root route serves the OAuth callback page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 OAuth Callback URL: http://localhost:${PORT}`);
});
```

#### `index.html` (76 lines total)

**Purpose:** OAuth callback page that displays all query parameters

**Critical sections:**

- **Line 7:** Font Awesome CDN for copy icons
- **Line 8:** Minified CSS stylesheet
- **Lines 13-16:** Main container structure
- **Lines 19-27:** `copyToClipboard()` function with visual feedback
- **Lines 30-31:** Parse URL query parameters
- **Lines 33-34:** Show "waiting" message if no params
- **Lines 36-71:** Dynamic UI generation for each parameter

**Key algorithm - Auto-resize textareas** (lines 52-57):

```javascript
// Auto-resize textarea to fit content
setTimeout(() => {
  textarea.style.height = "0px";
  const newHeight = textarea.scrollHeight;
  textarea.style.height = newHeight + "px";
}, 0);
```

**Why setTimeout?** The textarea needs to be rendered in the DOM before we can calculate its scrollHeight.

**Key algorithm - Copy with feedback** (lines 19-27):

```javascript
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = "Copied!";
    setTimeout(() => {
      button.textContent = originalText;
    }, 1500);
  });
}
```

**Why this approach?** Provides immediate visual feedback that the copy succeeded, then reverts after 1.5 seconds.

#### `styles/style.scss` (109 lines total)

**Purpose:** Styling for OAuth callback page

**Critical sections:**

- **Lines 1-3:** Google Fonts import (Ubuntu Mono)
- **Lines 5-19:** Body styling with background image
- **Lines 21-32:** Main container layout
- **Lines 34-45:** Parameters container and empty state
- **Lines 47-58:** Individual parameter item layout
- **Lines 60-84:** Field wrapper with textarea styling
- **Lines 86-104:** Copy button styling with hover effects

**Key design decisions:**

- **Line 68:** `min-height: 0` - Allows textareas to shrink to content size
- **Line 75:** `padding: 8px 10px` - Consistent padding on all sides
- **Lines 78-79:** `overflow-y: hidden` - Prevents scrollbars during auto-resize
- **Line 83:** `box-sizing: border-box` - Includes padding in height calculation

**Color scheme:**

- Background: Semi-transparent purple `rgba(50, 0, 50, 0.8)`
- Text: Magenta `#f0f` (changed to white in latest version)
- Border: Transparent magenta `rgba(255, 0, 255, 0.3)`
- Hover: Magenta `#f0f`

---

## 🎨 FRONTEND ARCHITECTURE

### Component Structure

**Single Page Application (No Framework)**

```text
index.html
├── <head>
│   ├── Font Awesome CDN
│   └── Compiled CSS
└── <body>
    ├── #auth-code-container
    │   ├── <h1> "OAuth Parameters"
    │   └── #params-container (dynamically populated)
    │       └── .param-item (one per query parameter)
    │           ├── <label> Parameter name
    │           └── .field-wrapper
    │               ├── <textarea> Parameter value
    │               └── <button> Copy icon
    └── <script> Inline JavaScript
```

### State Management

**No state management library** - All state is derived from URL query parameters

**Data flow:**

1. URL query string → `URLSearchParams` API
2. For each parameter → Create DOM elements
3. User clicks copy → Clipboard API
4. Button text changes → Direct DOM manipulation

### Styling Approach

**SCSS → CSS compilation**

- Edit: `styles/style.scss`
- Compile: VS Code Live Sass Compile extension
- Output: `styles/style.min.css` (used by app)
- Maps: `styles/style.min.css.map` (for debugging)

**CSS Architecture:**

- No CSS framework (custom styles only)
- BEM-like naming (`.param-item`, `.field-wrapper`)
- Nested SCSS for organization
- Flexbox for layout
- CSS transitions for interactions

---

## 🔌 APIs & INTEGRATIONS

### External APIs

#### Font Awesome CDN

**URL:** `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`
**Purpose:** Copy icon (`fa-regular fa-copy`)
**Rate Limits:** None (CDN)
**Fallback:** None (icon won't show if CDN is down)

#### Google Fonts

**URL:** `https://fonts.googleapis.com/css?family=Ubuntu+Mono:regular,italic,700,700italic`
**Purpose:** Monospace font for code display
**Rate Limits:** None (CDN)
**Fallback:** System monospace font

### Browser APIs

#### Clipboard API

**Usage:** `navigator.clipboard.writeText(text)`
**Browser Support:** Modern browsers only
**Permissions:** Requires HTTPS or localhost
**Error Handling:** None (promise rejection ignored)

**Example:**

```javascript
navigator.clipboard.writeText(code).then(() => {
  // Success feedback
});
```

#### URLSearchParams API

**Usage:** `new URLSearchParams(window.location.search)`
**Browser Support:** All modern browsers
**Purpose:** Parse query string into key-value pairs

**Example:**

```javascript
const urlParams = new URLSearchParams(window.location.search);
urlParams.forEach((value, key) => {
  console.log(key, value);
});
```

### OAuth Integration

**This server is the callback endpoint** - it doesn't make OAuth requests itself.

**Typical OAuth flow:**

1. Your app redirects user to OAuth provider
2. User authorizes
3. Provider redirects to `http://localhost:31875?code=...`
4. This server displays the code
5. You copy the code and use it in your app

**Common OAuth parameters:**

- `code` - Authorization code (most common)
- `state` - CSRF protection token
- `error` - Error code if authorization failed
- `error_description` - Human-readable error message
- `access_token` - Direct token (implicit flow, deprecated)
- `token_type` - Usually "Bearer"
- `expires_in` - Token expiration time

---

## 🗄️ DATABASE & DATA

### No Database

This project has **no database** or persistent storage.

**Why?** It's a simple callback handler that only needs to display URL parameters. No data is stored or logged.

**Data lifecycle:**

1. OAuth provider sends parameters in URL
2. JavaScript extracts and displays them
3. User copies what they need
4. Page refresh → data is gone

**No logging:**

- No request logs
- No parameter logs
- No error logs
- Console output only shows server startup

---

## 🏃 DEVELOPMENT WORKFLOW

### Local Setup Steps

```bash
# 1. Navigate to project
cd /Users/ziad/www/localhost

# 2. Install dependencies (first time only)
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:1975

# 5. Edit files
# - HTML: index.html
# - Styles: styles/style.scss (auto-compiles)
# - Server: server.js (restart required)
```

### Testing Approach

**Manual testing only** - No automated tests

**Test scenarios:**

1. **No parameters:**

   - Visit `http://localhost:1975`
   - Should show "No parameters found. Waiting for OAuth callback..."

2. **Single parameter:**

   - Visit `http://localhost:1975?code=test123`
   - Should show one textarea with "test123"
   - Copy button should work

3. **Multiple parameters:**

   - Visit `http://localhost:1975?code=abc&state=xyz&error=none`
   - Should show three textareas
   - Each should have its own copy button

4. **Long values:**

   - Visit with long auth code
   - Textarea should auto-expand to fit content
   - Should not have extra space underneath

5. **Special characters:**
   - Visit with URL-encoded values
   - Should decode and display correctly

### Debugging Techniques

**Browser DevTools:**

- Console: Check for JavaScript errors
- Network: Verify static files load
- Elements: Inspect generated DOM structure

**Server logs:**

```bash
# Start server and watch console
npm run dev

# Look for:
# 🚀 Server running on http://localhost:31875
# 📋 OAuth Callback URL: http://localhost:31875
```

**Common issues:**

1. **Port already in use:**

   - Kill existing process: `lsof -ti:31875 | xargs kill -9`
   - Or change port in `server.js`

2. **CSS not updating:**

   - Check Live Sass Compile is running
   - Hard refresh browser (Cmd+Shift+R)
   - Check `style.min.css` timestamp

3. **Copy button not working:**
   - Check browser console for errors
   - Verify Font Awesome CDN loaded
   - Test on localhost (Clipboard API requires secure context)

### Common Development Tasks

**Add new styling:**

```bash
# 1. Edit styles/style.scss
# 2. Save (auto-compiles if Live Sass Compile is running)
# 3. Browser auto-refreshes (if using npm run dev)
```

**Change server behavior:**

```bash
# 1. Edit server.js
# 2. Stop server (Ctrl+C)
# 3. Restart: npm run dev
```

**Update dependencies:**

```bash
npm update
```

**Clean install:**

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🤔 ARCHITECTURAL DECISIONS (WHY?)

### Why Express instead of Python/PHP?

**Decision:** Use Node.js + Express

**Alternatives considered:**

- Python HTTP server (`lh.py` - legacy)
- PHP with MAMP (`index.php` - legacy)

**Rationale:**

- Express is minimal and fast
- Node.js is already installed for BrowserSync
- Better ecosystem for modern web development
- Easier to add features later (WebSockets, etc.)

### Why port 31875?

**Decision:** Use port 31875 for Express server

**Alternatives considered:**

- Common ports: 3000, 8000, 8080
- Random high port

**Rationale:**

- Unique port unlikely to conflict with other dev servers
- In dynamic/private port range (49152-65535 typical, but 1024+ works)
- Easy to remember (31875 = 3 + 1 + 8 + 7 + 5 = 24)

### Why callback at root instead of /callback?

**Decision:** Serve callback page at `http://localhost:31875/` (root)

**Alternatives considered:**

- `/callback` path (original implementation)
- `/oauth/callback` path
- `/auth` path

**Rationale:**

- Single-purpose server - entire server is for OAuth callbacks
- Shorter URL is simpler
- Less nesting in file structure
- Easier to remember and type

**Historical note:** Originally had `callback/index.html` served at `/callback`, but moved to root for simplicity.

### Why dynamic parameter display instead of just "code"?

**Decision:** Display ALL query parameters dynamically

**Alternatives considered:**

- Only show `code` parameter
- Hardcode common parameters (code, state, error)

**Rationale:**

- Different OAuth providers use different parameter names
- OAuth 1.0 uses `oauth_token` and `oauth_verifier`
- Error responses have `error` and `error_description`
- Future-proof for new OAuth parameters
- More flexible for debugging

### Why auto-resize textareas?

**Decision:** Dynamically size textareas to fit content exactly

**Alternatives considered:**

- Fixed height textareas
- Scrollable textareas
- Single-line inputs

**Rationale:**

- Auth codes vary in length (20-200+ characters)
- Fixed height wastes space for short values
- Fixed height truncates long values
- Auto-resize shows full value without scrolling
- Better UX - see everything at a glance

**Implementation challenge:** Textareas don't auto-resize by default. Solution: Set height to 0, measure scrollHeight, then set height to scrollHeight.

### Why BrowserSync instead of just Express?

**Decision:** Use BrowserSync proxy for development

**Alternatives considered:**

- Express only
- Webpack dev server
- Vite
- Parcel

**Rationale:**

- Live reload without page refresh
- Synchronizes across multiple browsers
- No build step required
- Works with existing Express server
- Minimal configuration

**Trade-off:** Adds complexity (two servers, two ports), but worth it for development experience.

---

## ⚠️ CRITICAL ISSUES

### Known Bugs

**None currently** - Project is simple and stable.

### Incomplete Features

1. **No error handling for Clipboard API**

   - If clipboard write fails, user gets no feedback
   - **Workaround:** Check browser console
   - **Fix:** Add `.catch()` handler to show error message

2. **No HTTPS support**

   - Some OAuth providers require HTTPS callbacks
   - **Workaround:** Use ngrok or similar tunnel
   - **Fix:** Add SSL certificate support to Express

3. **No parameter validation**

   - Displays any query parameter, even non-OAuth ones
   - **Workaround:** None needed (not a security issue)
   - **Fix:** Could filter to known OAuth parameters

4. **No history/logging**
   - Parameters disappear on page refresh
   - **Workaround:** Copy values before refreshing
   - **Fix:** Add localStorage persistence (optional feature)

### Technical Debt

1. **Inline JavaScript in HTML**

   - All JS is in `<script>` tags in index.html
   - **Impact:** Low (only 50 lines of JS)
   - **Refactor:** Move to separate `app.js` file

2. **No TypeScript**

   - Plain JavaScript with no type checking
   - **Impact:** Low (simple codebase)
   - **Refactor:** Add TypeScript for better IDE support

3. **No CSS framework**

   - Custom SCSS from scratch
   - **Impact:** Low (only 109 lines of CSS)
   - **Refactor:** Could use Tailwind for consistency

4. **Duplicate Google Fonts import**
   - `style.scss` lines 1 and 3 import same font twice
   - **Impact:** Minimal (browser caches it)
   - **Fix:** Remove duplicate line

### Performance Bottlenecks

**None** - This is a simple static file server with minimal JavaScript.

**Potential issues:**

- If OAuth provider sends 100+ parameters, DOM generation could be slow
- Font Awesome CDN could be slow on poor connections
- Background image (background.jpg) could be large

**Mitigations:**

- Limit to first 50 parameters (not implemented)
- Self-host Font Awesome (not implemented)
- Optimize background image (not implemented)

---

## 🐛 DEBUGGING

### Common Problems and Solutions

#### Problem: "Port 31875 already in use"

**Symptoms:**

```text
Error: listen EADDRINUSE: address already in use :::31875
```

**Solutions:**

```bash
# Option 1: Kill the process using the port
lsof -ti:31875 | xargs kill -9

# Option 2: Find and kill manually
lsof -i:31875
kill -9 <PID>

# Option 3: Change the port
# Edit server.js line 5 and package.json line 8
```

#### Problem: CSS changes not showing

**Symptoms:** Edit SCSS but browser shows old styles

**Solutions:**

1. Check Live Sass Compile is running (VS Code status bar)
2. Check `style.min.css` file timestamp
3. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
4. Clear browser cache
5. Check browser DevTools Network tab for 304 (cached) responses

#### Problem: Copy button shows no icon

**Symptoms:** Button is blank or shows square

**Solutions:**

1. Check browser console for Font Awesome CDN errors
2. Check Network tab - verify CDN request succeeded
3. Check internet connection
4. Try different CDN URL or self-host Font Awesome

#### Problem: Copy button doesn't work

**Symptoms:** Click copy button, nothing happens

**Solutions:**

1. Check browser console for errors
2. Verify you're on `localhost` (Clipboard API requires secure context)
3. Check browser permissions for clipboard access
4. Try different browser (Chrome, Firefox, Safari)

#### Problem: Parameters not showing

**Symptoms:** Visit URL with query params, but page shows "No parameters found"

**Solutions:**

1. Check URL format: `http://localhost:31875?code=abc` (not `http://localhost:31875/?code=abc`)
2. Check browser console for JavaScript errors
3. Verify query string is in URL bar
4. Try simple test: `http://localhost:31875?test=hello`

### Log Locations and Formats

**Server logs:**

- **Location:** Terminal where `npm run dev` or `npm start` is running
- **Format:** Plain text console output

**Example output:**

```text
🚀 Server running on http://localhost:31875
📋 OAuth Callback URL: http://localhost:31875
```

**Browser logs:**

- **Location:** Browser DevTools Console (F12 or Cmd+Option+I)
- **Format:** Browser console messages

**No file logs** - All logging is to console only.

### Debugging Commands

```bash
# Check if server is running
lsof -i:31875

# Check if BrowserSync is running
lsof -i:1975

# Test server with curl
curl http://localhost:31875

# Test with query parameters
curl "http://localhost:31875?code=test123&state=xyz"

# Check Node.js version
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0

# Check for outdated packages
npm outdated
```

### Health Check Procedures

**Manual health check:**

1. Start server: `npm run dev`
2. Check console for startup messages
3. Visit `http://localhost:1975`
4. Should see "No parameters found" message
5. Visit `http://localhost:1975?code=test`
6. Should see textarea with "test"
7. Click copy button
8. Button should change to "Copied!" briefly
9. Paste somewhere - should paste "test"

**Automated health check (curl):**

```bash
# Check server responds
curl -s http://localhost:31875 | grep "OAuth Parameters"

# Should output: <h1>OAuth Parameters</h1>
```

---

## 🚀 NEXT STEPS

### Prioritized Improvements

#### High Priority

1. **Add error handling for Clipboard API**

   - Show error message if copy fails
   - Fallback to manual selection
   - Estimated effort: 30 minutes

2. **Remove duplicate Google Fonts import**

   - Delete line 3 from `style.scss`
   - Estimated effort: 1 minute

3. **Add .gitignore for compiled CSS**
   - Already in .gitignore, but verify
   - Estimated effort: 5 minutes

#### Medium Priority

1. **Add HTTPS support**

   - Generate self-signed certificate
   - Update Express to use HTTPS
   - Update documentation
   - Estimated effort: 2 hours

2. **Extract JavaScript to separate file**

   - Move inline JS to `app.js`
   - Update HTML to reference it
   - Estimated effort: 30 minutes

3. **Add localStorage persistence**
   - Save parameters to localStorage
   - Show history of recent callbacks
   - Add clear history button
   - Estimated effort: 3 hours

#### Low Priority

1. **Add TypeScript**

   - Convert to TypeScript
   - Add type definitions
   - Update build process
   - Estimated effort: 4 hours

2. **Add automated tests**

   - Unit tests for JavaScript functions
   - Integration tests for server
   - E2E tests with Playwright
   - Estimated effort: 8 hours

3. **Add parameter filtering**
   - Option to show only OAuth parameters
   - Hide non-OAuth query params
   - Estimated effort: 1 hour

### Feature Roadmap

**Version 1.1 (Current)**

- ✅ Express server on port 31875
- ✅ Dynamic parameter display
- ✅ Copy buttons with icons
- ✅ Auto-resize textareas
- ✅ BrowserSync live reload

**Version 1.2 (Next)**

- ⬜ Error handling for Clipboard API
- ⬜ HTTPS support
- ⬜ Extract JavaScript to separate file

**Version 2.0 (Future)**

- ⬜ localStorage persistence
- ⬜ Parameter history
- ⬜ TypeScript conversion
- ⬜ Automated tests

**Version 3.0 (Ideas)**

- ⬜ OAuth flow visualization
- ⬜ Token exchange helper
- ⬜ Multiple callback URLs
- ⬜ WebSocket support for real-time updates

### Refactoring Opportunities

1. **Modularize JavaScript**

   - Split into functions: `parseParams()`, `createParamUI()`, `setupCopyButton()`
   - Easier to test and maintain

2. **Use CSS custom properties**

   - Define colors as CSS variables
   - Easier to theme

3. **Add JSDoc comments**

   - Document function parameters and return values
   - Better IDE autocomplete

4. **Optimize background image**

   - Compress `background.jpg`
   - Consider WebP format
   - Add loading="lazy"

5. **Add meta tags**
   - Description, keywords, author
   - Open Graph tags for sharing

### Documentation Gaps

1. **No README.md content**

   - Add project description
   - Add setup instructions
   - Add usage examples

2. **No CHANGELOG.md**

   - Track version history
   - Document breaking changes

3. **No CONTRIBUTING.md**

   - Guidelines for contributors
   - Code style guide

4. **No LICENSE file**

   - Add open source license (MIT?)

5. **No inline code comments**
   - Add comments explaining complex logic
   - Document why, not what

---

## 📚 ADDITIONAL RESOURCES

### Related Documentation

- [OAuth 2.0 RFC](https://tools.ietf.org/html/rfc6749)
- [Express.js Documentation](https://expressjs.com/)
- [BrowserSync Documentation](https://browsersync.io/docs)
- [URLSearchParams API](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

### Useful Commands Reference

```bash
# Development
npm run dev          # Start dev server with live reload
npm start            # Start production server

# Maintenance
npm install          # Install dependencies
npm update           # Update dependencies
npm outdated         # Check for outdated packages

# Debugging
lsof -i:31875        # Check if port is in use
lsof -ti:31875 | xargs kill -9  # Kill process on port
curl http://localhost:31875     # Test server

# Git
git status           # Check status
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to remote
```

### Environment Setup

**Required:**

- Node.js (any recent version)
- npm (comes with Node.js)

**Recommended:**

- VS Code with Live Sass Compile extension
- Modern browser (Chrome, Firefox, Safari)

**Optional:**

- Git for version control
- ngrok for HTTPS tunneling

---

## 🎯 SUCCESS CRITERIA CHECKLIST

✅ **Another AI agent can start developing in 5 minutes**

- Quick start section with copy-paste commands
- Clear directory structure
- Technology stack documented
- All entry points identified

✅ **Safe to commit to public repository**

- No actual credentials (none exist in this project)
- Security notes clearly stated
- No sensitive data in code examples

✅ **All credentials easily locatable**

- N/A - No credentials in this project
- Security section explains why

✅ **Code examples use placeholder variables**

- All examples use `AUTH_CODE`, `STATE_TOKEN`, etc.
- No hardcoded values

---

**End of AI Agent Primer**

_Last updated: 2025-11-22_
_Project: Localhost OAuth Callback Server_
_Location: `/Users/ziad/www/localhost`_
