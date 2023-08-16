import { Frequency, start, Time, Transport } from 'tone';
import { store } from '../store';
import { setGenerate } from '../store/generator';
import { setPattern } from '../store/sequencer';
import { setPlaying, setStep, setTempo } from '../store/transport';
import { setCutoff, setDelaySend, setResonance } from '../store/synth';
import { generate } from './generator';
import { delaySend, tb303 } from './synth';
import { getNoteInScale } from '../utils';

const { dispatch } = store;

const {
  transport: { tempo },
} = store.getState();

Transport.set({ bpm: tempo });

Transport.on('stop', () => {
  try {
    tb303.triggerRelease();
  } finally {
    dispatch(setPlaying(false));
    dispatch(setStep(-1));
  }
});

Transport.on('start', () => {
  dispatch(setPlaying(true));
});

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
    Transport.toggle();
  }
};

const getNextStep = (step: number, maxSteps: number): number => {
  return step + 1 >= maxSteps ? 0 : step + 1;
};

const playSequenceStep = (time: number) => {
  const {
    transport: { currentStep: oldStep },
    sequencer: {
      pattern,
      options: { baseNote, scale },
    },
    generator: {
      dispatchGenerate,
      patternLength,
      density,
      spread,
      accentsDensity,
      slidesDensity,
    },
  } = store.getState();

  const seqLength = pattern.length;

  const currentStep = getNextStep(oldStep, seqLength);

  if (currentStep === 0 && dispatchGenerate) {
    dispatch(setGenerate(false));
    dispatch(
      setPattern(
        generate({ patternLength, density, spread, accentsDensity, slidesDensity }),
      ),
    );
  }

  if (currentStep < pattern.length) {
    const { note, accent, slide, octave } = pattern[currentStep];

    if (note !== null && octave !== null) {
      const len = Time('16n').toSeconds() * (slide ? 1.25 : 0.4);
      const playNote = Frequency(
        getNoteInScale(note, scale, baseNote, octave),
        'midi',
      ).toNote();
      tb303.triggerAttack(playNote, time, accent ? 1 : 0.5);
      if (!slide) {
        tb303.triggerRelease(time + len);
      }
    }
  }

  dispatch(setStep(currentStep));
};

const changeCutoff = (v: number) => {
  // @ts-ignore: FrequencyEnvelope vs EnvelopeOptions which is missing baseFrequency
  tb303.filterEnvelope.set({ baseFrequency: v });
  tb303.filter.set({ frequency: v });
  dispatch(setCutoff(v));
};

const changeResonance = (v: number) => {
  tb303.filter.set({ Q: v });
  dispatch(setResonance(v));
};

const changeDelaySend = (v: number) => {
  delaySend.set({ volume: v });
  dispatch(setDelaySend(v));
};

Transport.scheduleRepeat(playSequenceStep, '16n');

export { toggleTransport, changeTempo, changeCutoff, changeResonance, changeDelaySend };
