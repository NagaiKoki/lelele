import { useLelele } from "lelele/src";
import { userAtom } from "@/store/user";

export const Component1 = () => {
  const { state } = useLelele(userAtom);
  return (
    <div>
      <h2>component1</h2>
      <p>{state.name}</p>
    </div>
  );
};
