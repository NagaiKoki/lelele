type Atom<Values> = Values;

export const createAtom = <Values>(atom: Atom<Values>) => {
  const key = Symbol(JSON.stringify(atom));

  const targetAtom = {
    [key]: atom,
  };

  return targetAtom;
};
