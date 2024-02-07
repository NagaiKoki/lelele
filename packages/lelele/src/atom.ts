import { InferRestArgsFunction } from "./utility.ts";

export type State = Record<string, unknown>;

export type RawStateUpdateObj<State> = Record<
  string,
  (currentState: State, ...args: any) => State
>;

export type StateUpdateObj<State, U extends RawStateUpdateObj<State>> = {
  [R in keyof U]: (...args: InferRestArgsFunction<U[R]>) => State;
};

export type Atom<State, U extends RawStateUpdateObj<State>> = {
  key: string;
  initialState: State;
  stateUpdate: U;
};

export const atom = <S extends State, U extends RawStateUpdateObj<S>>({
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
