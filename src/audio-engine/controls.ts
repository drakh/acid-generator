import { start, Transport, Time, Frequency } from 'tone';
import { tb303 } from './synth';
import { store, setStep, setPattern } from '../store';
import { generate } from './generator';

Transport.set({ bpm: 90 });

const BASE_NOTE = 36;

const toggleTransport = async () => {
  try {
    await start();
  } catch (e) {
    console.error(e);
  } finally {
    if (Transport.state === 'started') {
      store.dispatch(setStep(-1));
    } else {
      store.dispatch(setPattern(generate(16)));
    }
    Transport.toggle();
  }
};

Transport.scheduleRepeat(() => {
  const {
    sequencer: { currentStep: oldStep, maxSteps },
    pattern,
  } = store.getState();

  const currentStep = oldStep + 1 >= maxSteps ? 0 : oldStep + 1;

  const { note, accent, slide, octave } = pattern[currentStep];

  if (note !== null && octave !== null) {
    const len = Time('16n').toSeconds() * (slide ? 1.25 : 0.4);
    const playNote = Frequency(BASE_NOTE + note + 12 * octave, 'midi').toNote();
    tb303.triggerAttackRelease(playNote, len, undefined, accent ? 1 : 0.5);
  }
  store.dispatch(setStep(currentStep));
}, '16n');

export { toggleTransport };
