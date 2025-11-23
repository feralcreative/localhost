# Phase 3: Environment Manager

**Phase:** 3 - Advanced Features (Power Tools)  
**Priority:** Medium  
**Estimated Time:** 4-5 hours

## Overview

Create a system for managing multiple API environments (dev, staging, production) with different configurations. This allows quick switching between different OAuth providers and API endpoints.

## Tasks

- [ ] Create new route `/environments` for configuration management
- [ ] Add environment creation form (name, description)
- [ ] Store multiple environments in localStorage
- [ ] Add fields per environment: API base URL, client_id, client_secret, redirect_uri
- [ ] Create environment switcher dropdown in navigation
- [ ] Auto-populate forms with active environment values
- [ ] Add import/export functionality (JSON format)
- [ ] Include environment duplication feature
- [ ] Add environment deletion with confirmation
- [ ] Show active environment indicator in UI
- [ ] Add optional encryption for sensitive values
- [ ] Create environment variables system (key-value pairs)

## Technical Details

**Files to create:**

- `environments.html` - Environment management page
- `utils/environments.js` - Environment storage and switching functions

**Files to modify:**

- `server.js` - Add route for `/environments`
- `styles/style.scss` - Add environment page styles
- `components/nav.html` - Add environment switcher

**Environment data structure:**

```javascript
{
  id: "uuid",
  name: "Production",
  description: "Production OAuth settings",
  active: true,
  config: {
    api_base_url: "https://api.example.com",
    client_id: "...",
    client_secret: "...",
    redirect_uri: "http://localhost:3000",
    token_url: "...",
    variables: {
      custom_key: "custom_value"
    }
  }
}
```

## Success Criteria

- [ ] Multiple environments can be created and stored
- [ ] Environment switcher updates all forms automatically
- [ ] Import/export works with valid JSON
- [ ] Duplication creates exact copy with new name
- [ ] Deletion requires confirmation
- [ ] Active environment is clearly indicated
- [ ] Sensitive values can be optionally encrypted

## Dependencies

- Token Exchange Helper (to use environment configs)
- API Tester (to use environment configs)

## Notes

- Consider adding environment templates (Google, GitHub, etc.)
- Add validation for required fields
- Consider adding environment sharing via URL
- Add environment backup/restore functionality
- Consider adding environment versioning
