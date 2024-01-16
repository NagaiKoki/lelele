import { useStore } from "../../../../src/useStore";

export default function Lelele() {
  return (
    <div>
      <Component1 />
      <Component2 />
    </div>
  );
}

const Component1 = () => {
  const [state] = useStore();
  return (
    <div>
      <h2>component1</h2>
      <p>{state.name}</p>
    </div>
  );
};

const Component2 = () => {
  const [state, setState] = useStore();

  return (
    <div>
      <h2>component2</h2>
      {state.name}
      <input type="text" onChange={(v) => setState({ name: v.target.value })} />
    </div>
  );
};
