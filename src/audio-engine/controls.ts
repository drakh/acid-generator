import { Frequency, start, Time, Transport } from 'tone';
import { Midi } from '@tonejs/midi';
import dockerNames from 'docker-names-ts';
import { store } from '../store';
import { setGenerate } from '../store/generator';
import { setName, setPattern } from '../store/sequencer';
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
  console.info('stop');
  try {
    tb303.triggerRelease();
  } finally {
    dispatch(setPlaying(false));
    dispatch(setStep(-1));
  }
});

Transport.on('start', () => {
  console.info('start');
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

const generatePattern = (force = false) => {
  const {
    transport: { playing },
    generator: { patternLength, density, spread, accentsDensity, slidesDensity },
  } = store.getState();
  console.info({ force, playing });
  if (playing && !force) {
    console.info('prepare to generate');
    dispatch(setGenerate(true));
    return;
  }
  console.info('generate');
  dispatch(setGenerate(false));
  dispatch(setName(dockerNames.getRandomName()));
  dispatch(
    setPattern(
      generate({ patternLength, density, spread, accentsDensity, slidesDensity }),
    ),
  );
  return;
};

const playSequenceStep = (time: number) => {
  const {
    transport: { currentStep: oldStep },
    sequencer: {
      pattern,
      options: { baseNote, scale },
    },
    generator: { dispatchGenerate },
  } = store.getState();

  const seqLength = pattern.length;

  const currentStep = getNextStep(oldStep, seqLength);

  if (currentStep === 0 && dispatchGenerate) {
    generatePattern(true);
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

const download = <T extends ArrayBuffer>(data: T, fileName: string): void => {
  const el = document.createElement('a');
  el.href = URL.createObjectURL(new Blob([data]));
  el.download = fileName;
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
};

const downloadPattern = () => {
  const {
    sequencer: {
      name,
      pattern,
      options: { scale, baseNote },
    },
    transport: { tempo },
  } = store.getState();

  const midi = new Midi();
  const { header } = midi;

  const { PPQ } = Transport;
  const { ppq } = header;

  const ppqRatio = ppq / PPQ;
  const baseNoteLen = Time('16n').toTicks() * ppqRatio;

  header.name = name;
  header.tempos.push({ ticks: 0, bpm: tempo });
  header.timeSignatures.push({ ticks: 0, timeSignature: [4, 4] });

  const track = midi.addTrack();
  track.name = '303';
  track.channel = 0;
  pattern.forEach(({ note, accent, slide, octave }, i) => {
    if (note !== null && octave !== null) {
      track.addNote({
        midi: getNoteInScale(note, scale, baseNote, octave),
        durationTicks: Math.round(baseNoteLen * (slide ? 1.25 : 0.7)),
        ticks: Math.round(i * baseNoteLen),
        velocity: accent ? 127 : 63,
      });
    }
  });
  header.update();

  download(midi.toArray(), `${scale}_${name}.mid`);
};

export {
  toggleTransport,
  changeTempo,
  changeCutoff,
  changeResonance,
  changeDelaySend,
  downloadPattern,
  generatePattern,
};
