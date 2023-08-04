import { random } from 'lodash';
import { type Unit } from 'tone';
// import { getPattern } from 'euclidean-rhythms';
import { arrayRand } from '../utils';
import { DEFAUL_SCALE } from '../constants';
import { SCALES } from './scales';

type Octave = -1 | 0 | 1;

export interface SequenceStep<T extends Unit.Note | null = Unit.Note | null> {
  note: T extends null ? T : number;
  octave: T extends null ? T : Octave;
  accent: T extends null ? T : boolean;
  slide: T extends null ? T : boolean;
}

const generate = (seqLength: number, scaleName = DEFAUL_SCALE): SequenceStep[] => {
  const elements = Array(seqLength)
    .fill(0)
    .map((_v, i) => i);
  const notesToGenerate = random(Math.floor(seqLength / 2), seqLength);
  const selectedSteps = arrayRand(elements, notesToGenerate);
  const accents = arrayRand(selectedSteps, random(0, notesToGenerate));
  const slides = arrayRand(selectedSteps, random(0, notesToGenerate));
  const randNotes = arrayRand(selectedSteps, random(0, notesToGenerate));

  const scale = SCALES[scaleName];
  const spread = random(0, scale.length - 1);
  const selectedNotes = arrayRand(scale, spread);

  const out = elements.map((v) => {
    if (!selectedSteps.includes(v) || selectedSteps.length === 0) {
      return {
        note: null,
        octave: null,
        accent: null,
        slide: null,
      } as SequenceStep<null>;
    }
    const octave = random(-1, 1) as Octave;
    const note =
      randNotes.includes(v) && selectedNotes.length > 0
        ? selectedNotes[random(0, selectedNotes.length - 1)]
        : 0;
    return {
      note,
      octave,
      accent: accents.includes(v),
      slide: slides.includes(v),
    } as SequenceStep<Unit.Note>;
  });
  // const p = getPattern(7, 16);
  // console.info({ p });
  return out;
};

export { generate };
