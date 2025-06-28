export interface Action {
  fn: () => void;
  description: string;
}
import { useCounterStore } from '@/entities/counter/model';

export const defaultActions: Record<string, Action> = {
  greet: {
    fn: () => alert('Hello from greet'),
    description: 'Show a greeting alert',
  },
  farewell: {
    fn: () => alert('Goodbye from farewell'),
    description: 'Show a farewell alert',
  },
  increment: {
    fn: () => {
      const counter = useCounterStore();
      counter.add(1);
    },
    description:"incrementa 1"
  },
  decrement: {
    fn: () => {
      const counter = useCounterStore();
      counter.add(-1);
    },
    description:"decrementa 1"
  }
};

export let actions: Record<string, Action> = { ...defaultActions };

export const setActions = (newActions: Record<string, Action>) => {
  actions = newActions;
};

export const resetActions = () => {
  actions = { ...defaultActions };
};
