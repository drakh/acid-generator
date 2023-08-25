import { type ChangeEvent, type FC, useCallback, useMemo } from 'react';
import { type SequencerOutput } from '../../types';
import { internalSynth } from '../../constants';
import { getOutput } from '../../utils';

import styles from './OutputSelector.module.less';

interface Props {
  outputs: SequencerOutput[];
  onOutputChange: (id: string | undefined) => void;
}

const OutputSelector: FC<Props> = ({ outputs, onOutputChange }) => {
  const selected = useMemo(() => getOutput(outputs), [outputs]);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const {
        currentTarget: { value },
      } = e;
      onOutputChange(value);
    },
    [onOutputChange],
  );
  return (
    <label className={styles.outputSelector}>
      OUTPUT:
      <select onChange={handleChange} value={selected ? selected.port.id : undefined}>
        <option value={undefined} key={`output-${internalSynth}`}>
          INTERNAL
        </option>
        {outputs.map(({ port: { name, id } }) => {
          return (
            <option value={id} key={`output-${id}`}>
              {name}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export { type Props };

export default OutputSelector;
