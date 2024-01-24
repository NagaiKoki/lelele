🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧

## Light Weight Global State Management for React (experimental)

🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧

lelele is a light weight global state management for React. It's pretty simple interface and easy to use.
You feel like @reduxjs/toolkit of slice and zustand.

## Usage

```tsx
import { atom } from "lelele";
const userAtom = atom({
  key: "user",
  initialState: {
    name: "koki",
    age: 100,
  },s
  updateState: {
    onChangeName: (currentState, name: string) => ({
      ...currentState,
      name,
    }),
    onChangeAge: (currentState, age: number) => ({
      ...currentState,
      age,
    }),
  },
});

const Component = () => {
  const { state, onChangeName } = useLelele(userAtom);

  return (
    <div>
      <p>name: {state.name}</p>
      <input
        value={state.name}
        onChange={(v) => onChangeName(v.target.value)}
      />
    </div>
  );
};
```
