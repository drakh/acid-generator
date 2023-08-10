import { type FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTempo, toggleTransport } from './audio-engine/controls';
import GeneratorControls from './components/GeneratorControls';
import Pattern from './components/Pattern';
import PlayControls from './components/PlayControls';
import { setGenerate } from './store/generator';
import { type State } from './types';

import './App.module.less';

const App: FC = () => {
  const {
    transport: { currentStep, tempo, playing },
    sequencer: {
      pattern,
      options: { scale },
    },
    generator: { dispatchGenerate },
  } = useSelector((state: State) => {
    return state;
  });

  const dispatch = useDispatch();

  const handleGenerateClick = useCallback(() => {
    dispatch(setGenerate(true));
  }, []);

  const togglePlay = useCallback(() => {
    void toggleTransport();
  }, []);

  const handleTempoChange = useCallback((bpm: number) => changeTempo(bpm), []);

  return (
    <main>
      <PlayControls
        onPlayClick={togglePlay}
        tempo={tempo}
        onTempoChange={handleTempoChange}
        playing={playing}
      />
      <GeneratorControls
        onGenerateClick={handleGenerateClick}
        waiting={dispatchGenerate}
      />
      <section>
        <Pattern pattern={pattern} currentStep={currentStep} scaleName={scale} />
      </section>
    </main>
  );
};

export default App;
