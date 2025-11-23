# Phase 1: JWT Decoder Utility

**Phase:** 1 - Quick Wins (Foundation)  
**Priority:** Medium  
**Estimated Time:** 2-3 hours

## Overview

Create a dedicated page for decoding and inspecting JWT tokens. This is essential for OAuth development as access tokens are often JWTs that need to be examined.

## Tasks

- [ ] Create new route `/jwt` with dedicated page
- [ ] Add textarea for pasting JWT tokens
- [ ] Decode and display header section (algorithm, type)
- [ ] Decode and display payload section (claims, expiry, issued at)
- [ ] Show expiry time in human-readable format with countdown
- [ ] Highlight expired tokens in red
- [ ] Add "Copy Decoded JSON" button for header and payload
- [ ] Validate JWT structure and show errors for malformed tokens
- [ ] Add optional signature verification (if secret provided)
- [ ] Auto-detect and decode tokens from URL parameters

## Technical Details

**Files to create:**

- `jwt.html` - JWT decoder page
- `utils/jwt.js` - JWT decoding functions

**Files to modify:**

- `server.js` - Add route for `/jwt`
- `styles/style.scss` - Add JWT page styles

**JWT structure:**

```text
header.payload.signature
```

Each part is base64url encoded JSON.

## Success Criteria

- [ ] Successfully decodes valid JWT tokens
- [ ] Shows clear error messages for invalid tokens
- [ ] Expiry countdown updates in real-time
- [ ] Expired tokens are visually distinct
- [ ] Auto-detection works from URL like `/jwt?token=...`
- [ ] Signature verification works when secret provided

## Dependencies

- Navigation & UI Framework (for consistent page layout)

## Notes

- Use native JavaScript for base64 decoding (atob)
- Consider adding support for JWE (encrypted JWTs) in future
- Add examples of common JWT claims (sub, iss, aud, exp, iat)
- Consider adding a "Try Example" button with sample JWT
