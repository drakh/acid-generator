import { type FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCutoff,
  changeDelaySend,
  changeResonance,
  changeTempo,
  downloadPattern,
  generatePattern,
  toggleTransport,
} from './audio-engine/controls';
import { type SCALE } from './audio-engine/scales';
import GeneratorControls from './components/GeneratorControls';
import Pattern from './components/Pattern';
import PlayControls from './components/PlayControls';
import SynthControls from './components/SynthControls';
import About from './components/About';
import {
  setAccentDensity,
  setDensity,
  setPatternLength,
  setSlidesDensity,
  setSpread,
} from './store/generator';
import { setScale } from './store/sequencer';
import { type State } from './types';

import styles from './App.module.less';

import about from '../README.md?raw';

const App: FC = () => {
  useEffect(() => {
    const getMidi = async () => {
      try {
        const midi = await window.navigator.requestMIDIAccess();
        // midi.addEventListener('onstatechange',()=>{
        //
        // })
        // midi.addEventListener('statechange', (ev) => {
        //   console.info({ ev });
        // });
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
      name,
    },
    generator: {
      dispatchGenerate,
      density,
      spread,
      accentsDensity,
      patternLength,
      slidesDensity,
    },
    synth: { cutoff, resonance, delaySend },
  } = useSelector((state: State) => {
    return state;
  });

  const dispatch = useDispatch();

  const handleGenerateClick = useCallback(() => {
    generatePattern();
  }, []);

  const handleScaleChange = useCallback(
    (newScale: SCALE) => {
      dispatch(setScale(newScale));
    },
    [dispatch],
  );

  const handlePatternLengthChange = useCallback(
    (v: number) => {
      dispatch(setPatternLength(v));
    },
    [dispatch],
  );
  const handleSpreadChange = useCallback(
    (v: number) => {
      dispatch(setSpread(v));
    },
    [dispatch],
  );
  const handleDensityChange = useCallback(
    (v: number) => {
      dispatch(setDensity(v));
    },
    [dispatch],
  );
  const handleAccentsDensityChange = useCallback(
    (v: number) => {
      dispatch(setAccentDensity(v));
    },
    [dispatch],
  );
  const handleSlidesDensityChange = useCallback(
    (v: number) => {
      dispatch(setSlidesDensity(v));
    },
    [dispatch],
  );

  const togglePlay = useCallback(() => {
    void toggleTransport();
  }, []);

  const handleTempoChange = useCallback((bpm: number) => changeTempo(bpm), []);

  useEffect(() => {
    const bindKey = ({ code }: KeyboardEvent) => {
      if (code === 'Space') {
        togglePlay();
      }
      if (code === 'KeyG') {
        handleGenerateClick();
      }
    };
    window.addEventListener('keypress', bindKey);
    return () => {
      window.removeEventListener('keypress', bindKey);
    };
  }, [dispatch, handleGenerateClick, togglePlay]);

  return (
    <main className={styles.main}>
      <GeneratorControls
        onGenerateClick={handleGenerateClick}
        waiting={dispatchGenerate}
        patternLength={patternLength}
        density={density}
        spread={spread}
        accentsDensity={accentsDensity}
        slidesDensity={slidesDensity}
        onPatternLengthChange={handlePatternLengthChange}
        onSpreadChange={handleSpreadChange}
        onDensityChange={handleDensityChange}
        onAccentsChange={handleAccentsDensityChange}
        onSlidesChange={handleSlidesDensityChange}
      />
      <Pattern
        onDownloadClick={downloadPattern}
        name={name}
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
      <SynthControls
        resonance={resonance}
        cutoff={cutoff}
        delay={delaySend}
        onCutoffChange={changeCutoff}
        onResonanceChange={changeResonance}
        onDelaySendChange={changeDelaySend}
      />
      <About content={about} />
    </main>
  );
};

export default App;
