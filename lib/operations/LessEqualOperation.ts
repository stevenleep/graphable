export const LESS_EQUAL_OPERATION = "lessEqual";
export const OperationLessEqualModel = {
  type: "number",
  operation: LESS_EQUAL_OPERATION,
  description: "Checks if the value is equal to the given number.",
  create(value: number) {
    return {
      type: "operation",
      name: LESS_EQUAL_OPERATION,
      args: [value],
    };
  },
  execute(value: number, compare: number) {
    return value >= compare;
  },
};
