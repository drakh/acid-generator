import { type FC } from 'react';
import Footer, { type Props as FooterProps } from './sequencer/Footer';
import Header, { type Props as HeaderProps } from './sequencer/Header';
import PianoRoll, { type Props as PianoRollProps } from './sequencer/PianoRoll';
import Controls, { type Props as ControlsProps } from './sequencer/Controls';
import { internalSynth } from '../constants';

import styles from './Sequencer.module.less';

type Props = FooterProps & HeaderProps & PianoRollProps & ControlsProps;

const Sequencer: FC<Props> = ({
  scaleName,
  onScaleChange,
  name,
  onDownloadClick,
  pattern,
  currentStep,
  resonance,
  cutoff,
  delay,
  onCutoffChange,
  onResonanceChange,
  onDelaySendChange,
  onPlayClick,
  onTempoChange,
  tempo,
  playing,
  onShiftRightClick,
  onShiftLeftClick,
  onPatternStoreClick,
  outputs,
  onOutputChange,
}) => {
  const selectedOutput = outputs.find(({ selected }) => selected);
  return (
    <section className={styles.sequencer}>
      <header>
        <Header
          name={name}
          onDownloadClick={onDownloadClick}
          onShiftRightClick={onShiftRightClick}
          onShiftLeftClick={onShiftLeftClick}
          onPatternStoreClick={onPatternStoreClick}
        />
      </header>
      <main>
        <div>
          <PianoRoll pattern={pattern} currentStep={currentStep} scaleName={scaleName} />
        </div>
      </main>
      <footer>
        <Footer
          scaleName={scaleName}
          onScaleChange={onScaleChange}
          outputs={outputs}
          onOutputChange={onOutputChange}
        />
        {selectedOutput?.output === internalSynth ? (
          <Controls
            resonance={resonance}
            cutoff={cutoff}
            delay={delay}
            onCutoffChange={onCutoffChange}
            onResonanceChange={onResonanceChange}
            onDelaySendChange={onDelaySendChange}
            onPlayClick={onPlayClick}
            onTempoChange={onTempoChange}
            tempo={tempo}
            playing={playing}
          />
        ) : null}
      </footer>
    </section>
  );
};

export default Sequencer;
