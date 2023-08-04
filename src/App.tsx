import { type FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { type State } from './store';
import { changeTempo, toggleTransport } from './audio-engine/controls';
import Pattern from './components/Pattern';
import PlayControls from './components/PlayControls';
import GeneratorControls from './components/GeneratorControls';

import './App.css';

const App: FC = () => {
  const {
    transport: { currentStep, tempo, playing },
    sequencer: {
      pattern,
      options: { scale },
    },
  } = useSelector((state: State) => {
    return state;
  });

  const togglePlay = useCallback(() => {
    void toggleTransport();
  }, []);

  const handleTempoChange = useCallback((bpm: number) => changeTempo(bpm), []);

  return (
    <main>
      <header>ACIED</header>
      <PlayControls
        onPlayClick={togglePlay}
        tempo={tempo}
        onTempoChange={handleTempoChange}
        playing={playing}
      />
      <GeneratorControls />
      <section>
        <Pattern pattern={pattern} currentStep={currentStep} scale={scale} />
      </section>
    </main>
  );
};

export default App;
