# Source Data Mapping

## Current source files
- `data/demo-1000/organizations.json`
- `data/demo-1000/audition-events.json`
- `data/demo-1000/musicians.json`

## Oracle mapping

### Organizations JSON
→ `MAP_ORGANIZATIONS`

### Audition events JSON
→ `MAP_AUDITION_EVENTS`

Nested arrays split into child tables:
- `instrumentFocus[]` → `MAP_AUDITION_FOCUSES`
- `requirements[]` → `MAP_AUDITION_REQUIREMENTS`

### Musicians JSON
→ `MAP_MUSICIANS`

Nested arrays split into child tables:
- `registrations[]` → `MAP_REGISTRATIONS`
- `registrations[].tapes[]` → `MAP_TAPES`

## Why this model

Oracle APEX works best with normalized relational tables rather than nested JSON blobs for interactive reports, forms, validations, and master-detail pages.
