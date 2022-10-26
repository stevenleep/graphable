export const GREATER_EQUAL_OPERATION = "greaterEqual";
export const OperationGreatelEqualModel = {
  type: "number",
  operation: GREATER_EQUAL_OPERATION,
  description: "Checks if the value is equal to the given number.",
  create(value: number) {
    return {
      type: "operation",
      name: GREATER_EQUAL_OPERATION,
      args: [value],
    };
  },
  execute(value: number, compare: number) {
    return value >= compare;
  },
};
