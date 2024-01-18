import { useSyncExternalStore } from "react";

const leleleStoreMap = new Map();
const storeChangesMap = new Map();

export const useLelele = (atom: { key: string; state: any }) => {
  const currentState = leleleStoreMap.get(atom.key) ?? atom.state;

  const updateState = (newState: any) => {
    leleleStoreMap.delete(atom.key);
    leleleStoreMap.set(atom.key, newState);
    const subscribers = storeChangesMap.get(atom.key);
    subscribers.forEach((subscribe: any) => subscribe());
  };

  const subscribeStore = (subscribe: () => void) => () => {
    if (!storeChangesMap.has(atom.key)) {
      storeChangesMap.set(atom.key, [subscribe]);
    } else {
      const subscribers = storeChangesMap.get(atom.key);
      storeChangesMap.set(atom.key, [...subscribers, subscribe]);
    }
  };

  const getServerSnapshot = () => {
    return currentState;
  };

  const state = useSyncExternalStore(
    subscribeStore,
    () => leleleStoreMap.get(atom.key) ?? currentState,
    getServerSnapshot,
  );

  return {
    state,
    updateState,
  };
};
