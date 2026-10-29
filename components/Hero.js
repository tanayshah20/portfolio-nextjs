'use client';
import { useEffect, useRef, useState } from 'react';
import { profile, links } from '@/data/resume';
import { GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from './Icons';
import { prefersReducedMotion } from './ui';

// Each hero line animates in after the previous one (see .hero-step in globals.css).
const step = (i) => ({ '--i': i });

export default function Hero() {
  const canvasRef = useRef(null);
  useSignalWaves(canvasRef);

  return (
    <section id="top" className="hero">
      <canvas ref={canvasRef} className="hero-waves" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-status hero-step" style={step(0)}>
            <span className="status-dot" aria-hidden="true" />
            Currently at {profile.company}
          </p>

          <h1 className="hero-name hero-step" style={step(1)}>
            Hi, I&apos;m <span className="accent">{profile.name}</span>.
          </h1>

          <p className="hero-headline hero-step" style={step(2)}>
            {profile.headline}
            <span className="hero-focus">
              {profile.focus.map((f) => (
                <span key={f}>{f}</span>
              ))}
            </span>
          </p>

          <p className="hero-tagline hero-step" style={step(3)}>{profile.tagline}</p>

          <p className="hero-location hero-step" style={step(4)}>
            <PinIcon width={16} height={16} />
            {profile.location}
          </p>

          <div className="hero-actions hero-step" style={step(5)}>
            <a href="#contact" className="btn btn-primary">Get in touch</a>

            <div className="social-links">
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              {links.github && (
                <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GitHubIcon />
                </a>
              )}
              <a href={`mailto:${links.email}`} aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </div>
        </div>

        <Terminal checks={profile.terminalChecks} className="hero-step" style={step(6)} />

        <dl className="highlights hero-step" style={step(7)}>
          {profile.highlights.map(({ value, label }) => (
            <div key={value}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const COMMAND = 'run portfolio-tests';

// Decorative "test run" that types a command and ticks off each check.
// Step n: 0..COMMAND.length types the command, then one step per check, then the summary.
function Terminal({ checks, className = '', style }) {
  const total = COMMAND.length + checks.length + 1;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      const t = setTimeout(() => setStep(total), 0);
      return () => clearTimeout(t);
    }

    const timers = [];
    let at = 700; // let the hero entrance land first
    for (let i = 1; i <= total; i++) {
      if (i <= COMMAND.length) at += 45;
      else if (i === COMMAND.length + 1) at += 400;
      else if (i === total) at += 450;
      else at += 380;
      timers.push(setTimeout(() => setStep(i), at));
    }
    return () => timers.forEach(clearTimeout);
  }, [total]);

  const typed = COMMAND.slice(0, Math.min(step, COMMAND.length));
  const rows = Math.max(0, Math.min(step - COMMAND.length, checks.length));
  const done = step === total;

  return (
    <div
      className={`terminal ${className}`}
      style={style}
      role="img"
      aria-label={`Decorative terminal: ${checks.join(', ')} checks passed`}
    >
      <div className="term-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>~/portfolio</span>
      </div>
      <div className="term-body" aria-hidden="true">
        <div>
          <span className="t-prompt">$ </span>
          {typed}
          {step <= COMMAND.length && <span className="t-caret" />}
        </div>
        {checks.slice(0, rows).map((name) => (
          <div key={name} className="t-row">
            <span className="t-ok">✓</span>
            <span>{name}</span>
            <span className="t-lead" />
            <span className="t-pass">passed</span>
          </div>
        ))}
        {done && (
          <div className="t-sum">
            All checks passed ({checks.length}/{checks.length})
          </div>
        )}
      </div>
    </div>
  );
}

// Slow "5G signal" sine waves behind the hero that bend toward the pointer.
// Colour comes from the --wave token; pauses off-screen; one still frame with reduced motion.
function useSignalWaves(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    const reduce = prefersReducedMotion();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, k: 0, tk: 0 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let rgb = '90, 169, 230';

    const readColor = () => {
      rgb = getComputedStyle(document.documentElement).getPropertyValue('--wave').trim() || rgb;
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.k += (pointer.tk - pointer.k) * 0.05;
      const lines = 7;
      const base = height * 0.6;
      for (let i = 0; i < lines; i++) {
        const amp = 10 + i * 6;
        const freq = 0.0045 + i * 0.0007;
        const speed = 0.00035 + i * 0.00008;
        const y0 = base + (i - lines / 2) * 16;
        ctx.beginPath();
        for (let x = 0; x <= width + 6; x += 6) {
          const fade = Math.sin(Math.PI * Math.min(1, x / width));
          const dx = x - pointer.x;
          const pull = Math.exp(-(dx * dx) / 39200) * (pointer.y - y0) * 0.35 * pointer.k;
          const y = y0 + (Math.sin(x * freq + t * speed + i * 1.3) * amp + pull) * fade;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${rgb}, ${0.06 + i * 0.03})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    };

    const loop = (t) => {
      frame = 0;
      if (!visible) return;
      draw(t);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce) draw(2000);
      else if (!frame) frame = requestAnimationFrame(loop);
    };
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = hero.clientWidth;
      height = hero.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(2000);
    };
    const onTheme = () => {
      readColor();
      if (reduce) draw(2000);
    };
    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
      pointer.tk = 1;
    };
    const onLeave = () => {
      pointer.tk = 0;
    };

    readColor();
    resize();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    observer.observe(hero);
    window.addEventListener('resize', resize);
    window.addEventListener('themechange', onTheme);
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('themechange', onTheme);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, [canvasRef]);
}
