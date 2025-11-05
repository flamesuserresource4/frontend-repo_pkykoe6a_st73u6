import { useEffect } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import NeonBackground from './components/NeonBackground';

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('bg-black');
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white relative overflow-x-hidden">
      <NeonBackground />

      {/* Top Nav - minimal, neon */}
      <header className="fixed top-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-4 flex items-center justify-between">
          <a href="#" className="font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-emerald-300 drop-shadow-[0_0_20px_rgba(0,255,255,0.35)]">
            CYBER•RONIN
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#skills" className="text-neutral-300 hover:text-cyan-300">Skills</a>
            <a href="#projects" className="text-neutral-300 hover:text-cyan-300">Projects</a>
          </nav>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </header>

      <main className="relative">
        <Hero />
        <Skills />
        <Projects />
      </main>

      <footer className="relative py-10 bg-[#0b0b0b] border-t border-white/10 text-center text-neutral-400">
        © {new Date().getFullYear()} Cyber-Ronin — Built with passion and neon.
      </footer>
    </div>
  );
}
