import { useEffect, useState } from "react";

const listeners = new Set<() => void>();

let globalState = {
  name: "",
};

export const useStore = () => {
  const [state, setState] = useState(globalState);

  useEffect(() => {
    const listenerFunc = () => {
      setState(globalState);
    };
    listeners.add(listenerFunc);
    listenerFunc();

    return () => {
      listeners.delete(listenerFunc);
    };
  }, []);

  const setStoreState = (state: typeof globalState) => {
    globalState = state;
    listeners.forEach((listener) => listener());
  };

  return [state, setStoreState] as const;
};
