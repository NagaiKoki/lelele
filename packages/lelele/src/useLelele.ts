import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type {
  Atom,
  State,
  StateUpdate,
  StateUpdateFunctionMap,
} from "./atom.ts";

const stateMap = new Map<string, State>();
const updateFnsMap = new Map<string, StateUpdateFunctionMap<State>>();
const subscribeMap = new Map<string, () => void>();

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const useLelele = <S extends State, U extends StateUpdate<S>>({
  key,
  initialState,
  stateUpdate,
}: Atom<S, U>) => {
  const [isReady, setIsReady] = useState(false);
  const fns = useMemo(() => {
    return stateUpdate(
      (stateMap.get(key) as S) ?? initialState,
    ) as ReturnType<U>;
  }, [key, initialState, stateUpdate]);

  useEffect(() => {
    stateMap.set(key, initialState);

    const fnsMap: StateUpdateFunctionMap<State> = {};

    Object.entries(fns).forEach(([fnName, fn]) => {
      const updateFunc = (...args: Parameters<typeof fn>) => {
        const state = fn(...args);
        stateMap.set(key, state);
        const subscribe = subscribeMap.get(key);

        if (subscribe) {
          subscribe();
        }

        return state;
      };
      fnsMap[fnName] = updateFunc;
    });

    updateFnsMap.set(key, fnsMap);
    setIsReady(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const updateStates = useMemo(() => {
    const map = updateFnsMap.get(key);
    if (isReady && map) {
      return map as ReturnType<U>;
    } else {
      return stateUpdate(initialState) as ReturnType<U>;
    }
  }, [key, isReady, stateUpdate, initialState]);

  const subscribe = useCallback(
    (onStoreChange: () => void) => () => {
      if (!subscribeMap.has(key)) {
        subscribeMap.set(key, onStoreChange);
      }
    },
    [key],
  );

  const getSnapshot = useCallback(() => {
    return (stateMap.get(key) as S) ?? initialState;
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
    state: atomState,
    ...updateStates,
  };
};
