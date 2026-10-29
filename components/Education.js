import { education } from '@/data/resume';
import { Reveal, SectionHeader } from './ui';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeader eyebrow="Where I studied" title="Education" />

        <div className="education-grid">
          {education.map((e, i) => (
            <Reveal as="article" key={e.school} className="card edu-card" delay={i * 80}>
              <span className="role-period">{e.period}</span>
              <h3 className="edu-school">{e.school}</h3>
              <p className="edu-degree">{e.degree}</p>
              <p className="edu-meta">
                {[e.detail, e.location].filter(Boolean).join(' · ')}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
