import { getNoteInScale } from '../utils';
import { type SequenceStep } from './generator';
import { type SCALE, SCALES } from './scales';
import { store } from '../store';
import { setPattern } from '../store/sequencer';
const { dispatch } = store;

const noteMatchScale = (note: number, scaleName: SCALE): boolean => {
  const notePositionInScale = SCALES[scaleName].findIndex((v) => v === note);
  const noteInScale = getNoteInScale(notePositionInScale, scaleName);
  return noteInScale === note;
};

const getNotePositionInScale = (note: number, scaleName: SCALE): number => {
  return SCALES[scaleName].findIndex((v) => v === note);
};

const editNoteInPattern = (
  newNote: number,
  scaleName: SCALE,
  pattern: SequenceStep[],
  currentStep: number,
) => {
  if (noteMatchScale(newNote, scaleName)) {
    const notePositionInScale = getNotePositionInScale(newNote, scaleName);
    const modifiedPattern: SequenceStep[] = [];
    for (let step = 0; step < pattern.length; step++) {
      if (step === currentStep) {
        const deleting = notePositionInScale === pattern[step].note;
        const newSequenceStep: SequenceStep = {
          note: deleting ? null : notePositionInScale,
          octave: pattern[step].octave ?? 0,
          accent: pattern[step].accent ?? false,
          slide: pattern[step].slide ?? false,
        };
        modifiedPattern.push(newSequenceStep);
      } else {
        modifiedPattern.push(pattern[step]);
      }
    }
    dispatch(setPattern(modifiedPattern));
  }
};

const getNextStep = (
  action: 'octave' | 'accent' | 'slide',
  patternStep: SequenceStep,
) => {
  switch (action) {
    case 'octave': {
      const steps = [-1, 0, 1];
      const currentIndex = steps.indexOf(patternStep[action] as number);
      return steps[(currentIndex + 1) % steps.length];
    }
    case 'accent':
    case 'slide':
      return !patternStep[action];
  }
};

const switchToNextStep = (
  action: 'octave' | 'accent' | 'slide',
  pattern: SequenceStep[],
  currentStep: number,
) => {
  const modifiedPattern: SequenceStep[] = [];
  for (let step = 0; step < pattern.length; step++) {
    if (step === currentStep) {
      const actionNextStep = getNextStep(action, pattern[step]);
      const newSequenceStep: SequenceStep = {
        ...pattern[step],
        [action]: actionNextStep,
      };
      modifiedPattern.push(newSequenceStep);
    } else {
      modifiedPattern.push(pattern[step]);
    }
  }
  dispatch(setPattern(modifiedPattern));
};

export { noteMatchScale, getNotePositionInScale, editNoteInPattern, switchToNextStep };
