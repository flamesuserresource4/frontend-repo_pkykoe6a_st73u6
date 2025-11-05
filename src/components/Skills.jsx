import { Code2, Cpu, Terminal, GitBranch } from 'lucide-react';
import { motion } from 'framer-motion';
import { createSoundFX } from './SoundFX';

const skills = [
  { icon: Code2, label: 'React & Vite', color: 'from-cyan-400 to-fuchsia-500' },
  { icon: Cpu, label: 'Python & FastAPI', color: 'from-emerald-400 to-cyan-400' },
  { icon: Terminal, label: 'DevOps & CI', color: 'from-fuchsia-400 to-rose-400' },
  { icon: GitBranch, label: 'Git Strategy', color: 'from-amber-300 to-emerald-300' }
];

export default function Skills() {
  const sfx = createSoundFX();

  return (
    <section id="skills" className="relative py-16 md:py-24 bg-[#0b0b0b] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,0,180,0.08),transparent_40%)]" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-emerald-300">Core Abilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map(({ icon: Icon, label, color }, idx) => (
            <motion.div
              key={label}
              onMouseEnter={sfx.hover}
              whileHover={{ y: -4 }}
              className="relative rounded-xl p-[1px] bg-gradient-to-r from-cyan-400/40 via-fuchsia-500/40 to-emerald-400/40"
            >
              <div className="rounded-xl h-full w-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm">
                <div className="p-5 flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.35)]`}>
                    <Icon className="h-5 w-5 text-black drop-shadow" />
                  </div>
                  <span className="font-semibold text-neutral-100">{label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
