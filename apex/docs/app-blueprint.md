# Oracle APEX App Blueprint

## App goal

Build an Oracle APEX application for the musician workflow:

1. open musician front-end
2. register or sign in
3. register for an audition
4. upload audition tapes up to the event limit

## Suggested APEX pages

### Public / authentication
- **Page 1 — Landing / musician home**
  - explains the audition workflow
  - buttons for Sign In / Register
- **Page 2 — Sign In**
- **Page 3 — Create Musician Account**
  - inserts into `MAP_MUSICIANS`

### Musician flow
- **Page 10 — Musician Dashboard**
  - profile summary
  - current stage label
  - registered audition count
  - CTA buttons for Browse Auditions / My Uploads
- **Page 11 — Browse Auditions**
  - interactive report on `MAP_AUDITION_CATALOG_V`
  - optional filters for organization, genre, location
- **Page 12 — Audition Detail**
  - event details
  - requirements region
  - register button
- **Page 13 — Register for Audition**
  - inserts into `MAP_REGISTRATIONS`
  - enforce uniqueness on `(musician_id, audition_event_id)`
- **Page 14 — My Registrations**
  - report on `MAP_MUSICIAN_REGISTRATION_V`
- **Page 15 — Upload Tapes**
  - form/report on `MAP_TAPES`
  - use validation to block inserts above `AUDITION_COUNT_MAX`
  - use validation to warn when fewer than `AUDITION_COUNT_MIN`

### Admin / organizer review
- **Page 30 — Organizations**
- **Page 31 — Audition Events**
- **Page 32 — Registrations Review**
- **Page 33 — Tape Review**

## Important validations

### Registration uniqueness
Prevent duplicate registrations by relying on:
- database unique constraint on `(musician_id, audition_event_id)`
- friendly APEX error message on duplicate attempt

### Tape-count validation
Before insert into `MAP_TAPES`, validate:
- current tape count for registration < `AUDITION_COUNT_MAX`

Example logic:

```sql
select case
         when count(*) < max_allowed then 'Y'
         else 'N'
       end
from (
  select count(t.tape_id) count_existing,
         max(e.audition_count_max) max_allowed
  from map_registrations r
  join map_audition_events e on e.audition_event_id = r.audition_event_id
  left join map_tapes t on t.registration_id = r.registration_id
  where r.registration_id = :P15_REGISTRATION_ID
);
```

### Registration readiness
A registration can be marked `ready` when:
- tape count >= `AUDITION_COUNT_MIN`
- all required tape metadata fields are populated

## Recommended auth model

For a true APEX app, prefer one of:
- APEX Accounts for internal demo use
- custom auth tied to `MAP_MUSICIANS.EMAIL`
- social / enterprise auth later if needed

## Next step to make this real

Once an Oracle APEX workspace is available:
1. run `apex/sql/install.sql`
2. build the pages above
3. export the resulting APEX application SQL back into `apex/exports/`
