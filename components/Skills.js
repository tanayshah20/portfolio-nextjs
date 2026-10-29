import { experience, skills } from '@/data/resume';
import { Reveal, SectionHeader } from './ui';

// Skills that appear in an Ericsson role's tags get a "used at work" dot.
// "IntelliJ IDEA" matches the tag "IntelliJ"; Ericsson's own framework always counts.
const workTags = [...new Set(experience.flatMap((job) => job.roles.flatMap((r) => r.tags ?? [])))];
const usedAtWork = (skill) =>
  skill.startsWith('Ericsson') || workTags.some((t) => skill === t || skill.startsWith(`${t} `));

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader eyebrow="What I work with" title="Skills" />
        <p className="skills-legend">
          <span className="work-dot" aria-hidden="true" />
          Used professionally at Ericsson
        </p>

        <div className="skills-grid">
          {skills.map(({ group, items }, i) => (
            <Reveal key={group} className="card skill-group" delay={i * 80}>
              <h3 className="skill-group-title">{group}</h3>
              <ul className="chips">
                {items.map((s) => {
                  const work = usedAtWork(s);
                  return (
                    <li key={s} className="chip">
                      {work && <span className="work-dot" aria-hidden="true" />}
                      {s}
                      {work && <span className="sr-only"> (used at Ericsson)</span>}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
