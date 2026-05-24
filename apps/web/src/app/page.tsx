import Link from 'next/link';
import { getHomePageFeaturedEvents, getOrganizationById } from '../lib/demo-backend';

export default function HomePage() {
  const featuredEvents = getHomePageFeaturedEvents();

  return (
    <main>
      <header className="topBar">
        <div className="topBarBrand">Music Auditions Platform</div>
        <div className="topBarLinks">
          <Link className="topBarLink subtle" href="/organizations">For organizers</Link>
        </div>
      </header>

      <section className="hero heroSingle">
        <div className="card heroGatekeeper">
          <div className="kicker">Musician-first front door</div>
          <h1>Find auditions, compare requirements, and prepare your submissions.</h1>
          <p>
            The default experience now favors musicians: browse active opportunities, understand what each organization wants,
            and move straight into the submission flow. Organizer access stays available in the top-right corner.
          </p>
          <div className="buttonRow">
            <Link className="button primary" href="/musicians">Enter musician site</Link>
            <Link className="button secondary" href="/organizations">Organizer site</Link>
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <div className="sectionHeader">
          <div>
            <div className="kicker">Featured auditions</div>
            <h2>Bootstrapped from the demo backend</h2>
          </div>
        </div>
        <div className="grid">
          {featuredEvents.map((event) => {
            const org = getOrganizationById(event.organizationId);
            return (
              <div className="listItem" key={event.id}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="metaGrid">
                  <div><span className="metaLabel">Organization</span><strong>{org?.name ?? event.organizationId}</strong></div>
                  <div><span className="metaLabel">Deadline</span><strong>{event.deadline}</strong></div>
                  <div><span className="metaLabel">Location</span><strong>{event.location}</strong></div>
                  <div><span className="metaLabel">Auditions</span><strong>{event.auditionCountMin}-{event.auditionCountMax}</strong></div>
                </div>
                <div className="chips">
                  {event.requirements.map((req) => <span className="chip" key={req}>{req}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
