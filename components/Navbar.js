'use client';
import { useState, useEffect, useRef } from 'react';
import { profile } from '@/data/resume';
import { MoonIcon, SearchIcon, SunIcon } from './Icons';
import { sections, toggleTheme } from './ui';

export default function Navbar() {
  const [shrink, setShrink] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const navRef = useRef(null);
  const progressRef = useRef(null);
  const kbdRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Highlight the section crossing the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // The hero (#top) has no nav link, so it clears the highlight.
          if (entry.isIntersecting) setActive(entry.target.id === 'top' ? '' : entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ['top', ...sections.map(({ id }) => id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleKey = (e) => e.key === 'Escape' && setOpen(false);
    const handlePointer = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    document.addEventListener('pointerdown', handlePointer);

    // Show the shortcut the visitor's keyboard actually has.
    if (kbdRef.current && /Mac|iPhone|iPad/.test(navigator.userAgent)) kbdRef.current.textContent = '⌘K';

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerdown', handlePointer);
      observer.disconnect();
    };
  }, []);

  const onThemeClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    toggleTheme(r.left + r.width / 2, r.top + r.height / 2);
  };

  return (
    <nav ref={navRef} className={`navbar ${shrink ? 'shrink' : ''} ${open ? 'open' : ''}`} aria-label="Main">
      <div className="nav-container">
        <a href="#top" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="nav-monogram">{profile.initials}</span>
          <span className="nav-name">{profile.name}</span>
        </a>

        <div className="nav-right">
          <ul id="nav-menu" className="nav-menu">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`nav-link ${active === id ? 'active' : ''}`}
                  aria-current={active === id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="nav-tool"
            aria-label="Open command menu"
            onClick={() => window.dispatchEvent(new Event('open-command-menu'))}
          >
            <SearchIcon width={15} height={15} />
            <kbd ref={kbdRef} className="nav-kbd">Ctrl K</kbd>
          </button>

          <button type="button" className="nav-tool" aria-label="Switch light or dark theme" onClick={onThemeClick}>
            <SunIcon className="theme-sun" width={16} height={16} />
            <MoonIcon className="theme-moon" width={16} height={16} />
          </button>

          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className="nav-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
    </nav>
  );
}
