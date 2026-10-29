'use client';
import { useEffect, useRef, useState } from 'react';
import { links } from '@/data/resume';
import { ArrowUpIcon, SearchIcon } from './Icons';
import { copyEmail, prefersReducedMotion, sections, toggleTheme } from './ui';

// Page-wide behaviour: card spotlight, back-to-top ring, command menu and toast.
export default function PageEffects() {
  useCardSpotlight();

  return (
    <>
      <ScrollToTop />
      <CommandMenu />
      <Toast />
    </>
  );
}

// Feeds the pointer position to whichever .card is under it (--mx / --my),
// which the CSS uses for the hover glow. Mouse/trackpad devices only.
function useCardSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;

    const onMove = (e) => {
      const card = e.target instanceof Element ? e.target.closest('.card') : null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(100 - progress * 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`scroll-to-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <svg className="scroll-ring" viewBox="0 0 52 52" aria-hidden="true">
        <circle className="scroll-ring-bg" cx="26" cy="26" r="24" />
        <circle
          ref={ringRef}
          className="scroll-ring-fg"
          cx="26"
          cy="26"
          r="24"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset="100"
        />
      </svg>
      <ArrowUpIcon />
    </button>
  );
}

// Command menu entries: `target` scrolls to a section, `action` runs below, `href` opens a link.
const COMMANDS = [
  ...sections.map((s) => ({ group: 'Go to', label: s.label, hint: 'Section', target: s.id })),
  { group: 'Actions', label: 'Copy email address', hint: links.email, action: 'copy-email' },
  { group: 'Actions', label: 'Switch light / dark theme', hint: 'Theme', action: 'toggle-theme' },
  { group: 'Links', label: 'Open LinkedIn', hint: links.linkedin.replace(/^https:\/\/(www\.)?/, ''), href: links.linkedin },
  ...(links.github
    ? [{ group: 'Links', label: 'Open GitHub', hint: links.github.replace(/^https:\/\//, ''), href: links.github }]
    : []),
];

// Ctrl/⌘ + K (or the navbar button, via the "open-command-menu" event).
function CommandMenu() {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const close = () => dialogRef.current?.close();
  const runCommand = (c) => {
    close();
    if (c.target) {
      document.getElementById(c.target)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    } else if (c.action === 'copy-email') {
      copyEmail(links.email);
    } else if (c.action === 'toggle-theme') {
      toggleTheme();
    }
  };

  const q = query.trim().toLowerCase();
  const shown = COMMANDS.filter((c) => !q || `${c.group} ${c.label} ${c.hint}`.toLowerCase().includes(q));
  const active = Math.min(selected, Math.max(0, shown.length - 1));

  useEffect(() => {
    const open = () => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      setQuery('');
      setSelected(0);
      dialog.showModal();
      inputRef.current?.focus();
    };
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        else open();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-menu', open);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-menu', open);
    };
  }, []);

  const move = (delta) => {
    if (!shown.length) return;
    const next = (active + delta + shown.length) % shown.length;
    setSelected(next);
    requestAnimationFrame(() => document.getElementById(`cmd-${next}`)?.scrollIntoView({ block: 'nearest' }));
  };

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      move(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      move(-1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById(`cmd-${active}`)?.click();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="command-menu"
      aria-label="Command menu"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="cmd-search">
        <SearchIcon width={18} height={18} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          onKeyDown={onInputKey}
          placeholder="Type a command or search…"
          aria-label="Search commands"
          aria-controls="cmd-list"
          aria-activedescendant={shown.length ? `cmd-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div id="cmd-list" className="cmd-list" role="listbox" aria-label="Commands">
        {shown.length === 0 && <p className="cmd-empty">No matching commands. Try “email” or “skills”.</p>}
        {shown.map((c, i) => {
          const heading = i === 0 || shown[i - 1].group !== c.group ? c.group : null;
          const props = {
            id: `cmd-${i}`,
            role: 'option',
            'aria-selected': i === active,
            className: `cmd-item ${i === active ? 'selected' : ''}`,
            onPointerMove: () => i !== active && setSelected(i),
          };
          const body = (
            <>
              <span>{c.label}</span>
              <span className="cmd-hint">{c.hint}</span>
            </>
          );
          return (
            <div key={`${c.group}-${c.label}`} role="presentation">
              {heading && <div className="cmd-group">{heading}</div>}
              {c.href ? (
                <a {...props} href={c.href} target="_blank" rel="noopener noreferrer" onClick={close}>
                  {body}
                </a>
              ) : (
                <button {...props} type="button" onClick={() => runCommand(c)}>
                  {body}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="cmd-foot" aria-hidden="true">
        <span><kbd>↑</kbd> <kbd>↓</kbd> move</span>
        <span><kbd>Enter</kbd> run</span>
        <span><kbd>Esc</kbd> close</span>
      </div>
    </dialog>
  );
}

// Listens for showToast() from ui.js.
function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timer;
    const onToast = (e) => {
      setToast({ ...e.detail, show: true });
      clearTimeout(timer);
      // Keep the text while it fades out.
      timer = setTimeout(() => setToast((t) => t && { ...t, show: false }), 1800);
    };
    window.addEventListener('toast', onToast);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('toast', onToast);
    };
  }, []);

  return (
    <div className={`toast ${toast?.show ? 'show' : ''}`} role="status" aria-live="polite">
      {toast?.ok && <span className="toast-ok" aria-hidden="true">✓</span>}
      {toast?.message}
    </div>
  );
}
