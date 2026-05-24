'use client';

import { useMemo, useState } from 'react';
import { featuredOrganizations, musicianWorkflow, organizationWorkflow } from '@shared/content';
import type { MusicianProfile, OrganizationDraft, Opportunity, SubmissionEntry } from '@shared/types';

const emptyProfile: MusicianProfile = {
  fullName: '',
  email: '',
  primaryInstrument: '',
  city: '',
  bio: '',
};

const emptyOrgDraft: OrganizationDraft = {
  organizationName: '',
  contactName: '',
  email: '',
  programTitle: '',
  deadline: '',
  requirementsText: '',
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

export default function HomePage() {
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(featuredOrganizations[0]?.id ?? '');
  const [profile, setProfile] = useState<MusicianProfile>(emptyProfile);
  const [submissions, setSubmissions] = useState<SubmissionEntry[]>([newSubmissionEntry()]);
  const [orgDraft, setOrgDraft] = useState<OrganizationDraft>(emptyOrgDraft);
  const [submittedBanner, setSubmittedBanner] = useState('');

  const selectedOpportunity = useMemo<Opportunity | undefined>(
    () => featuredOrganizations.find((item) => item.id === selectedOpportunityId),
    [selectedOpportunityId]
  );

  const submissionCountValid = selectedOpportunity
    ? submissions.length >= selectedOpportunity.auditionCountMin && submissions.length <= selectedOpportunity.auditionCountMax
    : false;

  const profileComplete = Object.values(profile).every((value) => value.trim().length > 0);
  const submissionFieldsComplete = submissions.every(
    (entry) => entry.pieceTitle && entry.composer && entry.duration && entry.link
  );

  const applicationReady = Boolean(selectedOpportunity && profileComplete && submissionFieldsComplete && submissionCountValid);

  function updateSubmission(id: string, field: keyof SubmissionEntry, value: string) {
    setSubmissions((current) => current.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
  }

  function submitApplication() {
    if (!applicationReady || !selectedOpportunity) return;
    setSubmittedBanner(
      `Application prepared for ${selectedOpportunity.organizationName} — ${submissions.length} audition submission${submissions.length === 1 ? '' : 's'} included.`
    );
  }

  return (
    <main>
      <section className="hero">
        <div className="card">
          <div className="kicker">Live demo · web first</div>
          <h1>Music submissions for musicians and arts organizations.</h1>
          <p>
            This initial version demonstrates the end-to-end shape of the product: organizations publish requirements,
            musicians browse openings, and applications can include multiple audition submissions.
          </p>
          <div className="buttonRow">
            <a className="button primary" href="#apply">Try the musician flow</a>
            <a className="button secondary" href="#publish">Try the organization flow</a>
          </div>
        </div>
        <div className="card ctaPanel">
          <h2>What this first version proves</h2>
          <div className="stats">
            <div className="stat"><strong>Browse</strong><p>Opportunity discovery with requirement visibility</p></div>
            <div className="stat"><strong>Submit</strong><p>Multi-audition application composition</p></div>
            <div className="stat"><strong>Publish</strong><p>Organization intake for new opportunity drafts</p></div>
          </div>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <div className="kicker">For musicians</div>
          <h2>Application workflow</h2>
          <div className="list">
            {musicianWorkflow.map((step) => (
              <div key={step.title} className="listItem">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="kicker">For organizations</div>
          <h2>Publishing workflow</h2>
          <div className="list">
            {organizationWorkflow.map((step) => (
              <div key={step.title} className="listItem">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="sectionHeader">
            <div>
              <div className="kicker">Browse opportunities</div>
              <h2>Published requirements</h2>
            </div>
          </div>
          <div className="list">
            {featuredOrganizations.map((org) => (
              <button
                key={org.id}
                className={`selectCard ${selectedOpportunityId === org.id ? 'selected' : ''}`}
                onClick={() => setSelectedOpportunityId(org.id)}
                type="button"
              >
                <div>
                  <strong>{org.organizationName}</strong>
                  <div className="mutedSmall">{org.title}</div>
                </div>
                <div className="mutedSmall">{org.deadline}</div>
              </button>
            ))}
          </div>
          {selectedOpportunity ? (
            <div className="listItem" style={{ marginTop: 16 }}>
              <h3>{selectedOpportunity.title}</h3>
              <p>{selectedOpportunity.description}</p>
              <div className="metaGrid">
                <div><span className="metaLabel">Organization</span><strong>{selectedOpportunity.organizationName}</strong></div>
                <div><span className="metaLabel">Location</span><strong>{selectedOpportunity.location}</strong></div>
                <div><span className="metaLabel">Genre</span><strong>{selectedOpportunity.genre}</strong></div>
                <div><span className="metaLabel">Auditions</span><strong>{selectedOpportunity.auditionCountMin}-{selectedOpportunity.auditionCountMax}</strong></div>
              </div>
              <div className="chips">
                {selectedOpportunity.requirements.map((req) => (
                  <span className="chip" key={req}>{req}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div id="publish" className="card">
          <div className="kicker">Organization registration</div>
          <h2>Create a submission requirement draft</h2>
          <div className="formGrid">
            <label><span>Organization name</span><input value={orgDraft.organizationName} onChange={(e) => setOrgDraft({ ...orgDraft, organizationName: e.target.value })} /></label>
            <label><span>Contact name</span><input value={orgDraft.contactName} onChange={(e) => setOrgDraft({ ...orgDraft, contactName: e.target.value })} /></label>
            <label><span>Email</span><input value={orgDraft.email} onChange={(e) => setOrgDraft({ ...orgDraft, email: e.target.value })} /></label>
            <label><span>Program title</span><input value={orgDraft.programTitle} onChange={(e) => setOrgDraft({ ...orgDraft, programTitle: e.target.value })} /></label>
            <label><span>Deadline</span><input type="date" value={orgDraft.deadline} onChange={(e) => setOrgDraft({ ...orgDraft, deadline: e.target.value })} /></label>
            <label className="full"><span>Requirements</span><textarea rows={6} value={orgDraft.requirementsText} onChange={(e) => setOrgDraft({ ...orgDraft, requirementsText: e.target.value })} /></label>
          </div>
          <div className="previewPanel">
            <strong>Draft preview</strong>
            <p>
              {orgDraft.organizationName || 'Your organization'} · {orgDraft.programTitle || 'Opportunity title'} · deadline {orgDraft.deadline || 'TBD'}
            </p>
            <p>{orgDraft.requirementsText || 'Requirements will appear here as you draft them.'}</p>
          </div>
        </div>
      </section>

      <section id="apply" className="card" style={{ marginTop: 24 }}>
        <div className="sectionHeader">
          <div>
            <div className="kicker">Musician application</div>
            <h2>Submit one or more auditions</h2>
          </div>
        </div>
        <div className="formGrid">
          <label><span>Full name</span><input value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} /></label>
          <label><span>Email</span><input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></label>
          <label><span>Primary instrument / voice</span><input value={profile.primaryInstrument} onChange={(e) => setProfile({ ...profile, primaryInstrument: e.target.value })} /></label>
          <label><span>City</span><input value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} /></label>
          <label className="full"><span>Bio</span><textarea rows={4} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} /></label>
        </div>

        <div className="sectionHeader" style={{ marginTop: 24 }}>
          <div>
            <h3>Audition entries</h3>
            {selectedOpportunity ? (
              <p>
                {selectedOpportunity.organizationName} requires {selectedOpportunity.auditionCountMin}-{selectedOpportunity.auditionCountMax} audition submission(s).
              </p>
            ) : null}
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
          <span className={submissionCountValid ? 'good' : 'warn'}>{submissionCountValid ? 'Audition count valid' : 'Adjust audition count to match the selected opportunity'}</span>
        </div>

        <div className="buttonRow">
          <button className="button primary" type="button" disabled={!applicationReady} onClick={submitApplication}>Prepare application</button>
        </div>
        {submittedBanner ? <div className="successBanner">{submittedBanner}</div> : null}
      </section>
    </main>
  );
}
