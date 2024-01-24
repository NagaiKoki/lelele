import { companyAtom } from "@/store/company";
import { useLelele } from "lelele/src";

export const Component3 = () => {
  const { state } = useLelele(companyAtom);

  return (
    <div>
      <h2>Company</h2>
      <p>name: {state.name}</p>
      <p>address: {state.address}</p>
    </div>
  );
};
