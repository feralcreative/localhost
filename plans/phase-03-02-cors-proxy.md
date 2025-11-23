# Phase 3: CORS Proxy

**Phase:** 3 - Advanced Features (Power Tools)  
**Priority:** Medium  
**Estimated Time:** 3-4 hours

## Overview

Implement a CORS proxy that allows developers to bypass CORS restrictions during local development. This is useful for testing APIs that don't allow localhost origins.

## Tasks

- [ ] Create new route `/proxy` accepting GET/POST requests
- [ ] Parse target URL from query parameter: `/proxy?url=https://api.example.com`
- [ ] Forward request to target URL with original method and headers
- [ ] Add CORS headers to response (Access-Control-Allow-Origin: \*)
- [ ] Support custom header injection via query params
- [ ] Log all proxied requests with timestamp
- [ ] Add proxy request history
- [ ] Display proxy usage statistics
- [ ] Add whitelist/blacklist for allowed domains
- [ ] Include request/response size indicators
- [ ] Add caching option for repeated requests
- [ ] Show proxy errors with helpful debugging info

## Technical Details

**Files to create:**

- `proxy.html` - Proxy usage and history page
- `utils/proxy.js` - Proxy request handling

**Files to modify:**

- `server.js` - Add proxy route and forwarding logic
- `styles/style.scss` - Add proxy page styles

**Proxy usage:**

```text
GET /proxy?url=https://api.example.com/users
GET /proxy?url=https://api.example.com/users&header_Authorization=Bearer%20token
```

**CORS headers to add:**

```text
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: *
```

## Success Criteria

- [ ] Proxy successfully forwards requests
- [ ] CORS headers are added to all responses
- [ ] Custom headers can be injected
- [ ] Request/response logging works
- [ ] History shows last 50 proxied requests
- [ ] Whitelist/blacklist prevents unauthorized usage
- [ ] Caching improves performance for repeated requests
- [ ] Error messages are helpful

## Dependencies

- Request History system (for proxy history)

## Notes

- Add security warning about proxy usage
- Consider rate limiting to prevent abuse
- Add request timeout configuration
- Consider adding request/response transformation
- Add support for streaming responses
- Consider adding WebSocket proxy support
