# Phase 2: Webhook Receiver

**Phase:** 2 - High Value Features (Core Utilities)  
**Priority:** High  
**Estimated Time:** 4-5 hours

## Overview

Create a webhook receiver endpoint that can accept POST/PUT/PATCH requests from external services like Stripe, GitHub, Twilio, etc. This complements the OAuth callback functionality.

## Tasks

- [ ] Create new route `/webhook` accepting POST/PUT/PATCH requests
- [ ] Display webhook page similar to OAuth callback page
- [ ] Show request method, headers, and timestamp
- [ ] Parse and display JSON body with syntax highlighting
- [ ] Parse and display form-urlencoded data
- [ ] Parse and display XML/text bodies
- [ ] Add webhook signature verification helpers (Stripe, GitHub patterns)
- [ ] Show raw body with copy button
- [ ] Add webhook history (separate from OAuth history)
- [ ] Include webhook source detection (Stripe, GitHub, Twilio, etc.)
- [ ] Add "Respond with" feature to send custom responses
- [ ] Create shareable webhook URL display

## Technical Details

**Files to create:**

- `webhook.html` - Webhook display page
- `utils/webhook.js` - Webhook parsing and verification functions

**Files to modify:**

- `server.js` - Add webhook routes
- `styles/style.scss` - Add webhook page styles

**Webhook signature verification:**

- Stripe: HMAC SHA256 with webhook secret
- GitHub: HMAC SHA256 with secret token
- Twilio: SHA1 hash validation

## Success Criteria

- [ ] Accepts POST/PUT/PATCH requests at `/webhook`
- [ ] Displays all request data clearly
- [ ] Correctly parses JSON, form data, and XML
- [ ] Signature verification works for major providers
- [ ] Webhook history stores last 50 webhooks
- [ ] Source detection identifies common providers
- [ ] Custom responses can be configured

## Dependencies

- Request History system (for webhook history)
- Navigation framework (for page layout)

## Notes

- Consider adding ngrok integration instructions
- Add webhook testing with curl examples
- Support multiple webhook endpoints (/webhook/stripe, /webhook/github)
- Add webhook replay functionality
- Consider adding webhook forwarding to other URLs
