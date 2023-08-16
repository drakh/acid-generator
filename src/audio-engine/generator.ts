import { random } from 'lodash';
import { type Unit } from 'tone';
// import { getPattern } from 'euclidean-rhythms';
import { arrayRand } from '../utils';

const scale = Array(7)
  .fill(0)
  .map((_v, i) => i);

type Octave = -1 | 0 | 1;

export interface SequenceStep<T extends Unit.Note | null = Unit.Note | null> {
  note: T extends null ? T : number;
  octave: T extends null ? T : Octave;
  accent: T extends null ? T : boolean;
  slide: T extends null ? T : boolean;
}

interface GeneratorParams {
  patternLength: number;
  density: number;
  spread: number;
  accentsDensity: number;
  slidesDensity: number;
}

const generate = ({
  patternLength,
  density,
  spread,
  accentsDensity,
  slidesDensity,
}: GeneratorParams): SequenceStep[] => {
  const elements = Array(patternLength)
    .fill(0)
    .map((_v, i) => i);

  const seqDensity = Math.round(patternLength * (density / 100));
  const notesToGenerate = random(Math.round(seqDensity / 2), seqDensity);

  const selectedSteps = arrayRand(elements, notesToGenerate);

  const accents = arrayRand(
    selectedSteps,
    random(1, Math.round((notesToGenerate / 2) * (accentsDensity / 100))),
  );
  const slides = arrayRand(
    selectedSteps,
    random(0, Math.round((notesToGenerate / 2) * (slidesDensity / 100))),
  );
  const randNotes = arrayRand(selectedSteps, random(0, notesToGenerate));

  const notesSpread = random(0, Math.round((scale.length - 1) * (spread / 100)));
  const selectedNotes = arrayRand(scale, notesSpread);

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
