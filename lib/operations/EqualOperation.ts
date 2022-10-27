export const OPERATION = "equal";
export const OperationModel = {
  type: "number",
  operation: OPERATION,
  description: "Checks if the value is equal to the given number.",
  create(value: number) {
    return {
      type: "operation",
      name: OPERATION,
      args: [value],
    };
  },
  execute(value: number, compare: number) {
    return value === compare;
  },
};
