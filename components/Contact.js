'use client';
import { useEffect, useRef, useState } from 'react';
import { links, profile } from '@/data/resume';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';
import { Reveal, copyEmail } from './ui';

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <Reveal className="container contact-inner">
        <p className="eyebrow">What&apos;s next?</p>
        <h2 className="contact-title">Let&apos;s work together</h2>
        <p className="contact-text">
          I&apos;m always happy to talk about test automation, CI/CD, or new opportunities.
          The best way to reach me is by email or LinkedIn.
        </p>

        <div className="contact-actions">
          <CopyEmail email={links.email} />
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <LinkedInIcon width={18} height={18} />
            LinkedIn
          </a>
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <GitHubIcon width={18} height={18} />
              GitHub
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const linkRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    if (await copyEmail(email, linkRef.current)) {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="copy-box">
      <a ref={linkRef} href={`mailto:${email}`} className="copy-email">
        <MailIcon width={18} height={18} />
        {email}
      </a>
      <button type="button" className="btn btn-primary copy-btn" onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <p>Built with Next.js</p>
      </div>
    </footer>
  );
}
