export const GREATER_OPERATION = "greater";
export const OperationGreatelModel = {
  type: "number",
  operation: GREATER_OPERATION,
  description: "Checks if the value is equal to the given number.",
  create(value: number) {
    return {
      type: "operation",
      name: GREATER_OPERATION,
      args: [value],
    };
  },
  execute(value: number, compare: number) {
    return value > compare;
  },
};
