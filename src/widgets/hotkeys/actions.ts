export interface Action {
  fn: () => void;
  description: string;
}

export const defaultActions: Record<string, Action> = {
  greet: {
    fn: () => alert('Hello from greet'),
    description: 'Show a greeting alert',
  },
  farewell: {
    fn: () => alert('Goodbye from farewell'),
    description: 'Show a farewell alert',
  },
};

export let actions: Record<string, Action> = { ...defaultActions };

export const setActions = (newActions: Record<string, Action>) => {
  actions = newActions;
};

export const resetActions = () => {
  actions = { ...defaultActions };
};
