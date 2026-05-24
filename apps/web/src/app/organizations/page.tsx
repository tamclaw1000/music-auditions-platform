'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getOrganizationEvents, listOrganizations } from '../../lib/demo-backend';
import type { OrganizationDraft } from '@shared/types';

const organizations = listOrganizations();
const emptyOrgDraft: OrganizationDraft = {
  organizationName: '',
  contactName: '',
  email: '',
  programTitle: '',
  deadline: '',
  requirementsText: '',
};

export default function OrganizationsPage() {
  const [orgDraft, setOrgDraft] = useState<OrganizationDraft>(emptyOrgDraft);

  return (
    <main>
      <header className="topBar">
        <div className="topBarBrand"><Link href="/">Music Auditions Platform</Link></div>
        <div className="topBarLinks">
          <Link className="topBarLink subtle" href="/musicians">For musicians</Link>
          <Link className="topBarLink active" href="/organizations">Organizers</Link>
        </div>
      </header>

      <section className="hero">
        <div className="card">
          <div className="kicker">Organizer site</div>
          <h1>Register your organization and publish audition requirements.</h1>
          <p>
            This organizer-facing site runs from the same demo JSON backend, so published organizations and audition events can be reviewed from one persistent content folder while we validate the admin experience.
          </p>
        </div>
        <div className="card ctaPanel">
          <h2>What organizers can review</h2>
          <div className="stats">
            <div className="stat"><strong>{organizations.length}</strong><p>Seed organizations</p></div>
            <div className="stat"><strong>{organizations.reduce((sum, org) => sum + getOrganizationEvents(org.id).length, 0)}</strong><p>Seed audition events</p></div>
            <div className="stat"><strong>JSON</strong><p>Simple replaceable demo backend</p></div>
          </div>
        </div>
      </section>

      <section className="grid" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="sectionHeader">
            <div>
              <div className="kicker">Existing organizations</div>
              <h2>Bootstrapped directory</h2>
            </div>
          </div>
          <div className="list">
            {organizations.map((org) => {
              const events = getOrganizationEvents(org.id);
              return (
                <div className="listItem" key={org.id}>
                  <h3>{org.name}</h3>
                  <p>{org.summary}</p>
                  <div className="metaGrid">
                    <div><span className="metaLabel">Location</span><strong>{org.location}</strong></div>
                    <div><span className="metaLabel">Type</span><strong>{org.type}</strong></div>
                    <div><span className="metaLabel">Contact</span><strong>{org.contactEmail}</strong></div>
                    <div><span className="metaLabel">Events</span><strong>{events.length}</strong></div>
                  </div>
                  <div className="chips">
                    {events.map((event) => <span className="chip" key={event.id}>{event.title}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
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
            <p>{orgDraft.organizationName || 'Your organization'} · {orgDraft.programTitle || 'Opportunity title'} · deadline {orgDraft.deadline || 'TBD'}</p>
            <p>{orgDraft.requirementsText || 'Requirements will appear here as you draft them.'}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
