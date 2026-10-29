import { featured, links, projects } from '@/data/resume';
import { ExternalIcon, GitHubIcon } from './Icons';
import { Reveal, SectionHeader } from './ui';

// Decorative test-matrix illustration for the featured card (no real data):
// p = pass, n = not run, w = warning.
const MATRIX = 'ppppnppppwppppppnpppppppppwppppnpppp'.split(''); // 3 rows of 12

// Renders nothing until projects are added in data/resume.js.
export default function Projects() {
  if (!projects.length) return null;

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader eyebrow="Things I've built" title="Projects" />

        {featured && (
          <Reveal as="article" className="card featured">
            <div className="featured-text">
              <p className="featured-kicker">{featured.kicker}</p>
              <h3 className="featured-title">{featured.title}</h3>
              <p className="featured-description">{featured.description}</p>
              <ul className="chips">
                {featured.tags.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
              {featured.note && <p className="featured-note">{featured.note}</p>}
            </div>
            <div className="mock-dash" aria-hidden="true">
              <div className="mock-bar">
                <i style={{ width: '30%' }} />
                <i style={{ width: '18%' }} />
                <i style={{ width: '12%' }} />
              </div>
              <div className="mock-grid">
                {MATRIX.map((c, i) => (
                  <i key={i} className={c === 'p' ? undefined : c} />
                ))}
              </div>
              <div className="mock-bar">
                <i style={{ width: '44%' }} />
                <i style={{ width: '22%' }} />
              </div>
            </div>
          </Reveal>
        )}

        <div className="projects-grid">
          {projects.map((project, i) => (
            <Reveal as="article" key={project.title} className="card project-card" delay={i * 80}>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              {project.tags?.length > 0 && (
                <ul className="chips">
                  {project.tags.map((t) => (
                    <li key={t} className="chip">{t}</li>
                  ))}
                </ul>
              )}
              {(project.repo || project.url) && (
                <div className="project-links">
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer">
                      <GitHubIcon width={16} height={16} /> Code
                    </a>
                  )}
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalIcon width={16} height={16} /> Live
                    </a>
                  )}
                </div>
              )}
            </Reveal>
          ))}
        </div>

        {links.github && (
          <p className="projects-more">
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <GitHubIcon width={18} height={18} />
              More on GitHub
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
