import { type FC } from 'react';
import Footer, { type Props as FooterProps } from './sequencer/Footer';
import Header, { type Props as HeaderProps } from './sequencer/Header';
import PianoRoll, { type Props as PianoRollProps } from './sequencer/PianoRoll';
import Controls, { type Props as ControlsProps } from './sequencer/Controls';
import { type SequencerOutput } from '../types';
import { internalSynth } from '../constants';

import styles from './Sequencer.module.less';

type Props = FooterProps &
  HeaderProps &
  PianoRollProps &
  ControlsProps & { outputs: SequencerOutput[] };

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
}) => {
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
        <ul>
          {outputs.map(({ output }, i) => {
            return (
              <li key={`seq-out-${i}`}>
                {output === internalSynth ? internalSynth : output.name}
              </li>
            );
          })}
        </ul>
        <Footer scaleName={scaleName} onScaleChange={onScaleChange} />
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
      </footer>
    </section>
  );
};

export default Sequencer;
