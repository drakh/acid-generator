import { type FC } from 'react';
import { type SequenceStep } from '../../audio-engine/generator';
import { SCALES, type SCALE } from '../../audio-engine/scales';
import PatternStep from './PatternStep';

import styles from './PianoRoll.module.less';
import { setPattern } from '../../store/sequencer';
import { store } from '../../store';
import { getNoteInScale } from '../../utils';
const { dispatch } = store;

interface Props {
  pattern: SequenceStep[];
  currentStep: number;
  scaleName: SCALE;
}

const PianoRoll: FC<Props> = ({ pattern, currentStep, scaleName }) => {
  return (
    <ul className={styles.pattern}>
      <li className={styles.step}>
        <ul>
          <li>
            <PatternStep
              note={null}
              scaleName={scaleName}
              slide={false}
              accent={false}
              highlightScale={true}
            />
          </li>
          <li className={styles.cell}>O</li>
          <li className={styles.cell}>S</li>
          <li className={styles.cell}>A</li>
          <li className={styles.cell}>N</li>
        </ul>
      </li>
      {pattern.map(({ note, octave, accent, slide }, i) => {
        return (
          <li
            className={`${styles.step} ${i === currentStep ? styles.active : ''}`}
            key={`pattern-step-${i}`}
          >
            <ul>
              <li>
                <PatternStep
                  note={note}
                  scaleName={scaleName}
                  accent={accent}
                  slide={slide}
                  highlightScale={false}
                  setNote={(newNote) => {
                    const notePositionInScale = SCALES[scaleName].findIndex(
                      (v) => v === newNote,
                    );
                    const noteInScale = getNoteInScale(notePositionInScale, scaleName);
                    if (noteInScale === newNote) {
                      const modifiedPattern: SequenceStep[] = [];
                      for (let step = 0; step < pattern.length; step++) {
                        if (step === i) {
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
                  }}
                />
              </li>
              <li
                className={`${styles.cell} ${
                  octave === 1 ? styles.octaveUp : octave === -1 ? styles.octaveDown : ''
                }`}
              />
              <li className={`${styles.cell} ${slide ? styles.slide : ''}`} />
              <li className={`${styles.cell} ${accent ? styles.accent : ''}`} />
              <li className={styles.cell}>{i + 1}</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export { type Props };

export default PianoRoll;
