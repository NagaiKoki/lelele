## Light Weight Global State Management for React

**lelele** is a light weight global state management for React. It's pretty simple interface and light weight. TypeScript first.

You feel like `@reduxjs/toolkit`, but lelele is bottom up approach to create state store and enable to make multiple stores called **atom**.

- Minified size is just **1.3KB**
- **No Provider**
- **Simple API**, just `useLelele` and `atom`

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
  stateUpdate: {
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

You can try lelele from [here](https://lelele-todos.vercel.app/) or, access http://locahost:3000 after following command.

```sh
$ git clone git@github.com:NagaiKoki/lelele.git
$ cd lelele
$ pnpm dev
```

## License

MIT License
