prompt Loading seed data

insert into map_organizations (organization_id, name, location, organization_type, summary, contact_email, website_url) values
('north-lake-youth-symphony', 'North Lake Youth Symphony', 'Chicago, IL', 'Youth orchestra', 'A seasonal youth orchestra program focused on strong ensemble training, sectional coaching, and public performance.', 'auditions@northlakeyouthsymphony.org', 'https://example.org/north-lake-youth-symphony');

insert into map_organizations (organization_id, name, location, organization_type, summary, contact_email, website_url) values
('crescendo-opera-studio', 'Crescendo Opera Studio', 'New York, NY', 'Opera training program', 'A studio for emerging vocalists with coaching, staged scenes, diction work, and performance development.', 'apply@crescendooperastudio.org', 'https://example.org/crescendo-opera-studio');

insert into map_organizations (organization_id, name, location, organization_type, summary, contact_email, website_url) values
('pulse-contemporary-ensemble', 'Pulse Contemporary Ensemble', 'Austin, TX', 'Contemporary ensemble', 'A project-based ensemble for adventurous musicians working in contemporary, experimental, and cross-genre repertoire.', 'submissions@pulseensemble.org', 'https://example.org/pulse-contemporary-ensemble');

insert into map_audition_events (audition_event_id, organization_id, title, location, deadline_date, genre, audition_count_min, audition_count_max, description) values
('nlys-2026-season-auditions', 'north-lake-youth-symphony', '2026 Season Auditions', 'Chicago, IL', date '2026-07-15', 'Youth orchestra', 2, 3, 'Seasonal orchestral auditions for youth musicians with contrasting repertoire and excerpt requirements.');

insert into map_audition_events (audition_event_id, organization_id, title, location, deadline_date, genre, audition_count_min, audition_count_max, description) values
('cos-emerging-vocalist-intake', 'crescendo-opera-studio', 'Emerging Vocalist Intake', 'Remote + New York, NY', date '2026-08-01', 'Opera', 1, 2, 'Emerging vocalist intake with aria recording, spoken introduction, and language experience.');

insert into map_audition_events (audition_event_id, organization_id, title, location, deadline_date, genre, audition_count_min, audition_count_max, description) values
('pce-project-based-call-2026', 'pulse-contemporary-ensemble', 'Project-Based Call for Artists', 'Austin, TX', date '2026-06-20', 'Contemporary / experimental', 2, 4, 'A flexible call for musicians comfortable with contemporary repertoire and collaborative development.');

insert into map_audition_events (audition_event_id, organization_id, title, location, deadline_date, genre, audition_count_min, audition_count_max, description) values
('nlys-winter-chamber-fellows', 'north-lake-youth-symphony', 'Winter Chamber Fellows', 'Chicago, IL', date '2026-09-10', 'Chamber music', 1, 2, 'Small ensemble fellowship for advanced student musicians with coaching and winter performances.');

insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('nlys-2026-season-auditions', 'Violin', 1);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('nlys-2026-season-auditions', 'Viola', 2);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('nlys-2026-season-auditions', 'Cello', 3);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('nlys-2026-season-auditions', 'Bass', 4);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('nlys-2026-season-auditions', 'Woodwinds', 5);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('cos-emerging-vocalist-intake', 'Soprano', 1);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('cos-emerging-vocalist-intake', 'Mezzo-Soprano', 2);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('cos-emerging-vocalist-intake', 'Tenor', 3);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('cos-emerging-vocalist-intake', 'Baritone', 4);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('cos-emerging-vocalist-intake', 'Bass', 5);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('pce-project-based-call-2026', 'Multi-instrumentalist', 1);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('pce-project-based-call-2026', 'Piano', 2);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('pce-project-based-call-2026', 'Percussion', 3);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('pce-project-based-call-2026', 'Electronics', 4);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('nlys-winter-chamber-fellows', 'Strings', 1);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('nlys-winter-chamber-fellows', 'Piano', 2);
insert into map_audition_focuses (audition_event_id, focus_name, display_order) values ('nlys-winter-chamber-fellows', 'Clarinet', 3);

