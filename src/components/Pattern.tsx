import { type ChangeEvent, type FC, useCallback } from 'react';
import { IoCloudDownloadOutline as DownloadIcon } from 'react-icons/io5';
import { type SequenceStep } from '../audio-engine/generator';
import { SCALE } from '../audio-engine/scales';
import PianoRoll from './PianoRoll';

import styles from './Pattern.module.less';

const scaleNames = Object.values(SCALE);

const Pattern: FC<{
  name: string;
  pattern: SequenceStep[];
  currentStep: number;
  scaleName: SCALE;
  onScaleChange: (scale: SCALE) => void;
  onDownloadClick: () => void;
}> = ({ name, pattern, currentStep, scaleName, onScaleChange, onDownloadClick }) => {
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
    <section className={styles.sequencer}>
      <header>
        <input type="text" value={name} readOnly />
        <aside>
          <menu>
            <li>
              <button title="save as midi" onClick={onDownloadClick}>
                <DownloadIcon />
              </button>
            </li>
          </menu>
        </aside>
      </header>
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
        <label>
          SCALE:
          <select onChange={handleScaleChange} value={scaleName}>
            {scaleNames.map((scale) => {
              return (
                <option value={scale} key={`scale-${scale}`}>
                  {scale}
                </option>
              );
            })}
          </select>
        </label>
      </footer>
    </section>
  );
};

export default Pattern;
