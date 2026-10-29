import { profile } from '@/data/resume';
import { Reveal, SectionHeader } from './ui';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader eyebrow="Get to know me" title="About" />

        <div className="about-grid">
          <Reveal className="about-text">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal as="dl" className="facts card" delay={100}>
            {profile.facts.map(({ label, value }) => (
              <div key={label} className="fact">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
