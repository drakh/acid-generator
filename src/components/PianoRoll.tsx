import { type FC } from 'react';
import { SCALE, SCALES } from '../audio-engine/scales';

import styles from './PianoRoll.module.less';

const OCTAVE = 12;
const NOTES = Array(OCTAVE).fill(1);
const WHITE_KEYS = SCALES[SCALE.MAJOR];

const PianoRoll: FC<{
  note: number | null;
  scaleName: SCALE;
  accent: boolean | null;
  slide: boolean | null;
  highlightScale: boolean;
}> = ({ note, scaleName, highlightScale, accent, slide }) => {
  const scale = SCALES[scaleName];
  return (
    <ul className={styles.pianoRoll}>
      {NOTES.map((_v, i) => {
        const r = i % OCTAVE;
        return (
          <li
            className={`${styles.key} ${
              highlightScale && scale.includes(r) ? styles.inkey : ''
            } ${highlightScale && WHITE_KEYS.includes(r) ? styles.white : styles.black} ${
              note === i ? styles.active : ''
            } ${accent ? styles.accent : ''} ${slide ? styles.slide : ''}`}
            key={`piano-roll-${i}`}
          />
        );
      })}
    </ul>
  );
};

export default PianoRoll;
