export interface Action {
  fn: () => void;
  description: string;
}

export const actions: Record<string, Action> = {
  greet: {
    fn: () => alert('Hello from greet'),
    description: 'Show a greeting alert',
  },
  farewell: {
    fn: () => alert('Goodbye from farewell'),
    description: 'Show a farewell alert',
  },
};
