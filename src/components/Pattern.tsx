import { type FC } from 'react';
import { type SequenceStep } from '../audio-engine/generator';
import PianoRoll from './PianoRoll';
import { type Scale } from '../audio-engine/scales';

import styles from './Pattern.module.less';

const Pattern: FC<{ pattern: SequenceStep[]; currentStep: number; scale: Scale }> = ({
  pattern,
  currentStep,
  scale,
}) => {
  return (
    <ul className={styles.pattern}>
      <li className={styles.step}>
        <ul>
          <li>
            <PianoRoll note={null} scale={scale} />
          </li>
          <li className={styles.cell}>O</li>
          <li className={styles.cell}>S</li>
          <li className={styles.cell}>A</li>
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
                <PianoRoll note={note} scale={scale} />
              </li>
              <li className={styles.cell}>{`${
                octave === 1 ? 'UP' : octave === -1 ? 'DW' : ''
              }`}</li>
              <li className={styles.cell}>{slide}</li>
              <li className={styles.cell}>{accent}</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default Pattern;
