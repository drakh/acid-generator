import { type ChangeEvent, type FC, useCallback } from 'react';
import { type SequencerOutput } from '../../types';
import { internalSynth } from '../../constants';

import styles from './OutputSelector.module.less';

interface Props {
  outputs: SequencerOutput[];
  onOutputChange: (idx: number) => void;
}

const OutputSelector: FC<Props> = ({ outputs, onOutputChange }) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const {
        currentTarget: { value },
      } = e;
      console.info({ value, onOutputChange });
    },
    [onOutputChange],
  );
  return (
    <label className={styles.outputSelector}>
      OUTPUT:
      <select onChange={handleChange}>
        {outputs.map(({ output }, i) => {
          return (
            <option value={i} key={`output-${i}`}>
              {output === internalSynth ? internalSynth : output.name}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export { type Props };

export default OutputSelector;
