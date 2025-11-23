# Phase 3: Mock API Endpoints

**Phase:** 3 - Advanced Features (Power Tools)  
**Priority:** Low  
**Estimated Time:** 5-6 hours

## Overview

Create a system for defining and serving mock API endpoints. This allows frontend developers to work without a backend, or to test edge cases with controlled responses.

## Tasks

- [ ] Create new route `/mocks` for mock management interface
- [ ] Add mock endpoint creation form (path, method, response)
- [ ] Store mock definitions in localStorage
- [ ] Dynamically register Express routes for each mock
- [ ] Support response status code configuration
- [ ] Add response header customization
- [ ] Include response body editor (JSON, text, HTML)
- [ ] Add response delay configuration (simulate slow APIs)
- [ ] Create mock endpoint list with edit/delete actions
- [ ] Add mock request counter (how many times called)
- [ ] Support dynamic responses with variables
- [ ] Include random data generation (faker.js integration)
- [ ] Add mock import/export functionality
- [ ] Create mock templates for common scenarios

## Technical Details

**Files to create:**

- `mocks.html` - Mock management interface
- `utils/mocks.js` - Mock definition and route registration

**Files to modify:**

- `server.js` - Add dynamic route registration for mocks
- `styles/style.scss` - Add mock page styles

**Mock definition structure:**

```javascript
{
  id: "uuid",
  name: "Get Users",
  path: "/api/users",
  method: "GET",
  status: 200,
  headers: {
    "Content-Type": "application/json"
  },
  body: {
    users: [
      { id: 1, name: "John" }
    ]
  },
  delay: 500,
  enabled: true,
  requestCount: 0
}
```

## Success Criteria

- [ ] Mocks can be created via UI
- [ ] Mock endpoints respond correctly
- [ ] Status codes and headers are customizable
- [ ] Response delays work as configured
- [ ] Request counter increments on each call
- [ ] Dynamic variables are replaced in responses
- [ ] Import/export works with valid JSON
- [ ] Templates provide quick starting points

## Dependencies

None - this is a standalone feature.

## Notes

- Consider adding request matching (query params, headers)
- Add support for response sequences (different responses per call)
- Consider adding request validation
- Add support for GraphQL mocks
- Consider adding mock recording (capture real requests)
- Add support for conditional responses
