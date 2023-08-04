import { start, Transport, Time, Frequency } from 'tone';
import { tb303 } from './synth';
import { store } from '../store';
import { setStep, setPlaying, setTempo } from '../store/transport';
import { setPattern } from '../store/sequencer';
import { generate } from './generator';
import { BASE_TEMPO } from '../constants';

const { dispatch } = store;

Transport.set({ bpm: BASE_TEMPO });

const changeTempo = (bpm: number) => {
  Transport.set({ bpm });
  dispatch(setTempo(bpm));
};

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
    dispatch(setPlaying(Transport.state === 'started'));
  }
};

Transport.scheduleRepeat(() => {
  const {
    transport: { currentStep: oldStep },
    sequencer: {
      pattern,
      options: { maxSteps, baseNote },
    },
  } = store.getState();

  const currentStep = oldStep + 1 >= maxSteps ? 0 : oldStep + 1;

  if (currentStep < pattern.length) {
    const { note, accent, slide, octave } = pattern[currentStep];
    if (note !== null && octave !== null) {
      const len = Time('16n').toSeconds() * (slide ? 1.25 : 0.4);
      const playNote = Frequency(baseNote + note + 12 * octave, 'midi').toNote();
      tb303.triggerAttackRelease(playNote, len, undefined, accent ? 1 : 0.5);
    }
  }

  dispatch(setStep(currentStep));
}, '16n');

export { toggleTransport, changeTempo };