insert into map_audition_requirements (audition_event_id, requirement_text, display_order) values ('nlys-2026-season-auditions', '2 contrasting video submissions', 1);
insert into map_audition_requirements (audition_event_id, requirement_text, display_order) values ('nlys-2026-season-auditions', 'resume', 2);
insert into map_audition_requirements (audition_event_id, requirement_text, display_order) values ('nlys-2026-season-auditions', 'guardian contact if under 18', 3);
insert into map_audition_requirements (audition_event_id, requirement_text, display_order) values ('cos-emerging-vocalist-intake', '1 aria', 1);
insert into map_audition_requirements (audition_event_id, requirement_text, display_order) values ('cos-emerging-vocalist-intake', '1 spoken introduction', 2);
insert into map_audition_requirements (audition_event_id, requirement_text, display_order) values ('cos-emerging-vocalist-intake', 'headshot', 3);
insert into map_audition_requirements (audition_event_id, requirement_text, display_order) values ('pce-project-based-call-2026', 'portfolio link', 1);
insert into map_audition_requirements (audition_event_id, requirement_text, display_order) values ('pce-project-based-call-2026', '2 samples', 2);
insert into map_audition_requirements (audition_event_id, requirement_text, display_order) values ('pce-project-based-call-2026', 'availability form', 3);
insert into map_audition_requirements (audition_event_id, requirement_text, display_order) values ('nlys-winter-chamber-fellows', '1 solo video', 1);
insert into map_audition_requirements (audition_event_id, requirement_text, display_order) values ('nlys-winter-chamber-fellows', 'short statement of interest', 2);

insert into map_musicians (musician_id, email, password_hint, stage_label, full_name, primary_instrument, city, bio) values
('maya-chen', 'maya.chen@example.com', 'demo-pass-1000', 'Profile created, no auditions yet', 'Maya Chen', 'Violin', 'Evanston, IL', 'High school violinist preparing first prescreen submissions for youth orchestra programs.');

insert into map_musicians (musician_id, email, password_hint, stage_label, full_name, primary_instrument, city, bio) values
('leo-martinez', 'leo.martinez@example.com', 'demo-pass-1000', 'Registered for an audition, tapes not uploaded', 'Leo Martinez', 'Cello', 'Chicago, IL', 'Student cellist focused on chamber and orchestral auditions for the 2026 season.');

insert into map_musicians (musician_id, email, password_hint, stage_label, full_name, primary_instrument, city, bio) values
('amina-rahman', 'amina.rahman@example.com', 'demo-pass-1000', 'Mid-upload with one tape already saved', 'Amina Rahman', 'Soprano', 'Brooklyn, NY', 'Emerging soprano building prescreen materials for training programs and studio auditions.');

insert into map_musicians (musician_id, email, password_hint, stage_label, full_name, primary_instrument, city, bio) values
('samir-kapoor', 'samir.kapoor@example.com', 'demo-pass-1000', 'Upload set complete and ready for review', 'Samir Kapoor', 'Percussion', 'Austin, TX', 'Contemporary percussionist submitting project samples for collaborative ensemble calls.');

insert into map_registrations (registration_id, musician_id, audition_event_id, registered_at, registration_status) values
(1001, 'leo-martinez', 'nlys-2026-season-auditions', date '2026-05-12', 'registered');

insert into map_registrations (registration_id, musician_id, audition_event_id, registered_at, registration_status) values
(1002, 'amina-rahman', 'cos-emerging-vocalist-intake', date '2026-05-18', 'uploading');

insert into map_registrations (registration_id, musician_id, audition_event_id, registered_at, registration_status) values
(1003, 'samir-kapoor', 'pce-project-based-call-2026', date '2026-05-09', 'ready');

insert into map_tapes (tape_id, registration_id, piece_title, composer, duration_text, media_link, notes) values
('tape-amina-1', 1002, 'Vedrai, carino', 'Mozart', '03:41', 'https://example.org/media/amina-vedrai-carino', 'Italian aria take 2 with piano accompaniment.');

insert into map_tapes (tape_id, registration_id, piece_title, composer, duration_text, media_link, notes) values
('tape-samir-1', 1003, 'Metal Study No. 2', 'Samir Kapoor', '04:12', 'https://example.org/media/samir-metal-study-2', 'Solo multi-percussion setup, filmed in rehearsal room.');

insert into map_tapes (tape_id, registration_id, piece_title, composer, duration_text, media_link, notes) values
('tape-samir-2', 1003, 'Pulse Session Excerpt', 'Collective improvisation', '05:08', 'https://example.org/media/samir-pulse-session', 'Ensemble collaboration clip showing electronics + percussion cues.');

commit;
