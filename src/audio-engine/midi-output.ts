import {
  addMidiOutput,
  removeMidiOutput,
  selectOutput,
  setMidiInterface,
} from '../store/sequencer.ts';
import { store } from '../store.ts';
import { getOutput } from '../utils.ts';
import { internalSynth } from '../constants.ts';

const { dispatch } = store;

export const getMidiAccess = async () => {
  try {
    const midi = await window.navigator.requestMIDIAccess();
    dispatch(setMidiInterface(midi));
    midi?.outputs.forEach((port) => {
      dispatch(addMidiOutput({ port, selected: false, channel: 0 }));
    });
  } catch (e) {
    console.error(e);
  }
};

export const midiStateChangeEventListener = (e: Event) => {
  const {
    port,
    port: { type, state },
  } = e as MIDIConnectionEvent;

  if (type !== 'output') {
    return;
  }

  const eventPort = port as MIDIOutput;

  const {
    sequencer: {
      options: {
        output: { outputs },
      },
    },
  } = store.getState();

  switch (state) {
    case 'connected':
      dispatch(addMidiOutput({ port: eventPort, selected: false, channel: 0 }));
      return;
    case 'disconnected':
      {
        const selectedOutput = getOutput(outputs);
        if (selectedOutput?.port.id === eventPort.id) {
          dispatch(selectOutput(internalSynth));
        }
        dispatch(removeMidiOutput({ port: eventPort, selected: false, channel: 0 }));
      }
      break;
    default:
      return;
  }
};
