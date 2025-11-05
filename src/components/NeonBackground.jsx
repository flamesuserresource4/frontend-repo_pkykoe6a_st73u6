import { useEffect, useRef } from 'react';

// Canvas-based neon particles + matrix rain overlay
export default function NeonBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initMatrix();
    };

    window.addEventListener('resize', onResize);

    // Neon particles
    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.6,
      c: [
        'rgba(0, 255, 200, 0.6)',
        'rgba(0, 200, 255, 0.6)',
        'rgba(255, 0, 180, 0.6)',
        'rgba(120, 255, 120, 0.6)'
      ][(Math.random() * 4) | 0]
    }));

    // Matrix rain
    const symbols = 'アカサタナハマヤラワ0123456789ZXCVBNM';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = new Array(columns).fill(0).map(() => Math.random() * -100);

    function initMatrix() {
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -100);
    }

    const draw = () => {
      // Subtle fade for trails
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, 0, width, height);

      // Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, p.c);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // Matrix rain
      ctx.fillStyle = '#39FF14';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = symbols.charAt((Math.random() * symbols.length) | 0);
        const x = i * fontSize;
        const y = (drops[i] * fontSize) % (height + fontSize * 20);
        ctx.fillText(text, x, y);
        drops[i] += 0.8 + Math.random() * 0.6;
      }

      requestAnimationFrame(draw);
    };

    // Initialize black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Neon gradient glow overlays */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl opacity-40" style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(0,255,200,0.6), transparent 60%)'
      }} />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-40" style={{
        background: 'radial-gradient(circle at 70% 70%, rgba(255,0,180,0.5), transparent 60%)'
      }} />
    </div>
  );
}
