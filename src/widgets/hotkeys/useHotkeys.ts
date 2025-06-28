import { ref } from 'vue';
import hotkeys from 'hotkeys-js';
import { actions, setActions, Action } from './actions';
import { keymap } from './keymap';

const enabled = ref(false);

const bindShortcuts = () => {
  Object.entries(keymap).forEach(([name, combo]) => {
    const action = actions[name];
    if (action) {
      hotkeys(combo, (event) => {
        event.preventDefault();
        action.fn();
      });
    }
  });
};

const unbindShortcuts = () => {
  Object.values(keymap).forEach((combo) => {
    hotkeys.unbind(combo);
  });
};

export const enableHotkeys = () => {
  if (!enabled.value) {
    bindShortcuts();
    enabled.value = true;
  }
};

export const disableHotkeys = () => {
  if (enabled.value) {
    unbindShortcuts();
    enabled.value = false;
  }
};

export const toggleHotkeys = () => {
  if (enabled.value) {
    disableHotkeys();
  } else {
    enableHotkeys();
  }
};

export const updateActions = (newActions: Record<string, Action>) => {
  setActions(newActions);
  if (enabled.value) {
    unbindShortcuts();
    bindShortcuts();
  }
};

export const useHotkeys = () => {
  return {
    enabled,
    enableHotkeys,
    disableHotkeys,
    toggleHotkeys,
    updateActions,
  };
};
