// Spectra Mood Ring — emergent, emotionally-responsive halo

// Helper: smooth noise (1D value noise)
function makeNoise(seed = 1) {
  let s = seed >>> 0;
  const rand = () => (s = (s * 1664525 + 1013904223) >>> 0) / 0xffffffff;
  const gradients = new Array(256).fill(0).map(() => rand() * 2 - 1);
  const fade = (t) => t * t * (3 - 2 * t);
  return function noise1d(x) {
    const i0 = Math.floor(x) & 255;
    const i1 = (i0 + 1) & 255;
    const t = x - Math.floor(x);
    const g0 = gradients[i0];
    const g1 = gradients[i1];
    const v0 = g0 * t;
    const v1 = g1 * (t - 1);
    return (1 + (v0 * (1 - fade(t)) + v1 * fade(t))) * 0.5; // 0..1
  };
}

// Palette mapping by state
const PALETTES = {
  calm: ['#A3D9FF', '#7AC7B7', '#C9E4CA'],
  joy: ['#FF6F61', '#FFC1B6', '#FFA07A'],
  passion: ['#E63946', '#9D0191', '#7B2FF7'],
  anxiety: ['#4A6FA5', '#6B5876', '#7A7D7D'],
  jealousy: ['#7D8B2C', '#C9B037', '#A68A00'],
  creative: ['#7AC7B7', '#7B2FF7', '#FF6F61'], // bridging calm→passion→joy
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function mixColors(hex1, hex2, t) {
  const c1 = hexToRgb(hex1),
    c2 = hexToRgb(hex2);
  const r = Math.round(lerp(c1.r, c2.r, t));
  const g = Math.round(lerp(c1.g, c2.g, t));
  const b = Math.round(lerp(c1.b, c2.b, t));
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
    : { r: 0, g: 0, b: 0 };
}

// Create SVG arc with stroke-dasharray proportion to intensity
function setArcFraction(el, frac) {
  const r = 44; // from SVG
  const circumference = 2 * Math.PI * r;
  const dash = clamp01(frac) * circumference;
  el.setAttribute('stroke-dasharray', `${dash} ${circumference}`);
  el.setAttribute('transform', 'rotate(-90 50 50)'); // start at 12 o'clock
}

// Procedural face (very simple): two eyes and a mouth arc whose curvature follows intensity
function drawFace(container, intensity, color) {
  container.innerHTML = '';
  const eye = document.createElement('div');
  eye.style.position = 'absolute';
  eye.style.width = '12%';
  eye.style.height = '12%';
  eye.style.borderRadius = '50%';
  eye.style.background = color;
  eye.style.boxShadow = `0 0 8px ${color}`;

  const left = eye.cloneNode();
  left.style.left = '28%';
  left.style.top = '32%';
  const right = eye.cloneNode();
  right.style.right = '28%';
  right.style.top = '32%';

  const mouth = document.createElement('div');
  mouth.style.position = 'absolute';
  mouth.style.left = '32%';
  mouth.style.right = '32%';
  mouth.style.bottom = '30%';
  mouth.style.height = '16%';
  mouth.style.borderBottom = `4px solid ${color}`;
  mouth.style.borderRadius = '0 0 80% 80% / 0 0 100% 100%';
  mouth.style.filter = 'blur(0.3px)';

  // intensity tilts smile vs flat; anxiety inverts slightly
  const curvature = lerp(0.2, 1.0, 1 - intensity);
  mouth.style.transform = `scaleY(${curvature})`;

  container.appendChild(left);
  container.appendChild(right);
  container.appendChild(mouth);
}

// Hum ambience (WebAudio) — gentle sine with small noise modulation
function createHum() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = 174; // Solfeggio-ish low hum
  gain.gain.value = 0.0;
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  const n = makeNoise(7);
  let t0 = ctx.currentTime;
  function setLevel(level) {
    const now = ctx.currentTime;
    const v = 0.03 + 0.07 * level; // 0.03..0.1
    gain.gain.linearRampToValueAtTime(
      v * (0.9 + 0.1 * n(now - t0)),
      now + 0.05
    );
  }
  return {
    ctx,
    setLevel,
    stop: () => {
      osc.stop();
      ctx.close();
    },
  };
}

