import { start, Transport } from 'tone';
import { tb303 } from './synth.ts';
import { store, setStep } from '../store.ts';
import { generate } from './generator.ts';

Transport.set({ bpm: 130 });

let sequence = generate(16);

const toggleTransport = async () => {
  try {
    await start();
  } catch (e) {
    console.error(e);
  } finally {
    if (Transport.state === 'started') {
      store.dispatch(setStep(0));
    } else {
      sequence = generate(16);
    }
    Transport.toggle();
  }
};

Transport.scheduleRepeat(() => {
  const {
    steps: { currentStep, maxSteps },
  } = store.getState();
  const { note, velocity, len } = sequence[currentStep];
  if (note !== null && len !== null && velocity !== null) {
    tb303.triggerAttackRelease(note, len, undefined, velocity);
  }
  store.dispatch(setStep(currentStep >= maxSteps - 1 ? 0 : currentStep + 1));
}, '16n');

export { toggleTransport };
