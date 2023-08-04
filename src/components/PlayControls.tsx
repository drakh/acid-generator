import { type FC, useCallback } from 'react';
import { SlControlPlay, SlControlPause } from 'react-icons/sl';
import { Knob, type KnobProps } from 'primereact/knob';
import { BPM } from '../constants.ts';

const PlayControls: FC<{
  onPlayClick: () => void;
  onTempoChange: (v: number) => void;
  tempo: number;
  playing: boolean;
}> = ({ onPlayClick, onTempoChange, tempo, playing }) => {
  const handleTempoChange = useCallback(
    ({ value }: KnobProps) => onTempoChange(value ? value : BPM.MIN),
    [onTempoChange],
  );
  return (
    <nav>
      <label>
        <Knob
          onChange={handleTempoChange}
          value={tempo}
          min={BPM.MIN}
          max={BPM.MAX}
          step={1}
          showValue={true}
        />
        TEMPO
      </label>
      <button onClick={onPlayClick}>
        {playing ? <SlControlPause /> : <SlControlPlay />}
      </button>
    </nav>
  );
};
export default PlayControls;
