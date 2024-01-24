export type InferRestArgsFunction<T> = T extends (
  arg: any,
  ...rest: infer U
) => any
  ? U
  : never;
