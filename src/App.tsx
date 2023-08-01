import { FC } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { type State } from './store.ts';

interface Props {
  currentStep: number;
  onStartClick: () => void;
}

const App: FC<Props> = ({ currentStep, onStartClick }) => {
  return (
    <main>
      <header>ACIED</header>
      <div className="card">
        <button onClick={onStartClick}>{currentStep}</button>
      </div>
    </main>
  );
};

const ConnectedApp: FC<Pick<Props, 'onStartClick'>> = ({ onStartClick }) => {
  const {
    steps: { currentStep },
  } = useSelector((state: State) => {
    return state;
  });

  return <App currentStep={currentStep} onStartClick={onStartClick} />;
};

export default ConnectedApp;
