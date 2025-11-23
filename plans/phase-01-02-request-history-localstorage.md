# Phase 1: Request History with LocalStorage

**Phase:** 1 - Quick Wins (Foundation)  
**Priority:** High  
**Estimated Time:** 3-4 hours

## Overview

Implement a history system that stores recent OAuth callbacks in localStorage, allowing developers to review past requests, compare parameters, and restore previous states.

## Tasks

- [ ] Create history storage system using localStorage
- [ ] Store last 50 requests with timestamp, type, and parameters
- [ ] Add "History" button/panel to view past requests
- [ ] Display history in reverse chronological order (newest first)
- [ ] Add search/filter functionality (by parameter name or value)
- [ ] Include "Clear History" button with confirmation
- [ ] Add "Restore Request" feature to reload parameters from history
- [ ] Show request count and storage usage indicator

## Technical Details

**Files to create/modify:**

- `index.html` - Add history panel UI
- `utils/history.js` - History management functions (new file)
- `styles/style.scss` - Style history panel

**Data structure:**

```javascript
{
  id: "uuid",
  timestamp: 1234567890,
  type: "oauth_callback",
  url: "http://localhost:3000?code=...",
  parameters: { code: "...", state: "..." },
  headers: { ... }
}
```

**LocalStorage key:** `localhost_request_history`

## Success Criteria

- [ ] History stores up to 50 requests
- [ ] Old requests are automatically pruned when limit exceeded
- [ ] Search/filter works on parameter names and values
- [ ] Restore feature correctly repopulates the page
- [ ] Clear history requires confirmation
- [ ] Storage usage indicator shows percentage used

## Dependencies

- Request Inspector Enhancement (to capture full request data)

## Notes

- Consider adding export functionality (JSON download)
- Add visual indicators for different request types
- Implement keyboard shortcuts (Ctrl+H to open history)
- Consider adding "Pin" feature for important requests
