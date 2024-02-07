import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { Atom, RawStateUpdateObj, State, StateUpdateObj } from "./atom.ts";
import { InferRestArgsFunction } from "./utility.ts";

const stateMap = new Map<string, State>();
const updateFnMap = new Map<
  string,
  StateUpdateObj<State, RawStateUpdateObj<State>>
>();
const subscribeMap = new Map<string, Array<() => void>>();

export const useLelele = <S extends State, U extends RawStateUpdateObj<S>>({
  key,
  initialState,
  stateUpdate,
}: Atom<S, U>) => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!subscribeMap.has(key)) {
        subscribeMap.set(key, [onStoreChange]);
      } else {
        const subscribers = subscribeMap.get(key);
        if (subscribers) {
          subscribeMap.set(key, [...subscribers, onStoreChange]);
        }
      }
      return () => {
        subscribeMap.delete(key);
      };
    },
    [key],
  );

  const getSnapshot = useCallback(() => {
    return (stateMap.get(key) ?? initialState) as S;
  }, [key, initialState]);

  const getServerSnapshot = useCallback(() => {
    return initialState;
  }, [initialState]);

  const atomState = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const updateFnObj = useMemo(() => {
    const currentFnObj = updateFnMap.get(key);
    if (currentFnObj) {
      return currentFnObj as StateUpdateObj<S, U>;
    } else {
      const fnObj: StateUpdateObj<State, RawStateUpdateObj<State>> = {};

      Object.entries(stateUpdate).forEach(([fnName, fn]) => {
        const updateFunc = (...args: InferRestArgsFunction<typeof fn>) => {
          const currentState = (stateMap.get(key) ?? initialState) as S;
          const updatedState = fn(currentState, ...args);
          stateMap.set(key, updatedState);
          const subscribes = subscribeMap.get(key);

          if (subscribes) {
            subscribes.forEach((sub) => sub());
          }

          return updatedState;
        };
        fnObj[fnName] = updateFunc;
      });

      updateFnMap.set(key, fnObj);
      return fnObj as StateUpdateObj<S, U>;
    }
  }, [key, stateUpdate, initialState]);

  return {
    ...atomState,
    ...updateFnObj,
  };
};
