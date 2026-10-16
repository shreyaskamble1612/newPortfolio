// Web Audio API Procedural Synthesizer for 3D Sci-Fi UI Effects
// 100% generated in code with zero external audio assets

let audioCtx = null;
let chargeOsc = null;
let chargeGain = null;
let isSoundEnabled = false;

function getAudioContext() {
  if (!audioCtx && typeof window !== "undefined") {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled) {
  isSoundEnabled = enabled;
  if (enabled) {
    getAudioContext();
  } else if (chargeOsc) {
    try {
      chargeOsc.stop();
      chargeOsc.disconnect();
      chargeOsc = null;
    } catch (_) {}
  }
}

export function getSoundEnabled() {
  return isSoundEnabled;
}

// 1. Crystal Shockwave Ping (On Click)
export function playShockwaveSound() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(587.33, now); // D5
  osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08); // D6
  osc.frequency.exponentialRampToValueAtTime(440, now + 0.35); // A4

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.42);
}

// 2. Supernova Detonation Boom (On Black Hole Release)
export function playSupernovaSound() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Sub-bass thump
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();

  subOsc.type = "sine";
  subOsc.frequency.setValueAtTime(140, now);
  subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.5);

  subGain.gain.setValueAtTime(0.2, now);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

  subOsc.connect(subGain);
  subGain.connect(ctx.destination);

  subOsc.start(now);
  subOsc.stop(now + 0.65);

  // High-frequency crystal shimmer
  const shimmerOsc = ctx.createOscillator();
  const shimmerGain = ctx.createGain();

  shimmerOsc.type = "triangle";
  shimmerOsc.frequency.setValueAtTime(880, now);
  shimmerOsc.frequency.exponentialRampToValueAtTime(1760, now + 0.2);
  shimmerOsc.frequency.exponentialRampToValueAtTime(523.25, now + 0.6);

  shimmerGain.gain.setValueAtTime(0.08, now);
  shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

  shimmerOsc.connect(shimmerGain);
  shimmerGain.connect(ctx.destination);

  shimmerOsc.start(now);
  shimmerOsc.stop(now + 0.65);
}

// 3. Singularity Charge Hum (On Mouse Hold)
export function startChargeHum() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (chargeOsc) return;

  const now = ctx.currentTime;
  chargeOsc = ctx.createOscillator();
  chargeGain = ctx.createGain();

  chargeOsc.type = "sawtooth";
  chargeOsc.frequency.setValueAtTime(65, now);
  chargeOsc.frequency.exponentialRampToValueAtTime(320, now + 1.2);

  chargeGain.gain.setValueAtTime(0.01, now);
  chargeGain.gain.linearRampToValueAtTime(0.09, now + 0.8);

  // Lowpass filter to keep it rich and deep
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(250, now);
  filter.frequency.exponentialRampToValueAtTime(800, now + 1.2);

  chargeOsc.connect(filter);
  filter.connect(chargeGain);
  chargeGain.connect(ctx.destination);

  chargeOsc.start(now);
}

export function stopChargeHum() {
  if (chargeOsc) {
    try {
      chargeOsc.stop();
      chargeOsc.disconnect();
    } catch (_) {}
    chargeOsc = null;
  }
}

// 4. Car Nitro Boost Sound
export function playNitroSound() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(650, now + 0.3);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1200, now);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.52);
}

// 5. Coin / Nitro Orb Pickup
export function playPickupSound() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(987.77, now); // B5
  osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); // E6

  gain.gain.setValueAtTime(0.09, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.26);
}

// 6. Car Crash Sound
export function playCrashSound() {
  if (!isSoundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(90, now);
  osc.frequency.exponentialRampToValueAtTime(25, now + 0.45);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.52);
}

