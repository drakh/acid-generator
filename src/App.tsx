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
import Sequencer from './components/Sequencer';
import About from './components/About';
import {
  setAccentDensity,
  setDensity,
  setPatternLength,
  setSlidesDensity,
  setSpread,
} from './store/generator';
import {
  deletePattern,
  DIRECTION,
  loadPattern,
  setScale,
  shiftPattern,
  storePattern,
} from './store/sequencer';
import { type State } from './store/types';

import styles from './App.module.less';

import about from '../README.md?raw';
import StoredPatterns from './components/StoredPatterns.tsx';

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
        midi.outputs.forEach((_out) => {
          // console.info(parseInt(String(9), 16).toString(16));
          // console.info({ out });
        });
      } catch (e) {
        console.error(e);
      }
    };
    void getMidi();
  }, []);
  const {
    transport: { currentStep, tempo, playing },
    sequencer: { pattern, scale, name, storedPatterns },
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

  const handleShiftLeftClick = useCallback(() => {
    dispatch(shiftPattern(DIRECTION.LEFT));
  }, [dispatch]);

  const handleShiftRightClick = useCallback(() => {
    dispatch(shiftPattern(DIRECTION.RIGHT));
  }, [dispatch]);

  const handlePatternStoreClick = useCallback(() => {
    dispatch(storePattern({ pattern, name, scale }));
  }, [dispatch, pattern, name, scale]);

  const handleDownloadSequencerPatternb = useCallback(() => {
    downloadPattern({ pattern, name, scale });
  }, [name, scale, pattern]);

  const handleLoadPattern = useCallback(
    (i: number) => {
      dispatch(loadPattern(i));
    },
    [dispatch],
  );

  const handleDeletePattern = useCallback(
    (i: number) => {
      dispatch(deletePattern(i));
    },
    [dispatch],
  );

  const handleDownloadPattern = useCallback(
    (i: number) => {
      downloadPattern(storedPatterns[i]);
    },
    [storedPatterns],
  );

  return (
    <>
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
        <Sequencer
          onDownloadClick={handleDownloadSequencerPatternb}
          name={name}
          pattern={pattern}
          currentStep={currentStep}
          scaleName={scale}
          onScaleChange={handleScaleChange}
          resonance={resonance}
          cutoff={cutoff}
          delay={delaySend}
          onCutoffChange={changeCutoff}
          onResonanceChange={changeResonance}
          onDelaySendChange={changeDelaySend}
          onPlayClick={togglePlay}
          onTempoChange={handleTempoChange}
          tempo={tempo}
          playing={playing}
          onShiftLeftClick={handleShiftLeftClick}
          onShiftRightClick={handleShiftRightClick}
          onPatternStoreClick={handlePatternStoreClick}
        />
        <About content={about} />
      </main>
      <aside>
        <StoredPatterns
          patterns={storedPatterns}
          onDownloadClick={handleDownloadPattern}
          onDeleteClick={handleDeletePattern}
          onLoadClick={handleLoadPattern}
        />
      </aside>
    </>
  );
};

export default App;
