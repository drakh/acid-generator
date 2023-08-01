import { random } from 'lodash';
import { Frequency, Time, Unit } from 'tone';
import { arrayRand } from '../utils.ts';
import { SCALE, SCALES } from './scales.ts';

type Octave = -1 | 0 | 1;

export interface SequenceStep<T = Unit.Note | null> {
  note: T extends null ? null : Unit.Note;
  len: T extends null ? null : Unit.Time;
  velocity: T extends null ? null : number;
  octave: T extends null ? null : Octave;
}

const generate = (
  seqLength: number,
  baseNote = 33,
  scale = SCALES[SCALE.PHRYGIAN],
): SequenceStep[] => {
  const elements = Array(seqLength)
    .fill(0)
    .map((_v, i) => i);
  const notesToGenerate = random(1, seqLength);
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
        octave: null,
      };
    }
    const octave = random(-1, 1) as Octave;
    const scaleNote =
      randNotes.includes(v) && selectedNotes.length > 0
        ? selectedNotes[random(0, selectedNotes.length - 1)]
        : 0;
    const note = Frequency(baseNote + scaleNote + 12 * octave, 'midi').toNote();
    return {
      note,
      octave,
      velocity: accents.includes(v) ? 0.7 : 0.3,
      len: Time('16n').toSeconds() * (slides.includes(v) ? 1.25 : 0.4),
    };
  });
  return out;
};

export { generate };
