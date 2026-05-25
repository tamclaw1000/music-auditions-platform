prompt Creating reporting views

create or replace view map_musician_registration_v as
select
  r.registration_id,
  m.musician_id,
  m.full_name as musician_name,
  m.email as musician_email,
  m.primary_instrument,
  r.audition_event_id,
  e.title as audition_title,
  o.name as organization_name,
  r.registered_at,
  r.registration_status,
  e.audition_count_min,
  e.audition_count_max,
  count(t.tape_id) as tape_count
from map_registrations r
join map_musicians m on m.musician_id = r.musician_id
join map_audition_events e on e.audition_event_id = r.audition_event_id
join map_organizations o on o.organization_id = e.organization_id
left join map_tapes t on t.registration_id = r.registration_id
group by
  r.registration_id,
  m.musician_id,
  m.full_name,
  m.email,
  m.primary_instrument,
  r.audition_event_id,
  e.title,
  o.name,
  r.registered_at,
  r.registration_status,
  e.audition_count_min,
  e.audition_count_max;

create or replace view map_audition_catalog_v as
select
  e.audition_event_id,
  e.title,
  o.name as organization_name,
  e.location,
  e.deadline_date,
  e.genre,
  e.audition_count_min,
  e.audition_count_max,
  e.description
from map_audition_events e
join map_organizations o on o.organization_id = e.organization_id;
