import { type FC } from 'react';
import { PauseIcon, PlayIcon } from '../Icons';
import { BPM, DEFAULTS } from '../../constants';
import Knob from '../Knob';
import Button from '../Button';

import styles from './PlayControls.module.less';

interface Props {
  onPlayClick: () => void;
  onTempoChange: (v: number) => void;
  tempo: number;
  playing: boolean;
}

const PlayControls: FC<Props> = ({ onPlayClick, onTempoChange, tempo, playing }) => {
  return (
    <nav className={styles.playControls}>
      <Button onClick={onPlayClick} bindKey="Space">
        {playing ? <PauseIcon /> : <PlayIcon />}
      </Button>
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

export { type Props };

export default PlayControls;
