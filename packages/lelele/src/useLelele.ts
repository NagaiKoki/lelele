import { useCallback, useSyncExternalStore } from "react";
import { type Atom } from "./atom.ts";

const stateMap = new Map<string, unknown>();
const subscribeMap = new Map<string, Array<() => void>>();

export const useLelele = <State>({ key, state }: Atom<State>) => {
  const updateState = (newState: any) => {
    stateMap.delete(key);
    stateMap.set(key, newState);
    const subscribers = subscribeMap.get(key);

    if (subscribers) {
      subscribers.forEach((subscribe) => subscribe());
    }
  };

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
    },
    [key],
  );

  const getSnapshot = useCallback(() => {
    return (stateMap.get(key) as State) ?? state;
  }, [key, state]);

  const getServerSnapshot = useCallback(() => {
    return state;
  }, [state]);

  const atomState = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    state: atomState,
    updateState,
  };
};
