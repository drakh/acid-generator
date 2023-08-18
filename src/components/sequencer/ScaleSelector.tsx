import { type ChangeEvent, type FC, useCallback } from 'react';
import { SCALE } from '../../audio-engine/scales';

import styles from './ScaleSelector.module.less';

const scaleNames = Object.values(SCALE);

interface Props {
  scaleName: SCALE;
  onScaleChange: (scale: SCALE) => void;
}

const ScaleSelector: FC<Props> = ({ onScaleChange, scaleName }) => {
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
    <label className={styles.scaleSelector}>
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
  );
};

export { type Props };

export default ScaleSelector;
