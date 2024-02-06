import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { Atom, ExposeStateUpdate, State, StateUpdate } from "./atom.ts";
import { InferRestArgsFunction } from "./utility.ts";

const stateMap = new Map<string, State>();
const updateFnMap = new Map<
  string,
  ExposeStateUpdate<State, StateUpdate<State>>
>();
const subscribeMap = new Map<string, Array<() => void>>();

export const useLelele = <S extends State, U extends StateUpdate<S>>({
  key,
  initialState,
  stateUpdate,
}: Atom<S, U>) => {
  const updateStates = useMemo(() => {
    const fn = updateFnMap.get(key);
    if (fn) {
      return fn as ExposeStateUpdate<S, U>;
    } else {
      const fnsMap: ExposeStateUpdate<State, StateUpdate<State>> = {};

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
        fnsMap[fnName] = updateFunc;
      });

      return fnsMap as ExposeStateUpdate<S, U>;
    }
  }, [key, stateUpdate, initialState]);

  const subscribe = useCallback(
    (onStoreChange: () => void) => () => {
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

  return {
    ...atomState,
    ...updateStates,
  };
};
