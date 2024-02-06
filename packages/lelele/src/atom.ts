import { InferRestArgsFunction } from "./utility.ts";

export type State = Record<string, unknown>;

export type StateUpdate<State> = Record<
  string,
  (currentState: State, ...args: any) => State
>;

export type ExposeStateUpdate<State, U extends StateUpdate<State>> = {
  [R in keyof U]: (...args: InferRestArgsFunction<U[R]>) => State;
};

export type Atom<State, U extends StateUpdate<State>> = {
  key: string;
  initialState: State;
  stateUpdate: U;
};

export const atom = <
  S extends State,
  U extends Record<string, (currentState: S, ...args: any) => S> = Record<
    string,
    (currentState: S, ...args: any) => S
  >,
>({
  key,
  initialState,
  stateUpdate,
}: {
  key: string;
  initialState: S;
  stateUpdate: U;
}): Atom<S, U> => {
  return {
    key,
    initialState,
    stateUpdate,
  };
};
