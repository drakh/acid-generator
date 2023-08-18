import { type FC } from 'react';
import Knob from '../Knob';
import { CUTOFF, DEFAULTS, DELAY_SEND, RES } from '../../constants';

import styles from './SynthControls.module.less';

interface Props {
  resonance: number;
  cutoff: number;
  delay: number;
  onCutoffChange: (v: number) => void;
  onResonanceChange: (v: number) => void;
  onDelaySendChange: (v: number) => void;
}

const SynthControls: FC<Props> = ({
  cutoff,
  resonance,
  delay,
  onCutoffChange,
  onResonanceChange,
  onDelaySendChange,
}) => {
  return (
    <aside className={styles.synthControls}>
      <menu>
        <li>
          <Knob
            onChange={onCutoffChange}
            min={CUTOFF.MIN}
            max={CUTOFF.MAX}
            defaultValue={DEFAULTS.CUTOFF}
            value={cutoff}
            direction={'vertical'}
            step={1}
            label={'CUT'}
          />
        </li>
        <li>
          <Knob
            onChange={onResonanceChange}
            min={RES.MIN}
            max={RES.MAX}
            defaultValue={DEFAULTS.RESONANCE}
            value={resonance}
            direction={'vertical'}
            step={0.1}
            label={'RES'}
          />
        </li>
        <li>
          <Knob
            onChange={onDelaySendChange}
            min={DELAY_SEND.MIN}
            max={DELAY_SEND.MAX}
            defaultValue={DEFAULTS.DELAY_LEVEL}
            value={delay}
            direction={'vertical'}
            step={0.1}
            label={'DELAY SEND'}
          />
        </li>
      </menu>
    </aside>
  );
};

export { type Props };

export default SynthControls;
