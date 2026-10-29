'use client';
import { useEffect, useRef } from 'react';
import { projects } from '@/data/resume';

// Page sections, used by the navbar and the command menu.
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  ...(projects.length ? [{ id: 'projects', label: 'Projects' }] : []),
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fades children in when they scroll into view. Content is visible by default
// (no JS, reduced motion, or already on screen) and only hidden once we know
// it is below the fold.
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add('reveal-pending');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('reveal-pending');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({ eyebrow, title }) {
  return (
    <Reveal as="header" className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
    </Reveal>
  );
}

// Theme lives on <html data-theme>; app/layout.js sets it before first paint.
// Switching wipes the new theme in as a circle from (x, y) where supported.
export function toggleTheme(x = window.innerWidth / 2, y = 0) {
  const root = document.documentElement;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  const swap = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    window.dispatchEvent(new Event('themechange'));
  };

  if (prefersReducedMotion() || !document.startViewTransition) {
    swap();
    return;
  }
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  document
    .startViewTransition(swap)
    .ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    })
    .catch(() => {});
}

// Shown by the toast in PageEffects.js.
export function showToast(message, ok = false) {
  window.dispatchEvent(new CustomEvent('toast', { detail: { message, ok } }));
}

// Copies the email; if the clipboard is blocked, selects `fallbackEl` so it can be copied by hand.
export async function copyEmail(email, fallbackEl) {
  try {
    await navigator.clipboard.writeText(email);
    showToast('Email copied', true);
    return true;
  } catch {
    if (fallbackEl) {
      const range = document.createRange();
      range.selectNodeContents(fallbackEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      showToast('Email selected, press Ctrl+C to copy');
    } else {
      showToast(email);
    }
    return false;
  }
}
