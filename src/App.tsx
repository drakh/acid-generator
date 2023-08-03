import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toggleTransport } from './audio-engine/controls';
import { type State } from './store';
import Pattern from './components/Pattern.tsx';

import './App.css';

const App: FC = () => {
  const {
    sequencer: { currentStep },
    pattern,
  } = useSelector((state: State) => {
    return state;
  });
  const onStartClick = useCallback(() => {
    void toggleTransport();
  }, []);

  return (
    <main>
      <header>ACIED</header>
      <section>
        <button onClick={onStartClick}>{currentStep}</button>
      </section>
      <section>
        <Pattern pattern={pattern} currentStep={currentStep} />
      </section>
    </main>
  );
};

export default App;
