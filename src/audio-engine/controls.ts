import { Frequency, start, Time, Transport } from 'tone';
import { DEFAULT_TEMPO } from '../constants';
import { store } from '../store';
import { setPattern } from '../store/sequencer';
import { setPlaying, setStep, setTempo } from '../store/transport';
import { generate } from './generator';
import { tb303 } from './synth';

const { dispatch } = store;

Transport.set({ bpm: DEFAULT_TEMPO });

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

Transport.scheduleRepeat((time) => {
  const {
    transport: { currentStep: oldStep },
    sequencer: {
      pattern,
      options: { seqLength, baseNote },
    },
  } = store.getState();

  const currentStep = oldStep + 1 >= seqLength ? 0 : oldStep + 1;

  if (currentStep < pattern.length) {
    const { note, accent, slide, octave } = pattern[currentStep];
    if (note !== null && octave !== null) {
      const len = Time('16n').toSeconds() * (slide ? 1.25 : 0.4);
      const playNote = Frequency(baseNote + note + 12 * octave, 'midi').toNote();
      tb303.triggerAttackRelease(playNote, len, time, accent ? 1 : 0.5);
    }
  }

  dispatch(setStep(currentStep));
}, '16n');

export { toggleTransport, changeTempo };
