import { type FC } from 'react';
import Knob from './Knob';
import { CUTOFF, DEFAULTS, DELAY_SEND, RES } from '../constants';

const SynthControls: FC<{
  resonance: number;
  cutoff: number;
  delay: number;
  onCutoffChange: (v: number) => void;
  onResonanceChange: (v: number) => void;
  onDelaySendChange: (v: number) => void;
}> = ({
  cutoff,
  resonance,
  delay,
  onCutoffChange,
  onResonanceChange,
  onDelaySendChange,
}) => {
  return (
    <aside>
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
    </aside>
  );
};

export default SynthControls;
