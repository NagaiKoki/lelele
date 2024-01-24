import { act, cleanup, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { atom } from "../atom.ts";
import { useLelele } from "../useLelele.ts";

describe("useLelele", () => {
  beforeEach(() => {
    cleanup();
  });

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
  test("return state which is equal to initialState value", () => {
    const { result } = renderHook(() => useLelele(userAtom));
    expect(result.current.state).toEqual(initialState);
  });

  test("change name if onChangeName executes", () => {
    const { result, rerender } = renderHook(() => useLelele(userAtom));

    expect(result.current.state.name).toEqual("");

    const updateName = "Koki Nagai";
    act(() => {
      result.current.onChangeName(updateName);
    });
    rerender();

    expect(result.current.state.name).toBe(updateName);
  });
});
