import { type FC } from 'react';
import PlayControls, { type Props as PlayControlProps } from './PlayControls';
import SynthControls, { type Props as SynthControlProps } from './SynthControls';
import ChannelSelector, { type Props as ChannelSelectProps } from './ChannelSelector';
import { type SequencerOutput } from '../../types';

import styles from './Controls.module.less';

type Props = SynthControlProps & PlayControlProps & ChannelSelectProps;

const Controls: FC<Props & { output: SequencerOutput | undefined }> = ({
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
  output,
  onChannelChange,
}) => {
  return (
    <section className={styles.controls}>
      <PlayControls
        onPlayClick={onPlayClick}
        tempo={tempo}
        onTempoChange={onTempoChange}
        playing={playing}
      />
      <aside>
        {!output ? (
          <SynthControls
            resonance={resonance}
            cutoff={cutoff}
            delay={delay}
            onCutoffChange={onCutoffChange}
            onResonanceChange={onResonanceChange}
            onDelaySendChange={onDelaySendChange}
          />
        ) : (
          <ChannelSelector onChannelChange={onChannelChange} output={output} />
        )}
      </aside>
    </section>
  );
};

export { type Props };

export default Controls;
