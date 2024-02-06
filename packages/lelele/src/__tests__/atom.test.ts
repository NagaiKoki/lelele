import { describe, expect, test } from "vitest";
import { atom } from "../atom.ts";

describe("atom", () => {
  test("return valid API", () => {
    const key = "user";
    const initialState = {
      name: "",
    };
    const onChangeName = (currentState: typeof initialState, name: string) => {
      return {
        ...currentState,
        name,
      };
    };
    const userAtom = atom({
      key,
      initialState,
      stateUpdate: {
        onChangeName,
      },
    });

    expect(userAtom.key).toBe(key);
    expect(userAtom.initialState).toEqual(initialState);
    expect(userAtom.stateUpdate.onChangeName).toEqual(onChangeName);
  });
});
