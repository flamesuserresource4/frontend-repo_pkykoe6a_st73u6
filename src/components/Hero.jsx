import { useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { Github, ExternalLink, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { createSoundFX } from './SoundFX';

export default function Hero() {
  const sfx = createSoundFX();

  useEffect(() => {
    // Warm-up audio context on first gesture (mobile-friendly)
    const handler = () => sfx.hover();
    window.addEventListener('pointerdown', handler, { once: true });
    return () => window.removeEventListener('pointerdown', handler);
  }, []);

  return (
    <section className="relative min-h-[90vh] w-full bg-[#0a0a0a] text-white flex items-center justify-center overflow-hidden">
      {/* 3D Spline scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays not blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-6 md:px-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 text-cyan-300/90">
            <Sparkles className="h-4 w-4" />
            <span className="uppercase tracking-[0.25em] text-xs">Cyber-Ronin Portfolio</span>
          </div>

          <h1 className="font-extrabold leading-tight text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-emerald-300 drop-shadow-[0_0_30px_rgba(0,255,200,0.25)]">
            Digital Samurai of Code
          </h1>

          <p className="text-neutral-300/90 max-w-xl">
            I craft immersive, high-performance interfaces with a flair for neon-drenched futurism.
            React, Python, and creative engineering—woven into cinematic experiences.
          </p>

          <div className="flex items-center gap-4">
            <motion.a
              href="#projects"
              onMouseEnter={sfx.hover}
              onClick={sfx.click}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-5 py-3 font-semibold text-white shadow-[0_0_25px_rgba(0,255,255,0.35)] hover:shadow-[0_0_40px_rgba(0,255,255,0.55)] transition-shadow"
            >
              Explore Projects
              <ExternalLink className="h-4 w-4" />
              <span className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-cyan-300/40" />
            </motion.a>

            <motion.a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={sfx.hover}
              onClick={sfx.click}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-5 py-3 font-semibold text-white backdrop-blur-sm border border-white/10 hover:border-cyan-300/40"
            >
              <Github className="h-4 w-4" /> GitHub
            </motion.a>
          </div>
        </motion.div>

        {/* Stylized masked avatar via holographic card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative h-[420px] md:h-[520px]"
        >
          {/* Holographic frame */}
          <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm shadow-[0_0_60px_rgba(0,255,255,0.15)] overflow-hidden">
            <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(0,255,200,0.18), rgba(255,0,180,0.14), rgba(120,255,120,0.12))' }} />
            {/* Anime-style silhouette represented as CSS art to avoid external assets */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative">
                <div className="h-40 w-40 md:h-56 md:w-56 rounded-full bg-gradient-to-br from-cyan-300 to-fuchsia-400 blur-[2px] opacity-80" />
                <div className="absolute inset-0 -translate-y-2 grid place-items-center">
                  <div className="h-36 w-36 md:h-48 md:w-48 rounded-full bg-[#0a0a0a] ring-4 ring-cyan-300/40 shadow-[inset_0_0_40px_rgba(0,255,255,0.35)]" />
                </div>
                {/* Masked visor */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 md:h-8 w-28 md:w-36 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-300 to-fuchsia-400 shadow-[0_0_30px_rgba(0,255,255,0.6)]" />
                {/* Floating holograms */}
                <div className="absolute -left-4 -top-2 text-cyan-300/90 text-xs md:text-sm">{'<React/>'}</div>
                <div className="absolute -right-4 top-4 text-emerald-300/90 text-xs md:text-sm">{'def code():'}</div>
                <div className="absolute left-8 -bottom-2 text-fuchsia-300/90 text-xs md:text-sm">{'npm run dev'}</div>
              </div>
            </div>
          </div>
          {/* Neon edges */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 opacity-40 blur" />
        </motion.div>
      </div>
    </section>
  );
}
