'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getOrganizationById, listAuditionEvents, listDemoMusicians, listOrganizations } from '../../lib/demo-backend';
import type { AuditionEvent, DemoMusicianAccount, MusicianProfile, MusicianRegistration, MusicianRegistrationStatus, SubmissionEntry } from '@shared/types';

const organizations = listOrganizations();
const events = listAuditionEvents();
const seededMusicians = listDemoMusicians();

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

function deepCopyMusicians(): DemoMusicianAccount[] {
  return JSON.parse(JSON.stringify(seededMusicians));
}

function stageLabelForRegistrations(registrations: MusicianRegistration[]): string {
  if (registrations.some((registration) => registration.status === 'ready')) {
    return 'Upload set complete and ready for review';
  }
  if (registrations.some((registration) => registration.tapes.length > 0 || registration.status === 'uploading')) {
    return 'Mid-upload with one tape already saved';
  }
  if (registrations.length > 0) {
    return 'Registered for an audition, tapes not uploaded';
  }
  return 'Fresh account, ready to register for auditions';
}

export default function MusiciansPage() {
  const [loginMode, setLoginMode] = useState<'existing' | 'new'>('existing');
  const [musicians, setMusicians] = useState<DemoMusicianAccount[]>(() => deepCopyMusicians());
  const [selectedDemoMusicianId, setSelectedDemoMusicianId] = useState(seededMusicians[0]?.id ?? '');
  const [activeMusicianId, setActiveMusicianId] = useState<string>(seededMusicians[1]?.id ?? seededMusicians[0]?.id ?? '');
  const [newProfile, setNewProfile] = useState<MusicianProfile>(emptyProfile);
  const [accountBanner, setAccountBanner] = useState('');
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(organizations[0]?.id ?? '');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [selectedRegistrationEventId, setSelectedRegistrationEventId] = useState('');
  const [savedBanner, setSavedBanner] = useState('');

  const activeMusician = useMemo(
    () => musicians.find((musician) => musician.id === activeMusicianId),
    [musicians, activeMusicianId]
  );

  const activeRegistrations = activeMusician?.registrations ?? [];

  const availableEvents = useMemo(
    () => events.filter((event) => event.organizationId === selectedOrganizationId),
    [selectedOrganizationId]
  );

  useEffect(() => {
    const currentStillValid = availableEvents.some((event) => event.id === selectedEventId);
    if (!currentStillValid) {
      setSelectedEventId(availableEvents[0]?.id ?? '');
    }
  }, [availableEvents, selectedEventId]);

  useEffect(() => {
    const currentStillValid = activeRegistrations.some((registration) => registration.auditionEventId === selectedRegistrationEventId);
    if (!currentStillValid) {
      setSelectedRegistrationEventId(activeRegistrations[0]?.auditionEventId ?? '');
    }
  }, [activeRegistrations, selectedRegistrationEventId]);

  const selectedEvent = useMemo<AuditionEvent | undefined>(
    () => availableEvents.find((event) => event.id === selectedEventId),
    [availableEvents, selectedEventId]
  );

  const selectedRegistration = useMemo<MusicianRegistration | undefined>(
    () => activeRegistrations.find((registration) => registration.auditionEventId === selectedRegistrationEventId),
    [activeRegistrations, selectedRegistrationEventId]
  );

  const selectedRegistrationEvent = selectedRegistration
    ? events.find((event) => event.id === selectedRegistration.auditionEventId)
    : undefined;

  const selectedOrganization = getOrganizationById(selectedOrganizationId);
  const alreadyRegistered = Boolean(
    activeMusician && selectedEvent && activeMusician.registrations.some((registration) => registration.auditionEventId === selectedEvent.id)
  );
  const newProfileComplete = Object.values(newProfile).every((value) => value.trim().length > 0);
  const selectedRegistrationEventMax = selectedRegistrationEvent?.auditionCountMax ?? 0;
  const tapeLimitReached = Boolean(selectedRegistration && selectedRegistration.tapes.length >= selectedRegistrationEventMax);

  function activateDemoAccount() {
    setActiveMusicianId(selectedDemoMusicianId);
    const selected = musicians.find((musician) => musician.id === selectedDemoMusicianId);
    setAccountBanner(selected ? `Logged in as ${selected.profile.fullName}. Stage: ${selected.stageLabel}.` : 'Logged in to demo account.');
    setSavedBanner('');
  }

  function createNewAccount() {
    if (!newProfileComplete) return;
    const id = `musician-${crypto.randomUUID().slice(0, 8)}`;
    const account: DemoMusicianAccount = {
      id,
      email: newProfile.email,
      passwordHint: 'new-demo-account',
      stageLabel: 'Fresh account, ready to register for auditions',
      profile: newProfile,
      registrations: [],
    };
    setMusicians((current) => [...current, account]);
    setActiveMusicianId(id);
    setSelectedDemoMusicianId(id);
    setLoginMode('existing');
    setNewProfile(emptyProfile);
    setAccountBanner(`Registered and logged in as ${account.profile.fullName}.`);
    setSavedBanner('');
  }

  function registerForSelectedAudition() {
    if (!activeMusician || !selectedEvent || alreadyRegistered) return;
    setMusicians((current) =>
      current.map((musician) =>
        musician.id !== activeMusician.id
          ? musician
          : {
              ...musician,
              stageLabel: 'Registered for an audition, tapes not uploaded',
              registrations: [
                ...musician.registrations,
                {
                  auditionEventId: selectedEvent.id,
                  registeredAt: new Date().toISOString().slice(0, 10),
                  status: 'registered',
                  tapes: [],
                },
              ],
            }
      )
    );
    setSelectedRegistrationEventId(selectedEvent.id);
    setSavedBanner(`Registered ${activeMusician.profile.fullName} for ${selectedEvent.title}.`);
  }

  function updateTape(tapeId: string, field: keyof SubmissionEntry, value: string) {
    if (!activeMusician || !selectedRegistration) return;
    setMusicians((current) =>
      current.map((musician) => {
        if (musician.id !== activeMusician.id) return musician;
        return {
          ...musician,
          stageLabel: 'Mid-upload with one tape already saved',
          registrations: musician.registrations.map((registration) =>
            registration.auditionEventId !== selectedRegistration.auditionEventId
              ? registration
              : {
                  ...registration,
                  status: 'uploading' as MusicianRegistrationStatus,
                  tapes: registration.tapes.map((tape) => (tape.id === tapeId ? { ...tape, [field]: value } : tape)),
                }
          ),
        };
      })
    );
  }

  function addTape() {
    if (!activeMusician || !selectedRegistration || !selectedRegistrationEvent || tapeLimitReached) return;
    setMusicians((current) =>
      current.map((musician) => {
        if (musician.id !== activeMusician.id) return musician;
        return {
          ...musician,
          stageLabel: 'Mid-upload with one tape already saved',
          registrations: musician.registrations.map((registration) =>
            registration.auditionEventId !== selectedRegistration.auditionEventId
              ? registration
              : {
                  ...registration,
                  status: 'uploading' as MusicianRegistrationStatus,
                  tapes: [...registration.tapes, newSubmissionEntry()],
                }
          ),
        };
      })
    );
  }

  function removeTape(tapeId: string) {
    if (!activeMusician || !selectedRegistration) return;
    setMusicians((current) =>
      current.map((musician) => {
        if (musician.id !== activeMusician.id) return musician;
        const updatedRegistrations = musician.registrations.map((registration) => {
          if (registration.auditionEventId !== selectedRegistration.auditionEventId) return registration;
          const nextTapes = registration.tapes.filter((tape) => tape.id !== tapeId);
          return {
            ...registration,
            status: (nextTapes.length === 0 ? 'registered' : 'uploading') as MusicianRegistrationStatus,
            tapes: nextTapes,
          };
        });
        return {
          ...musician,
          stageLabel: stageLabelForRegistrations(updatedRegistrations),
          registrations: updatedRegistrations,
        };
      })
    );
  }

  function saveTapeSet() {
    if (!activeMusician || !selectedRegistration || !selectedRegistrationEvent) return;
    const complete = selectedRegistration.tapes.length >= selectedRegistrationEvent.auditionCountMin &&
      selectedRegistration.tapes.every((tape) => tape.pieceTitle && tape.composer && tape.duration && tape.link);
    setMusicians((current) =>
      current.map((musician) => {
        if (musician.id !== activeMusician.id) return musician;
        return {
          ...musician,
          stageLabel: complete ? 'Upload set complete and ready for review' : stageLabelForRegistrations(musician.registrations),
          registrations: musician.registrations.map((registration) =>
            registration.auditionEventId !== selectedRegistration.auditionEventId
              ? registration
              : {
                  ...registration,
                  status: (complete ? 'ready' : selectedRegistration.tapes.length > 0 ? 'uploading' : 'registered') as MusicianRegistrationStatus,
                }
          ),
        };
      })
    );
    setSavedBanner(
      complete
        ? `Saved ${selectedRegistration.tapes.length} tape(s) for ${selectedRegistrationEvent.title}. This registration is ready for review.`
        : `Saved progress for ${selectedRegistrationEvent.title}. ${selectedRegistrationEvent.auditionCountMin}-${selectedRegistrationEvent.auditionCountMax} tapes required.`
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
          <div className="kicker">Musician workflow</div>
          <h1>Register, join an audition, then upload tapes up to the event limit.</h1>
          <p>
            This page now mirrors the intended musician journey: enter through the musician front-end, sign in or create an account, register for a specific audition, and upload the required number of tapes.
          </p>
          <div className="buttonRow">
            <a className="button primary" href="#account-access">Start with account access</a>
            <a className="button secondary" href="#audition-uploads">Jump to upload stage</a>
          </div>
        </div>
        <div className="card ctaPanel">
          <h2>Seeded static states</h2>
          <div className="stats">
            <div className="stat"><strong>{musicians.length}</strong><p>Demo musician accounts</p></div>
            <div className="stat"><strong>{events.length}</strong><p>Audition options</p></div>
            <div className="stat"><strong>4</strong><p>Workflow stages represented</p></div>
          </div>
        </div>
      </section>

      <section className="grid" id="account-access">
        <div className="card">
          <div className="kicker">Step 1-2</div>
          <h2>Open the musician front-end and access an account</h2>
          <div className="buttonRow" style={{ marginTop: 0 }}>
            <button className={`button ${loginMode === 'existing' ? 'primary' : 'secondary'}`} type="button" onClick={() => setLoginMode('existing')}>Log into existing account</button>
            <button className={`button ${loginMode === 'new' ? 'primary' : 'secondary'}`} type="button" onClick={() => setLoginMode('new')}>Register new account</button>
          </div>

          {loginMode === 'existing' ? (
            <div className="formGrid" style={{ marginTop: 16 }}>
              <label className="full">
                <span>Demo musician account</span>
                <select className="selectInput" value={selectedDemoMusicianId} onChange={(e) => setSelectedDemoMusicianId(e.target.value)}>
                  {musicians.map((musician) => (
                    <option key={musician.id} value={musician.id}>{musician.profile.fullName} — {musician.stageLabel}</option>
                  ))}
                </select>
              </label>
              <div className="listItem full">
                {musicians.find((musician) => musician.id === selectedDemoMusicianId) ? (
                  <>
                    <strong>{musicians.find((musician) => musician.id === selectedDemoMusicianId)?.profile.fullName}</strong>
                    <p className="mutedSmall">Password hint: {musicians.find((musician) => musician.id === selectedDemoMusicianId)?.passwordHint}</p>
                  </>
                ) : null}
              </div>
              <div className="full buttonRow">
                <button className="button primary" type="button" onClick={activateDemoAccount}>Log in to demo account</button>
              </div>
            </div>
          ) : (
            <div className="formGrid" style={{ marginTop: 16 }}>
              <label><span>Full name</span><input value={newProfile.fullName} onChange={(e) => setNewProfile({ ...newProfile, fullName: e.target.value })} /></label>
              <label><span>Email</span><input value={newProfile.email} onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })} /></label>
              <label><span>Primary instrument / voice</span><input value={newProfile.primaryInstrument} onChange={(e) => setNewProfile({ ...newProfile, primaryInstrument: e.target.value })} /></label>
              <label><span>City</span><input value={newProfile.city} onChange={(e) => setNewProfile({ ...newProfile, city: e.target.value })} /></label>
              <label className="full"><span>Bio</span><textarea rows={4} value={newProfile.bio} onChange={(e) => setNewProfile({ ...newProfile, bio: e.target.value })} /></label>
              <div className="full buttonRow">
                <button className="button primary" type="button" disabled={!newProfileComplete} onClick={createNewAccount}>Register account</button>
              </div>
            </div>
          )}

          {accountBanner ? <div className="successBanner">{accountBanner}</div> : null}
        </div>

        <div className="card">
          <div className="kicker">Active musician</div>
          <h2>{activeMusician?.profile.fullName ?? 'No account active yet'}</h2>
          {activeMusician ? (
            <>
              <p>{activeMusician.stageLabel}</p>
              <div className="metaGrid">
                <div><span className="metaLabel">Email</span><strong>{activeMusician.profile.email}</strong></div>
                <div><span className="metaLabel">Primary focus</span><strong>{activeMusician.profile.primaryInstrument}</strong></div>
                <div><span className="metaLabel">City</span><strong>{activeMusician.profile.city}</strong></div>
                <div><span className="metaLabel">Registered auditions</span><strong>{activeMusician.registrations.length}</strong></div>
              </div>
              <div className="previewPanel">
                <strong>Bio</strong>
                <p>{activeMusician.profile.bio}</p>
              </div>
            </>
          ) : (
            <p>Choose or create an account to unlock audition registration and uploads.</p>
          )}
        </div>
      </section>

      <section className="grid" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="kicker">Step 3</div>
          <h2>Register for an audition after login</h2>
          <div className="formGrid">
            <label className="full">
              <span>Organizer</span>
              <select className="selectInput" value={selectedOrganizationId} onChange={(e) => setSelectedOrganizationId(e.target.value)}>
                {organizations.map((organization) => (
                  <option key={organization.id} value={organization.id}>{organization.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="list" style={{ marginTop: 16 }}>
            {availableEvents.map((event) => (
              <button key={event.id} className={`selectCard ${selectedEventId === event.id ? 'selected' : ''}`} type="button" onClick={() => setSelectedEventId(event.id)}>
                <div>
                  <strong>{event.title}</strong>
                  <div className="mutedSmall">{selectedOrganization?.name}</div>
                </div>
                <div className="mutedSmall">{event.deadline}</div>
              </button>
            ))}
          </div>
          {selectedEvent ? (
            <div className="listItem" style={{ marginTop: 16 }}>
              <h3>{selectedEvent.title}</h3>
              <p>{selectedEvent.description}</p>
              <div className="metaGrid">
                <div><span className="metaLabel">Location</span><strong>{selectedEvent.location}</strong></div>
                <div><span className="metaLabel">Tape limit</span><strong>{selectedEvent.auditionCountMin}-{selectedEvent.auditionCountMax}</strong></div>
                <div><span className="metaLabel">Genre</span><strong>{selectedEvent.genre}</strong></div>
                <div><span className="metaLabel">Focus</span><strong>{selectedEvent.instrumentFocus.join(', ')}</strong></div>
              </div>
              <div className="chips">
                {selectedEvent.requirements.map((requirement) => <span className="chip" key={requirement}>{requirement}</span>)}
              </div>
              <div className="buttonRow">
                <button className="button primary" type="button" disabled={!activeMusician || alreadyRegistered} onClick={registerForSelectedAudition}>
                  {alreadyRegistered ? 'Already registered' : 'Register for this audition'}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="card">
          <div className="kicker">Registered auditions</div>
          <h2>What this musician is already in</h2>
          <div className="list">
            {activeRegistrations.length === 0 ? (
              <div className="listItem"><p>No audition registrations yet. Register for one to unlock uploads.</p></div>
            ) : activeRegistrations.map((registration) => {
              const event = events.find((item) => item.id === registration.auditionEventId);
              const org = event ? getOrganizationById(event.organizationId) : undefined;
              return (
                <div className="listItem" key={registration.auditionEventId}>
                  <strong>{event?.title ?? registration.auditionEventId}</strong>
                  <p className="mutedSmall">{org?.name ?? 'Unknown organizer'} · registered {registration.registeredAt}</p>
                  <div className="statusStrip">
                    <span className="good">Status: {registration.status}</span>
                    <span className="warn">Tapes: {registration.tapes.length}/{event?.auditionCountMax ?? '?'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="card" id="audition-uploads" style={{ marginTop: 24 }}>
        <div className="kicker">Step 4</div>
        <h2>Upload audition tapes up to the event limit</h2>
        {activeRegistrations.length > 0 ? (
          <div className="formGrid">
            <label className="full">
              <span>Registered audition</span>
              <select className="selectInput" value={selectedRegistrationEventId} onChange={(e) => setSelectedRegistrationEventId(e.target.value)}>
                {activeRegistrations.map((registration) => {
                  const event = events.find((item) => item.id === registration.auditionEventId);
                  return <option key={registration.auditionEventId} value={registration.auditionEventId}>{event?.title ?? registration.auditionEventId}</option>;
                })}
              </select>
            </label>
          </div>
        ) : null}

        {selectedRegistration && selectedRegistrationEvent ? (
          <>
            <div className="previewPanel">
              <strong>{selectedRegistrationEvent.title}</strong>
              <p>
                Upload between {selectedRegistrationEvent.auditionCountMin} and {selectedRegistrationEvent.auditionCountMax} tape(s). This musician currently has {selectedRegistration.tapes.length} saved.
              </p>
            </div>
            <div className="sectionHeader" style={{ marginTop: 20 }}>
              <div>
                <h3>Tape uploads</h3>
                <p>{selectedRegistrationEvent.requirements.join(' · ')}</p>
              </div>
              <button className="button secondary" type="button" disabled={tapeLimitReached} onClick={addTape}>Add tape</button>
            </div>
            <div className="list">
              {selectedRegistration.tapes.length === 0 ? (
                <div className="listItem"><p>No tapes uploaded yet for this audition.</p></div>
              ) : selectedRegistration.tapes.map((tape, index) => (
                <div className="listItem" key={tape.id}>
                  <div className="sectionHeader">
                    <h3 style={{ marginBottom: 0 }}>Tape #{index + 1}</h3>
                    <button className="textButton" type="button" onClick={() => removeTape(tape.id)}>Remove</button>
                  </div>
                  <div className="formGrid">
                    <label><span>Piece title</span><input value={tape.pieceTitle} onChange={(e) => updateTape(tape.id, 'pieceTitle', e.target.value)} /></label>
                    <label><span>Composer</span><input value={tape.composer} onChange={(e) => updateTape(tape.id, 'composer', e.target.value)} /></label>
                    <label><span>Duration</span><input value={tape.duration} onChange={(e) => updateTape(tape.id, 'duration', e.target.value)} placeholder="e.g. 04:25" /></label>
                    <label><span>Tape link</span><input value={tape.link} onChange={(e) => updateTape(tape.id, 'link', e.target.value)} placeholder="https://..." /></label>
                    <label className="full"><span>Notes</span><textarea rows={3} value={tape.notes} onChange={(e) => updateTape(tape.id, 'notes', e.target.value)} /></label>
                  </div>
                </div>
              ))}
            </div>
            <div className="statusStrip">
              <span className={selectedRegistration.tapes.length >= selectedRegistrationEvent.auditionCountMin ? 'good' : 'warn'}>
                Minimum tapes: {selectedRegistration.tapes.length}/{selectedRegistrationEvent.auditionCountMin}
              </span>
              <span className={tapeLimitReached ? 'warn' : 'good'}>
                Max tapes: {selectedRegistration.tapes.length}/{selectedRegistrationEvent.auditionCountMax}
              </span>
              <span className={selectedRegistration.status === 'ready' ? 'good' : 'warn'}>
                Registration status: {selectedRegistration.status}
              </span>
            </div>
            <div className="buttonRow">
              <button className="button primary" type="button" onClick={saveTapeSet}>Save upload progress</button>
            </div>
          </>
        ) : (
          <div className="listItem" style={{ marginTop: 20 }}>
            <p>Log in and register for at least one audition to begin uploading tapes.</p>
          </div>
        )}

        {savedBanner ? <div className="successBanner">{savedBanner}</div> : null}
      </section>
    </main>
  );
}
