import { type ChangeEvent, type FC, useCallback } from 'react';
import { type SequenceStep } from '../audio-engine/generator';
import { SCALE } from '../audio-engine/scales';
import PianoRoll from './PianoRoll';

import styles from './Pattern.module.less';

const scaleNames = Object.values(SCALE);

const Pattern: FC<{
  pattern: SequenceStep[];
  currentStep: number;
  scaleName: SCALE;
  onScaleChange: (scale: SCALE) => void;
}> = ({ pattern, currentStep, scaleName, onScaleChange }) => {
  const handleScaleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const {
        currentTarget: { value },
      } = e;
      onScaleChange(value as SCALE);
    },
    [onScaleChange],
  );

  return (
    <section>
      <ul className={styles.pattern}>
        <li className={styles.step}>
          <ul>
            <li>
              <PianoRoll
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
                  <PianoRoll
                    note={note}
                    scaleName={scaleName}
                    accent={accent}
                    slide={slide}
                    highlightScale={false}
                  />
                </li>
                <li className={styles.cell}>{`${
                  octave === 1 ? 'UP' : octave === -1 ? 'DW' : ''
                }`}</li>
                <li className={`${styles.cell} ${slide ? styles.slide : ''}`}>{slide}</li>
                <li className={`${styles.cell} ${accent ? styles.accent : ''}`}></li>
              </ul>
            </li>
          );
        })}
      </ul>
      <footer>
        <select onChange={handleScaleChange} value={scaleName}>
          {scaleNames.map((scale) => {
            return (
              <option value={scale} key={`scale-${scale}`}>
                {scale}
              </option>
            );
          })}
        </select>
      </footer>
    </section>
  );
};

export default Pattern;
