import { featuredOrganizations, musicianWorkflow, organizationWorkflow } from '@shared/content';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="card">
          <div className="kicker">Auditions · Applications · Review</div>
          <h1>Run music submissions from browser, iPhone, or Android.</h1>
          <p>
            Music Auditions Platform lets organizations publish audition requirements and gives musicians
            one clean place to browse opportunities, upload multiple audition pieces, and track outcomes.
          </p>
          <div className="buttonRow">
            <a className="button primary" href="#musicians">Explore opportunities</a>
            <a className="button secondary" href="#organizations">Publish requirements</a>
          </div>
        </div>
        <div className="card ctaPanel">
          <h2>Submission snapshot</h2>
          <div className="stats">
            <div className="stat">
              <strong>1..N</strong>
              <p>Audition uploads per application</p>
            </div>
            <div className="stat">
              <strong>Mobile</strong>
              <p>Record, upload, and review from phones</p>
            </div>
            <div className="stat">
              <strong>Self-service</strong>
              <p>Organizations manage their own requirements</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid">
        <div id="musicians" className="card">
          <div className="sectionHeader">
            <div>
              <div className="kicker">For musicians</div>
              <h2>Apply with confidence</h2>
            </div>
          </div>
          <div className="list">
            {musicianWorkflow.map((step) => (
              <div className="listItem" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="organizations" className="card">
          <div className="sectionHeader">
            <div>
              <div className="kicker">For organizations</div>
              <h2>Publish and review efficiently</h2>
            </div>
          </div>
          <div className="list">
            {organizationWorkflow.map((step) => (
              <div className="listItem" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <div className="sectionHeader">
          <div>
            <div className="kicker">Featured organizations</div>
            <h2>Example postings musicians can browse</h2>
          </div>
        </div>
        <div className="grid">
          {featuredOrganizations.map((organization) => (
            <div className="listItem" key={organization.name}>
              <h3>{organization.name}</h3>
              <p>{organization.summary}</p>
              <div className="chips">
                {organization.requirements.map((req) => (
                  <span className="chip" key={req}>{req}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
