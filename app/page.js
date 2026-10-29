import fs from 'node:fs';
import path from 'node:path';
import { profile } from '@/data/resume';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact, { Footer } from '@/components/Contact';
import PageEffects from '@/components/PageEffects';

export default function Home() {
  // Checked at build time: the download button appears once the PDF is in public/.
  const hasResume = fs.existsSync(path.join(process.cwd(), 'public', profile.resumeFile));

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero hasResume={hasResume} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <PageEffects />
    </>
  );
}
