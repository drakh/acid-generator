import { type FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCutoff,
  changeDelaySend,
  changeResonance,
  changeTempo,
  downloadPattern,
  generatePattern,
  stopInternalSynth,
  toggleTransport,
} from './audio-engine/controls';
import { type SCALE } from './audio-engine/scales';
import GeneratorControls from './components/GeneratorControls';
import Sequencer from './components/Sequencer';
import About from './components/About';
import StoredPatterns from './components/StoredPatterns';
import {
  setAccentDensity,
  setDensity,
  setPatternLength,
  setSlidesDensity,
  setSpread,
} from './store/generator';
import {
  addMidiOutput,
  deletePattern,
  loadPattern,
  selectOutput,
  setMidiChannel,
  setMidiInterface,
  setScale,
  shiftPattern,
  storePattern,
} from './store/sequencer';
import { type State } from './store';
import { DIRECTION } from './types';

import styles from './App.module.less';

// eslint-disable-next-line import/no-unresolved
import about from '../README.md?raw';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMidi = async () => {
      try {
        const midi = await window.navigator.requestMIDIAccess();
        dispatch(setMidiInterface(midi));
        midi.outputs.forEach((port) => {
          dispatch(addMidiOutput({ port, selected: false, channel: 0 }));
        });
      } catch (e) {
        console.error(e);
      }
    };
    void getMidi();
  }, [dispatch]);

  const {
    transport: { currentStep, tempo, playing },
    sequencer: {
      pattern,
      scale,
      name,
      storedPatterns,
      options: {
        output: { outputs },
      },
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

  const handleOutputChange = useCallback(
    (id: string | undefined) => {
      stopInternalSynth();
      dispatch(selectOutput(id));
    },
    [dispatch],
  );

  const handleChannelChange = useCallback(
    (channel: number, id: string) => {
      dispatch(setMidiChannel({ channel, id }));
    },
    [dispatch],
  );

  return (
    <>
      <main className={`mainPart ${styles.main}`}>
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
          outputs={outputs}
          onOutputChange={handleOutputChange}
          onChannelChange={handleChannelChange}
        />
        <About content={about} />
      </main>
      <aside className="storedPatterns">
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
