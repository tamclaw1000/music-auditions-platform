# Oracle APEX App Scaffold

This folder contains an Oracle APEX-ready scaffold for the Music Auditions Platform.

## What is included

- `sql/001_schema.sql` — relational schema for organizations, audition events, musicians, registrations, and tapes
- `sql/002_seed_data.sql` — seed data derived from the current demo JSON content
- `sql/003_views.sql` — convenience views for common APEX reports
- `sql/install.sql` — one-shot installer for schema + seed + views
- `docs/app-blueprint.md` — recommended Oracle APEX page structure and flow
- `data/source-map.md` — mapping from current JSON demo data into the APEX relational model

## Important note

This is **not** a native Oracle APEX application export yet.
A true APEX app export must be generated from inside an Oracle APEX workspace.

What this scaffold gives you is:
- a database model
- realistic seed data
- a defined page/workflow blueprint
- a clean starting point to build the actual APEX app in Oracle

## Intended APEX workflow

1. Create or open an Oracle APEX workspace
2. Run `sql/install.sql`
3. Use the tables and views to create:
   - authentication / musician access screens
   - audition browse/register pages
   - tape upload metadata pages
   - organizer/admin review pages
4. Export the real APEX app back into this folder later

## Core musician flow represented

1. open musician front-end
2. register or sign in
3. register for an audition event
4. upload tape metadata up to the event limit
