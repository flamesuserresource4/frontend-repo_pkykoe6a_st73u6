import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { createSoundFX } from './SoundFX';

function ProjectCard({ title, description, tags }) {
  const sfx = createSoundFX();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [12, -12]);
  const rotateY = useTransform(x, [-50, 50], [-12, 12]);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    x.set(dx / 4);
    y.set(dy / 4);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onMouseEnter={sfx.hover}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative rounded-2xl p-[2px] bg-gradient-to-r from-cyan-400/60 via-fuchsia-500/60 to-emerald-400/60 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
    >
      <div className="relative rounded-2xl h-full w-full bg-[#0b0b0b] border border-white/10 overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 23px, rgba(255,255,255,0.08) 24px), linear-gradient(90deg, transparent 23px, rgba(255,255,255,0.08) 24px)', backgroundSize: '24px 24px' }} />
        {/* Neon border flicker */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-300/40 group-hover:ring-fuchsia-400/60 transition-all" />

        <div className="p-5 flex flex-col gap-4">
          <h3 className="font-extrabold text-lg md:text-xl text-neutral-100 tracking-wide">
            {title}
          </h3>
          <p className="text-neutral-300/90 text-sm leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <motion.a onClick={sfx.click} href="#" className="inline-flex items-center gap-1 text-cyan-300 hover:text-fuchsia-300">
              <ExternalLink className="h-4 w-4" /> Live
            </motion.a>
            <motion.a onClick={sfx.click} href="#" className="inline-flex items-center gap-1 text-neutral-300 hover:text-emerald-300">
              <Github className="h-4 w-4" /> Code
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const projects = [
    {
      title: 'Neon Grid Visualizer',
      description: 'A WebGL-powered audio-reactive grid with cyberpunk neon trails and glitch transitions.',
      tags: ['React', 'WebGL', 'Shaders']
    },
    {
      title: 'Holographic Dashboard',
      description: 'Real-time metrics dashboard with 3D parallax, elastic micro-interactions, and dark UI.',
      tags: ['React', 'Framer Motion', 'Tailwind']
    },
    {
      title: 'AI Code Concierge',
      description: 'A FastAPI + LLM service orchestrating coding prompts into executable results.',
      tags: ['Python', 'FastAPI', 'LLM']
    }
  ];

  return (
    <section id="projects" className="relative py-16 md:py-24 bg-[#0a0a0a] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.06),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-emerald-300">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map(p => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
