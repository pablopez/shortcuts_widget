import { reactive } from 'vue';

export const defaultKeymap: Record<string, string> = {
  greet: 'ctrl+g',
  farewell: 'ctrl+f',
  increment: 'ctrl+x',
  decrement: 'ctrl+z',
};

export const keymap = reactive({ ...defaultKeymap });

export const setKeymap = (newKeymap: Record<string, string>) => {
  Object.keys(keymap).forEach((k) => delete (keymap as Record<string, string>)[k]);
  Object.entries(newKeymap).forEach(([k, v]) => {
    (keymap as Record<string, string>)[k] = v;
  });
};

export const resetKeymap = () => {
  setKeymap(defaultKeymap);
};
