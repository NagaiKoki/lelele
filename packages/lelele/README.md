🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧

## Light Weight Global State Management for React (experimental)

🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧

"lelele" is a light weight global state management for React. It's pretty simple interface and easy to use. TypeScript first.

You feel like `@reduxjs/toolkit`, but lelele is bottom up approach to create state store and enable to make multiple stores called "atom".

## Install

#### With yarn

```sh
yarn add lelele
```

#### With npm

```sh
npm install lelele
```

#### With pnpm

```sh
pnpm install lelele
```

## Usage

```tsx
import { atom } from "lelele";
const userAtom = atom({
  key: "user",
  initialState: {
    name: "koki",
    age: 100,
  } as { name: string; age: number },
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
        onChange={(e) => onChangeName(e.target.value)}
      />
    </div>
  );
};
```

## demo

You can try lelele by demo app. After following command, access http://locahost:3000

```sh
$ git clone git@github.com:NagaiKoki/lelele.git
$ cd lelele
$ pnpm dev
```

## License

MIT License
