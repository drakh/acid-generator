import { type ChangeEvent, type FC, useCallback } from 'react';
import { type SequencerOutput } from '../../types';

import styles from './ChannelSelector.module.less';

type Props = {
  onChannelChange: (channel: number, portId: string) => void;
};

const arr = Array<number>(16).fill(1);

const ChannelSelector: FC<Props & { output: SequencerOutput }> = ({
  onChannelChange,
  output: {
    channel,
    port: { id },
  },
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const {
        currentTarget: { value },
      } = e;
      onChannelChange(Number(value), id);
    },
    [onChannelChange, id],
  );

  return (
    <label className={styles.channelSelector}>
      MIDI CHANNEL:
      <select onChange={handleChange} value={channel}>
        {arr.map((_el, i) => {
          return (
            <option value={i} key={`midi-channel-${i}`}>
              {i + 1}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export type { Props };

export default ChannelSelector;
