import { Component1 } from "@/components/Component1";
import { companyAtom } from "@/store/company";
import { userAtom } from "@/store/user";
import { useLelele } from "lelele/src";

export function Component2() {
  // const { onChangeName } = useLelele(userAtom);
  const {
    state,
    onChangeName: onChangeCompanyName,
    onChangeAddress,
    onChangeNameAndAddress,
  } = useLelele(companyAtom);
  const { onChangeName } = useLelele(userAtom);

  return (
    <div>
      <h2>component2</h2>
      <div>
        <label>user name</label>
        <input onChange={(v) => onChangeName(v.target.value, 100)} />
      </div>
      <div>
        <label>company name</label>
        <p>{state.name}</p>
        <input onChange={(v) => onChangeCompanyName(v.target.value)} />
      </div>
      <div>
        <label>company address</label>
        <input onChange={(v) => onChangeAddress(v.target.value)} />
      </div>
      <div>
        <label>company address and name</label>
        <input
          onChange={(v) =>
            onChangeNameAndAddress(
              v.target.value,
              `${v.target.value}+${v.target.value}`,
            )
          }
        />
      </div>
    </div>
  );
}
