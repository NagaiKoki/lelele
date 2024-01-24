import { atom } from "lelele/src/atom";

export const companyAtom = atom({
  key: "company",
  initialState: {
    name: "",
    address: "",
  },
  stateUpdate: {
    onChangeName: (currentState, name: string) => {
      return {
        ...currentState,
        name,
      };
    },
    onChangeAddress: (currentState, address: string) => {
      return {
        ...currentState,
        address,
      };
    },
    onChangeNameAndAddress: (currentState, name: string, address: string) => {
      return {
        ...currentState,
        name,
        address,
      };
    },
  },
});
