import { type FC } from 'react';
import { SlControlPause, SlControlPlay } from 'react-icons/sl';
import { BPM, DEFAULTS } from '../constants';
import Knob from './Knob';

import styles from './PlayControls.module.less';

const PlayControls: FC<{
  onPlayClick: () => void;
  onTempoChange: (v: number) => void;
  tempo: number;
  playing: boolean;
}> = ({ onPlayClick, onTempoChange, tempo, playing }) => {
  return (
    <nav className={styles.playControls}>
      <button onClick={onPlayClick}>
        {playing ? <SlControlPause /> : <SlControlPlay />}
      </button>
      <Knob
        onChange={onTempoChange}
        min={BPM.MIN}
        max={BPM.MAX}
        defaultValue={DEFAULTS.BPM}
        value={tempo}
        direction={'vertical'}
        step={1}
        label={'TEMPO'}
      />
    </nav>
  );
};
export default PlayControls;
