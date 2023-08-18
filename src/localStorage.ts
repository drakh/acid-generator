import { type State } from './store/types';

const dataKey = 'state';

const save = (data: State) => {
  localStorage.setItem(dataKey, JSON.stringify(data));
};

const load = (): Partial<State> => {
  const data = localStorage.getItem(dataKey);
  try {
    return JSON.parse(data || '{}') as Partial<State>;
  } catch (e) {
    return {};
  }
};

const storage = load();

export { storage, save };
