import { atom } from "lelele";
import type { Profile } from "@/types/profile";

export const profileAtom = atom({
  key: "profile",
  initialState: {
    name: "Mr.Todo",
    age: 30,
  } as Profile,
  stateUpdate: {
    onChangeName: (cs, name: string) => {
      return {
        ...cs,
        name,
      };
    },
    onChangeAge: (cs, age: number) => {
      return {
        ...cs,
        age,
      };
    },
  },
});
