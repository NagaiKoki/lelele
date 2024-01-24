import { atom } from "lelele/src/atom";

export const userAtom = atom({
  key: "user",
  initialState: {
    name: "koki",
    age: 100,
  },
  stateUpdate: {
    onChangeName: (currentState, name: string, age: number) => {
      return {
        ...currentState,
        name,
        age,
      };
    },
  },
});
