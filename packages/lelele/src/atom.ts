export type Atom<State> = {
  key: string;
  state: State;
};

type State = string | number | object;
