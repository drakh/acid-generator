import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { start, /*MonoSynth,*/ Transport } from 'tone';
import './App.css';

const App: FC<never> = () => {
  // const synth = useRef(new MonoSynth().toDestination());
  const transport = useRef(Transport);
  const started = useRef(false);

  const [currentStep, setStep] = useState(0);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      transport.current.set({ bpm: 90 });
      let step = 0;
      transport.current.scheduleRepeat(() => {
        step = step + 1;
        setStep(step);
        return transport.current.position;
      }, '16n');
    }
  }, [transport, started, setStep]);

  const toggleTransport = useCallback(async () => {
    try {
      await start();
    } catch (e) {
      console.error(e);
    } finally {
      transport.current.toggle();
    }
  }, [transport]);

  return (
    <main>
      <header>Vite + React</header>
      <div className="card">
        <button onClick={toggleTransport}>{currentStep}</button>
      </div>
    </main>
  );
};

export default App;
