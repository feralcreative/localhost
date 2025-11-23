# Phase 1: Request Inspector Enhancement

**Phase:** 1 - Quick Wins (Foundation)  
**Priority:** High  
**Estimated Time:** 2-3 hours

## Overview

Enhance the current OAuth callback page to show detailed request information beyond just query parameters. This provides developers with complete visibility into incoming requests for debugging purposes.

## Tasks

- [ ] Add "Request Details" collapsible section to current OAuth callback page
- [ ] Display HTTP method, path, protocol, and host
- [ ] Show all request headers in formatted table
- [ ] Display user agent, IP address, and timestamp
- [ ] Add "Copy as cURL" button to recreate the request
- [ ] Show query parameters separately from body parameters
- [ ] Add toggle between "Simple View" (current) and "Detailed View"

## Technical Details

**Files to modify:**

- `index.html` - Add new sections for request details
- `styles/style.scss` - Style the new sections
- `server.js` - May need to pass additional request data

**Implementation approach:**

- Use collapsible sections (details/summary HTML elements)
- Create a table layout for headers
- Add JavaScript to generate cURL command from request data
- Use localStorage to remember user's view preference (simple vs detailed)

## Success Criteria

- [ ] Request details section is visible and collapsible
- [ ] All request information is accurately displayed
- [ ] cURL command correctly recreates the request
- [ ] View toggle persists across page reloads
- [ ] UI remains clean and not overwhelming

## Dependencies

None - this is a standalone enhancement to existing functionality.

## Notes

- Keep the simple view as default for new users
- Ensure the detailed view doesn't clutter the main OAuth parameter display
- Consider adding tooltips to explain technical terms (headers, protocol, etc.)
