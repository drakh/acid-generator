import { type FC } from 'react';
import PlayControls, { type Props as PlayControlProps } from './PlayControls';
import SynthControls, { type Props as SynthControlProps } from './SynthControls';

import styles from './Controls.module.less';

type Props = SynthControlProps & PlayControlProps;

const Controls: FC<Props> = ({
  resonance,
  cutoff,
  delay,
  tempo,
  onPlayClick,
  onTempoChange,
  playing,
  onCutoffChange,
  onResonanceChange,
  onDelaySendChange,
}) => {
  return (
    <section className={styles.controls}>
      <PlayControls
        onPlayClick={onPlayClick}
        tempo={tempo}
        onTempoChange={onTempoChange}
        playing={playing}
      />
      <SynthControls
        resonance={resonance}
        cutoff={cutoff}
        delay={delay}
        onCutoffChange={onCutoffChange}
        onResonanceChange={onResonanceChange}
        onDelaySendChange={onDelaySendChange}
      />
    </section>
  );
};

export { type Props };

export default Controls;
