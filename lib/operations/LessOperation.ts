export const LESS_OPERATION = "less";
export const OperationLessModel = {
  type: "number",
  operation: LESS_OPERATION,
  description: "Checks if the value is equal to the given number.",
  create(value: number) {
    return {
      type: "operation",
      name: LESS_OPERATION,
      args: [value],
    };
  },
  execute(value: number, compare: number) {
    return value < compare;
  },
};
