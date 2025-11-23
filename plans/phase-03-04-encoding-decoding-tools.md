# Phase 3: Encoding/Decoding Tools

**Phase:** 3 - Advanced Features (Power Tools)  
**Priority:** Low  
**Estimated Time:** 3-4 hours

## Overview

Create a collection of common encoding/decoding utilities that developers frequently need. This provides quick access to tools without leaving the localhost environment.

## Tasks

- [ ] Create new route `/tools` for utility functions
- [ ] Add Base64 encoder/decoder with textarea inputs
- [ ] Add URL encoder/decoder
- [ ] Add JSON formatter/validator with error highlighting
- [ ] Add JSON minifier
- [ ] Include hash generators (MD5, SHA1, SHA256, SHA512)
- [ ] Add HMAC signature generator
- [ ] Include UUID/GUID generator
- [ ] Add timestamp converter (Unix ↔ human-readable)
- [ ] Create color converter (hex ↔ RGB ↔ HSL)
- [ ] Add regex tester with match highlighting
- [ ] Include string case converters (camelCase, snake_case, etc.)

## Technical Details

**Files to create:**

- `tools.html` - Encoding/decoding utilities page
- `utils/encoders.js` - Encoding/decoding functions

**Files to modify:**

- `server.js` - Add route for `/tools`
- `styles/style.scss` - Add tools page styles

**Tool categories:**

1. **Encoding/Decoding**

   - Base64
   - URL encoding
   - HTML entities

2. **Hashing/Crypto**

   - MD5, SHA1, SHA256, SHA512
   - HMAC signatures

3. **Data Formatting**

   - JSON formatter/validator
   - JSON minifier
   - XML formatter

4. **Generators**

   - UUID/GUID
   - Random strings
   - Lorem ipsum

5. **Converters**

   - Timestamp (Unix ↔ ISO)
   - Color (hex ↔ RGB ↔ HSL)
   - Case converters

6. **Testing**
   - Regex tester
   - String diff

## Success Criteria

- [ ] All encoding/decoding tools work correctly
- [ ] Hash generators produce correct outputs
- [ ] JSON formatter handles invalid JSON gracefully
- [ ] UUID generator creates valid UUIDs
- [ ] Timestamp converter handles multiple formats
- [ ] Color converter supports all formats
- [ ] Regex tester highlights matches
- [ ] Case converters handle all common formats

## Dependencies

None - this is a standalone feature.

## Notes

- Consider adding copy buttons for all outputs
- Add input/output history
- Consider adding batch processing
- Add keyboard shortcuts for common actions
- Consider adding tool favorites/bookmarks
- Add examples for each tool
