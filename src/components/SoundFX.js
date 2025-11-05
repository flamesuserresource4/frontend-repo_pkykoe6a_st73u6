// Simple Web Audio sound effects for hover and click without external assets
export function createSoundFX() {
  let audioCtx = null;

  const ensureCtx = () => {
    if (audioCtx) return audioCtx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioCtx = new Ctx();
    return audioCtx;
  };

  const playTone = (freq = 440, duration = 0.08, type = 'sine', volume = 0.08) => {
    const ctx = ensureCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    // Quick envelope for click-less sound
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume * 0.6), now + duration * 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.stop(now + duration);
  };

  const hover = () => {
    playTone(880, 0.06, 'triangle', 0.06);
  };

  const click = () => {
    const ctx = ensureCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.09);
    gain.gain.value = 0.06;
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  };

  return { hover, click };
}
