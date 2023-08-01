import { MonoSynth, PingPongDelay, Split, Volume } from 'tone';

const split = new Split(2);
const pingPong = new PingPongDelay('8n.', 0.6).toDestination();
const vol = new Volume(-32).connect(pingPong);

split.connect(vol);

const tb303 = new MonoSynth({
  oscillator: {
    type: 'sawtooth',
  },
  envelope: {
    attackCurve: 'exponential',
    releaseCurve: 'exponential',
    attack: 0.01,
    decay: 0.3,
    sustain: 0.5,
    release: 0.8,
  },
  filterEnvelope: {
    attackCurve: 'exponential',
    releaseCurve: 'exponential',
    attack: 0.01,
    decay: 0.3,
    sustain: 0.5,
    release: 0.8,
    baseFrequency: 440,
    exponent: 12,
  },
  filter: {
    frequency: 220,
    rolloff: -24,
    Q: 6,
    type: 'lowpass',
  },
})
  .connect(split)
  .toDestination();

export { tb303 };
