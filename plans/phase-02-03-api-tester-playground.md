# Phase 2: API Tester / Playground

**Phase:** 2 - High Value Features (Core Utilities)  
**Priority:** High  
**Estimated Time:** 5-6 hours

## Overview

Create a full-featured API testing interface where developers can make authenticated HTTP requests using stored tokens. This completes the OAuth workflow: callback → token exchange → API testing.

## Tasks

- [ ] Create new route `/api-test` with request builder interface
- [ ] Add HTTP method dropdown (GET, POST, PUT, PATCH, DELETE)
- [ ] Add URL input field with validation
- [ ] Create headers editor (key-value pairs, add/remove rows)
- [ ] Add "Use Token" dropdown to auto-populate Authorization header
- [ ] Create request body editor with JSON syntax highlighting
- [ ] Add body type selector (JSON, form-data, x-www-form-urlencoded, raw)
- [ ] Implement "Send Request" button with loading state
- [ ] Display response status code with color coding (2xx green, 4xx yellow, 5xx red)
- [ ] Show response headers in collapsible section
- [ ] Display response body with JSON formatting and syntax highlighting
- [ ] Add response time indicator
- [ ] Include "Copy as cURL" for the request
- [ ] Save request presets/favorites to localStorage
- [ ] Add request history specific to API tester

## Technical Details

**Files to create:**

- `api-test.html` - API testing interface
- `utils/api-tester.js` - Request building and execution functions

**Files to modify:**

- `server.js` - Add route for `/api-test` and proxy endpoint
- `styles/style.scss` - Add API tester styles

**Request structure:**

```javascript
{
  method: "GET",
  url: "https://api.example.com/users",
  headers: { "Authorization": "Bearer ..." },
  body: { ... },
  bodyType: "json"
}
```

## Success Criteria

- [ ] All HTTP methods work correctly
- [ ] Headers editor is intuitive and functional
- [ ] Token dropdown shows all stored tokens
- [ ] Request body editor supports multiple formats
- [ ] Response is displayed clearly with syntax highlighting
- [ ] Response time is accurate
- [ ] cURL export works correctly
- [ ] Favorites can be saved and loaded
- [ ] Request history stores last 20 requests

## Dependencies

- Token Exchange Helper (for stored tokens)
- Navigation framework
- Syntax highlighting library (Prism.js or highlight.js)

## Notes

- Consider adding environment variables support
- Add request collections/folders
- Support file uploads for multipart/form-data
- Add response size indicator
- Consider adding GraphQL support
- Add keyboard shortcuts (Ctrl+Enter to send)
