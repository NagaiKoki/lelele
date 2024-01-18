import { useLelele } from "lelele/src";
import { atom } from "../pages";

export const Component1 = () => {
  const { state } = useLelele(atom);
  return (
    <div>
      <h2>component1</h2>
      <p>{state.name}</p>
    </div>
  );
};
