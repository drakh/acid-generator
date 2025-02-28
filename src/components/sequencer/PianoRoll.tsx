import { type FC } from 'react';
import { type SequenceStep } from '../../audio-engine/generator';
import { type SCALE } from '../../audio-engine/scales';
import PatternStep from './PatternStep';

import styles from './PianoRoll.module.less';
import { editNoteInPattern, switchToNextStep } from '../../audio-engine/editors';

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
                    editNoteInPattern(newNote, scaleName, pattern, i);
                  }}
                />
              </li>
              <li
                onClick={() => switchToNextStep('octave', pattern, i)}
                className={`${styles.cell} ${
                  octave === 1 ? styles.octaveUp : octave === -1 ? styles.octaveDown : ''
                } ${styles.canEdit}`}
              />
              <li
                onClick={() => switchToNextStep('slide', pattern, i)}
                className={`${styles.cell} ${slide ? styles.slide : ''} ${
                  styles.canEdit
                }`}
              />
              <li
                onClick={() => switchToNextStep('accent', pattern, i)}
                className={`${styles.cell} ${accent ? styles.accent : ''} ${
                  styles.canEdit
                }`}
              />
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
