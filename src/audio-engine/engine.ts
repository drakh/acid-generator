import { random } from 'lodash';
import {
  start,
  MonoSynth,
  Transport,
  Frequency,
  Time,
  PingPongDelay,
  Volume,
  Split,
  type Unit,
} from 'tone';
import { store, setStep } from '../store.ts';
import { SCALES, SCALE } from './scales.ts';

Transport.set({ bpm: 150 });

const scale = SCALES[SCALE.PHRYGIAN];
const baseNote = 33;

const split = new Split(2);
const pingPong = new PingPongDelay('8n.', 0.6).toDestination();
const vol = new Volume(-24).connect(pingPong);

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
    baseFrequency: 220,
    exponent: 6,
  },
  filter: {
    rolloff: -24,
    Q: 6,
    type: 'lowpass',
  },
})
  .connect(split)
  .toDestination();

const arrayRand = (arr: number[], l: number): number[] => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, l);
};

interface SequenceStep<T = Unit.Note | null> {
  note: T extends null ? Unit.Note : null;
  len: T extends null ? Unit.Time : null;
  velocity: T extends null ? number : null;
}

const generate = (length: number): SequenceStep[] => {
  const elements = Array(length)
    .fill(0)
    .map((_v, i) => i);
  const notesToGenerate = random(1, length);
  const selectedSteps = arrayRand(elements, notesToGenerate);
  const accents = arrayRand(selectedSteps, random(0, notesToGenerate));
  const slides = arrayRand(selectedSteps, random(0, notesToGenerate));
  const randNotes = arrayRand(selectedSteps, random(0, notesToGenerate));

  const spread = random(0, scale.length - 1);
  const selectedNotes = arrayRand(scale, spread);

  const out = elements.map((v) => {
    if (!selectedSteps.includes(v) || selectedSteps.length === 0) {
      return {
        note: null,
        velocity: null,
        len: null,
      };
    }
    const octave = random(-1, 1);
    const scaleNote =
      randNotes.includes(v) && selectedNotes.length > 0
        ? selectedNotes[random(0, selectedNotes.length - 1)]
        : 0;
    const note = Frequency(baseNote + scaleNote + 12 * octave, 'midi').toNote();
    return {
      note,
      velocity: accents.includes(v) ? 0.7 : 0.3,
      len: Time('16n').toSeconds() * (slides.includes(v) ? 1.25 : 0.4),
    };
  });
  return out;
};

let sequence = generate(16);

const toggleTransport = async () => {
  try {
    await start();
  } catch (e) {
    console.error(e);
  } finally {
    if (Transport.state === 'started') {
      store.dispatch(setStep(0));
    } else {
      sequence = generate(16);
    }
    Transport.toggle();
  }
};

Transport.scheduleRepeat(() => {
  const {
    steps: { currentStep, maxSteps },
  } = store.getState();
  const { note, velocity, len } = sequence[currentStep];
  if (note !== null && len !== null && velocity !== null) {
    tb303.triggerAttackRelease(note, len, undefined, velocity);
  }
  store.dispatch(setStep(currentStep >= maxSteps - 1 ? 0 : currentStep + 1));
}, '16n');

export { toggleTransport };
