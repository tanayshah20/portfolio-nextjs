'use client';
import { useEffect, useRef, useState } from 'react';
import { experience, earlyExperience } from '@/data/resume';
import { ChevronIcon } from './Icons';
import { Reveal, SectionHeader } from './ui';

// Roles after this many fold behind a "Show earlier roles" button.
const OPEN_ROLES = 2;

export default function Experience() {
  const [expanded, setExpanded] = useState({});

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader eyebrow="Where I've worked" title="Experience" />

        {experience.map((job) => {
          const older = job.roles.length - OPEN_ROLES;
          const open = older <= 0 || expanded[job.company];
          const listId = `roles-${job.company.toLowerCase().replace(/\W+/g, '-')}`;

          return (
            <div key={job.company} className="company">
              <Reveal className="company-header">
                <h3 className="company-name">{job.company}</h3>
                <p className="company-meta">
                  {job.location} · {job.period}
                </p>
              </Reveal>

              <ScrollTimeline id={listId} expanded={open}>
                {job.roles.map((role, i) => {
                  const folded = !open && i >= OPEN_ROLES;
                  const classes = [
                    'timeline-item',
                    role.current && 'current',
                    i >= OPEN_ROLES && 'older',
                    older > 0 && i === OPEN_ROLES - 1 && 'last-open',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <Reveal as="li" key={role.period} className={classes} inert={folded || undefined}>
                      <div className="timeline-body">
                        <div className="role-header">
                          <h4 className="role-title">
                            {role.title}
                            {role.type && <span className="badge">{role.type}</span>}
                          </h4>
                          <span className="role-period">{role.period}</span>
                        </div>
                        <ul className="role-bullets">
                          {role.bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </ul>
                        {role.tags?.length > 0 && (
                          <ul className="chips" aria-label="Technologies">
                            {role.tags.map((t) => (
                              <li key={t} className="chip">{t}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </Reveal>
                  );
                })}
              </ScrollTimeline>

              {older > 0 && (
                <button
                  type="button"
                  className="more-roles"
                  aria-expanded={open}
                  aria-controls={listId}
                  onClick={() => setExpanded((e) => ({ ...e, [job.company]: !open }))}
                >
                  {open ? 'Hide earlier roles' : `Show ${older} earlier roles`}
                  <ChevronIcon width={14} height={14} />
                </button>
              )}
            </div>
          );
        })}

        {earlyExperience.length > 0 && (
          <Reveal className="early">
            <h3 className="early-title">Earlier</h3>
            <ul className="early-list">
              {earlyExperience.map((e) => (
                <li key={e.company}>
                  <div className="early-head">
                    <span className="early-role">
                      {e.title} · <strong>{e.company}</strong>
                    </span>
                    <span className="role-period">{e.period}</span>
                  </div>
                  <p>{e.summary}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// Timeline list whose line fills as it scrolls past 60% of the viewport.
// Sets --progress (0–1) for the CSS fill and marks items the fill has reached.
function ScrollTimeline({ id, expanded, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      el.style.setProperty('--progress', p.toFixed(4));
      const reach = p * (r.height - 16) + 8;
      for (const item of el.children) {
        item.classList.toggle('reached', item.offsetHeight > 0 && item.offsetTop + 14 <= reach);
      }
    };
    const onChange = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange);
    el.addEventListener('transitionend', onChange); // roles folding open/closed
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onChange);
      window.removeEventListener('resize', onChange);
      el.removeEventListener('transitionend', onChange);
    };
  }, []);

  return (
    <ol ref={ref} id={id} className={`timeline ${expanded ? 'expanded' : ''}`}>
      {children}
    </ol>
  );
}