async function enableCamera(videoEl, hostEl) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false,
    });
    videoEl.srcObject = stream;
    hostEl.classList.add('camera-on');
  } catch (e) {
    console.warn('Camera permission denied or unavailable', e);
  }
}

// Main
const moodArc = document.getElementById('moodArc');
const glints = document.getElementById('glints');
const face = document.getElementById('face');
const ringHost = document.getElementById('ringHost');

const sel = document.getElementById('stateSel');
const intensityEl = document.getElementById('intensity');
const tempoEl = document.getElementById('tempo');
const sparksEl = document.getElementById('sparks');
const btnCam = document.getElementById('btnCamera');
const btnHum = document.getElementById('btnHum');
const camVideo = document.getElementById('cam');

let hum = null;
let time = 0;
const noise = makeNoise(3);

// create glints
for (let i = 0; i < 5; i++) {
  const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  c.setAttribute('r', String(0.8 + i * 0.15));
  c.setAttribute('fill', 'white');
  c.setAttribute('opacity', '0.0');
  glints.appendChild(c);
}

btnCam.addEventListener('click', () => enableCamera(camVideo, ringHost));
btnHum.addEventListener('click', () => {
  if (!hum) {
    hum = createHum();
    btnHum.textContent = 'Pause';
  } else {
    hum.stop();
    hum = null;
    btnHum.textContent = 'Play';
  }
});

function pickPalette(state) {
  return PALETTES[state] || PALETTES.calm;
}

function animate(ts) {
  requestAnimationFrame(animate);
  const dt = ts ? ts / 1000 : 0.016;
  time += dt;

  const state = sel.value;
  let intensity = parseFloat(intensityEl.value); // 0..1
  const tempo = parseFloat(tempoEl.value); // slow→fast
  const palette = pickPalette(state);

  // creative flow adds layered modulation
  const baseN = noise(time * 0.25 * tempo);
  const slowBreath = 0.5 + 0.5 * Math.sin(time * 0.5 * tempo);
  const micro = noise(time * 1.7 * tempo);

  // map intensity for calm vs passion
  let frac = 0.15 + 0.7 * (0.3 * baseN + 0.7 * intensity);
  if (state === 'calm') frac = 0.2 + 0.25 * slowBreath; // slow oceanic
  if (state === 'anxiety') frac = 0.1 + 0.5 * micro; // tremble

  setArcFraction(moodArc, frac);

  // color blend through palette triplet (two-segment lerp)
  const t = 0.5 * (baseN + slowBreath); // 0..1
  const mid = mixColors(palette[0], palette[1], clamp01(t));
  const col = mixColors(mid, palette[2], clamp01(0.5 * (t + micro)));
  moodArc.setAttribute('stroke', col);

  // face follows intensity and color cue
  drawFace(face, intensity, col);

  // glints orbit with tempo and flash with intensity spikes
  const children = glints.children;
  for (let i = 0; i < children.length; i++) {
    const theta = time * (0.3 + 0.2 * tempo) + i * 1.256;
    const r = 44; // same as arc
    const cx = 50 + Math.cos(theta) * r;
    const cy = 50 + Math.sin(theta) * r;
    const k = 0.2 + 0.8 * (intensity * (0.7 + 0.3 * micro));
    children[i].setAttribute('cx', String(cx));
    children[i].setAttribute('cy', String(cy));
    children[i].setAttribute('opacity', String(k));
    children[i].setAttribute('fill', col);
  }

  // hum level follows intensity gently
  if (hum) hum.setLevel(0.2 * intensity + 0.2 * slowBreath);
}

requestAnimationFrame(animate);
