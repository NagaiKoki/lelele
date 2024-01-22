export type State = Record<string, unknown>;

export type StateUpdateFunctionMap<S> = Record<string, (...args: any) => S>;

export type StateUpdateFunction<S> =
  StateUpdateFunctionMap<S>[keyof StateUpdateFunctionMap<S>];

export type StateUpdate<S> = (state: S) => StateUpdateFunctionMap<S>;

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
