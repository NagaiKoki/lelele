import { Component1 } from "@/components/Component1";
import { useLelele } from "lelele/src";
import { atom } from "lelele/src/atom";

export const userAtom = atom({
  key: "user",
  initialState: {
    name: "koki",
    age: 100,
  },
  stateUpdate: (state) => ({
    onChangeName: (name: string, age: number) => {
      return {
        ...state,
        name,
        age,
      };
    },
  }),
});

export default function Lelele() {
  const { state, onChangeName } = useLelele(userAtom);

  return (
    <div>
      <h1>page index</h1>
      <h1>{state.name}</h1>
      <input onChange={(v) => onChangeName(v.target.value, 100)} />

      <h2>component1</h2>
      <Component1 />
    </div>
  );
}
