'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getOrganizationById, listAuditionEvents, listOrganizations } from '../../lib/demo-backend';
import type { AuditionEvent, MusicianProfile, SubmissionEntry } from '@shared/types';

const emptyProfile: MusicianProfile = {
  fullName: '',
  email: '',
  primaryInstrument: '',
  city: '',
  bio: '',
};

function newSubmissionEntry(): SubmissionEntry {
  return {
    id: crypto.randomUUID(),
    pieceTitle: '',
    composer: '',
    duration: '',
    link: '',
    notes: '',
  };
}

const organizations = listOrganizations();
const events = listAuditionEvents();

export default function MusiciansPage() {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(organizations[0]?.id ?? '');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [profile, setProfile] = useState<MusicianProfile>(emptyProfile);
  const [submissions, setSubmissions] = useState<SubmissionEntry[]>([newSubmissionEntry()]);
  const [submittedBanner, setSubmittedBanner] = useState('');

  const filteredEvents = useMemo(
    () => events.filter((item) => item.organizationId === selectedOrganizationId),
    [selectedOrganizationId]
  );

  useEffect(() => {
    const currentStillValid = filteredEvents.some((item) => item.id === selectedEventId);
    if (!currentStillValid) {
      setSelectedEventId(filteredEvents[0]?.id ?? '');
    }
  }, [filteredEvents, selectedEventId]);

  const selectedEvent = useMemo<AuditionEvent | undefined>(
    () => filteredEvents.find((item) => item.id === selectedEventId),
    [filteredEvents, selectedEventId]
  );

  const selectedOrganization = getOrganizationById(selectedOrganizationId);
  const submissionCountValid = selectedEvent
    ? submissions.length >= selectedEvent.auditionCountMin && submissions.length <= selectedEvent.auditionCountMax
    : false;
  const profileComplete = Object.values(profile).every((value) => value.trim().length > 0);
  const submissionFieldsComplete = submissions.every(
    (entry) => entry.pieceTitle && entry.composer && entry.duration && entry.link
  );
  const applicationReady = Boolean(selectedEvent && profileComplete && submissionFieldsComplete && submissionCountValid);

  function updateSubmission(id: string, field: keyof SubmissionEntry, value: string) {
    setSubmissions((current) => current.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
  }

  function prepareApplication() {
    if (!applicationReady || !selectedEvent) return;
    setSubmittedBanner(
      `Application prepared for ${selectedEvent.title} at ${selectedOrganization?.name ?? 'the selected organization'} — ${submissions.length} audition submission${submissions.length === 1 ? '' : 's'} included.`
    );
  }

  return (
    <main>
      <header className="topBar">
        <div className="topBarBrand"><Link href="/">Music Auditions Platform</Link></div>
        <div className="topBarLinks">
          <Link className="topBarLink active" href="/musicians">Musicians</Link>
          <Link className="topBarLink subtle" href="/organizations">For organizers</Link>
        </div>
      </header>

      <section className="hero">
        <div className="card">
          <div className="kicker">Musician site</div>
          <h1>Browse active auditions and prepare your package.</h1>
          <p>
            This musician-facing site runs against the demo JSON backend in <code>data/demo-1000</code>, giving us a simple persistent content layer while we validate the product flow.
          </p>
        </div>
        <div className="card ctaPanel">
          <h2>What you can do here</h2>
          <div className="stats">
            <div className="stat"><strong>{events.length}</strong><p>Bootstrapped audition events</p></div>
            <div className="stat"><strong>{organizations.length}</strong><p>Seed organizations</p></div>
            <div className="stat"><strong>JSON</strong><p>Demo backend source of truth</p></div>
          </div>
        </div>
      </section>

      <section className="grid" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="sectionHeader">
            <div>
              <div className="kicker">Browse events</div>
              <h2>Available auditions</h2>
            </div>
          </div>

          <div className="formGrid" style={{ marginBottom: 16 }}>
            <label className="full">
              <span>Organizer</span>
              <select
                className="selectInput"
                value={selectedOrganizationId}
                onChange={(e) => setSelectedOrganizationId(e.target.value)}
              >
                {organizations.map((organization) => (
                  <option key={organization.id} value={organization.id}>{organization.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="list">
            {filteredEvents.map((event) => (
              <button
                key={event.id}
                className={`selectCard ${selectedEventId === event.id ? 'selected' : ''}`}
                onClick={() => setSelectedEventId(event.id)}
                type="button"
              >
                <div>
                  <strong>{event.title}</strong>
                  <div className="mutedSmall">{selectedOrganization?.name ?? event.organizationId}</div>
                </div>
                <div className="mutedSmall">{event.deadline}</div>
              </button>
            ))}
          </div>

          {filteredEvents.length === 0 ? (
            <div className="listItem" style={{ marginTop: 16 }}>
              <p>No audition events are currently available for this organizer.</p>
            </div>
          ) : null}

          {selectedEvent ? (
            <div className="listItem" style={{ marginTop: 16 }}>
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.description}</p>
              <div className="metaGrid">
                <div><span className="metaLabel">Organization</span><strong>{selectedOrganization?.name ?? selectedEvent.organizationId}</strong></div>
                <div><span className="metaLabel">Location</span><strong>{selectedEvent.location}</strong></div>
                <div><span className="metaLabel">Genre</span><strong>{selectedEvent.genre}</strong></div>
                <div><span className="metaLabel">Auditions</span><strong>{selectedEvent.auditionCountMin}-{selectedEvent.auditionCountMax}</strong></div>
              </div>
              <div className="chips">
                {selectedEvent.requirements.map((req) => <span className="chip" key={req}>{req}</span>)}
              </div>
            </div>
          ) : null}
        </div>

        <div className="card">
          <div className="kicker">Musician profile</div>
          <h2>Reusable application profile</h2>
          <div className="formGrid">
            <label><span>Full name</span><input value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} /></label>
            <label><span>Email</span><input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></label>
            <label><span>Primary instrument / voice</span><input value={profile.primaryInstrument} onChange={(e) => setProfile({ ...profile, primaryInstrument: e.target.value })} /></label>
            <label><span>City</span><input value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} /></label>
            <label className="full"><span>Bio</span><textarea rows={4} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} /></label>
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <div className="sectionHeader">
          <div>
            <div className="kicker">Audition application</div>
            <h2>Submit one or more auditions</h2>
          </div>
        </div>
        <div className="sectionHeader">
          <div>
            <h3>Audition entries</h3>
            {selectedEvent ? <p>{selectedEvent.title} requires {selectedEvent.auditionCountMin}-{selectedEvent.auditionCountMax} audition submission(s).</p> : null}
          </div>
          <button className="button secondary" type="button" onClick={() => setSubmissions((current) => [...current, newSubmissionEntry()])}>Add another audition</button>
        </div>
        <div className="list">
          {submissions.map((entry, index) => (
            <div className="listItem" key={entry.id}>
              <div className="sectionHeader">
                <h3 style={{ marginBottom: 0 }}>Audition #{index + 1}</h3>
                {submissions.length > 1 ? (
                  <button className="textButton" type="button" onClick={() => setSubmissions((current) => current.filter((item) => item.id !== entry.id))}>Remove</button>
                ) : null}
              </div>
              <div className="formGrid">
                <label><span>Piece title</span><input value={entry.pieceTitle} onChange={(e) => updateSubmission(entry.id, 'pieceTitle', e.target.value)} /></label>
                <label><span>Composer</span><input value={entry.composer} onChange={(e) => updateSubmission(entry.id, 'composer', e.target.value)} /></label>
                <label><span>Duration</span><input value={entry.duration} onChange={(e) => updateSubmission(entry.id, 'duration', e.target.value)} placeholder="e.g. 04:25" /></label>
                <label><span>Media link</span><input value={entry.link} onChange={(e) => updateSubmission(entry.id, 'link', e.target.value)} placeholder="https://..." /></label>
                <label className="full"><span>Notes</span><textarea rows={3} value={entry.notes} onChange={(e) => updateSubmission(entry.id, 'notes', e.target.value)} /></label>
              </div>
            </div>
          ))}
        </div>
        <div className="statusStrip">
          <span className={profileComplete ? 'good' : 'warn'}>{profileComplete ? 'Profile complete' : 'Profile incomplete'}</span>
          <span className={submissionFieldsComplete ? 'good' : 'warn'}>{submissionFieldsComplete ? 'Audition entries complete' : 'Fill in all required audition fields'}</span>
          <span className={submissionCountValid ? 'good' : 'warn'}>{submissionCountValid ? 'Audition count valid' : 'Adjust audition count to match the selected event'}</span>
        </div>
        <div className="buttonRow">
          <button className="button primary" type="button" disabled={!applicationReady} onClick={prepareApplication}>Prepare application</button>
        </div>
        {submittedBanner ? <div className="successBanner">{submittedBanner}</div> : null}
      </section>
    </main>
  );
}
