import { InferRestArgsFunction } from "./utility.ts";

export type State = Record<string, unknown>;

export type StateUpdate<S extends State> = Record<
  string,
  (currentState: S, ...args: any) => S
>;

export type ExposeStateUpdate<S extends State, U extends StateUpdate<S>> = {
  [R in keyof U]: (...args: InferRestArgsFunction<U[R]>) => S;
};

export const atom = <
  S extends Record<string, unknown>,
  U extends StateUpdate<S>,
>({
  key,
  initialState,
  stateUpdate,
}: {
  key: string;
  initialState: S;
  stateUpdate: U;
}) => ({
  key,
  initialState,
  stateUpdate,
});

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export type Atom<S extends State, U extends StateUpdate<S>> = {
  key: string;
  initialState: S;
  stateUpdate: U;
};
