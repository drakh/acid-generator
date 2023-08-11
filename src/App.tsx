import { type FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTempo, toggleTransport } from './audio-engine/controls';
import { type SCALE } from './audio-engine/scales';
import GeneratorControls from './components/GeneratorControls';
import Pattern from './components/Pattern';
import PlayControls from './components/PlayControls';
import { setGenerate } from './store/generator';
import { setScale } from './store/sequencer';
import { type State } from './types';

import './App.module.less';

const App: FC = () => {
  useEffect(() => {
    const getMidi = async () => {
      try {
        const midi = await window.navigator.requestMIDIAccess();
        // midi.addEventListener('onstatechange',()=>{
        //
        // })
        midi.outputs.forEach((out) => {
          console.info(parseInt(String(9), 16).toString(16));
          console.info({ out });
        });
      } catch (e) {
        console.error(e);
      }
    };
    void getMidi();
  }, []);
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
  }, [dispatch]);

  const handleScaleChange = useCallback(
    (newScale: SCALE) => {
      dispatch(setScale(newScale));
    },
    [dispatch],
  );

  const togglePlay = useCallback(() => {
    void toggleTransport();
  }, []);

  const handleTempoChange = useCallback((bpm: number) => changeTempo(bpm), []);

  return (
    <main>
      <GeneratorControls
        onGenerateClick={handleGenerateClick}
        waiting={dispatchGenerate}
      />
      <Pattern
        pattern={pattern}
        currentStep={currentStep}
        scaleName={scale}
        onScaleChange={handleScaleChange}
      />
      <PlayControls
        onPlayClick={togglePlay}
        tempo={tempo}
        onTempoChange={handleTempoChange}
        playing={playing}
      />
    </main>
  );
};

export default App;
