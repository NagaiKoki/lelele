import { Component1 } from "@/components/Component1";
import { useLelele } from "lelele/src";

export const atom = {
  key: "hoge",
  state: {
    name: "koki",
  },
};

export default function Lelele() {
  const { state, updateState } = useLelele(atom);

  return (
    <div>
      <h1>page index</h1>
      <h1>{state.name}</h1>
      <button onClick={() => updateState({ name: "nagai" })}>click</button>

      <h2>component1</h2>
      <Component1 />
    </div>
  );
}
