export const INCLUDE_OPERATION = "include";
export const OperationIncludeModel = {
  type: "number",
  operation: INCLUDE_OPERATION,
  description: "Checks if the value is equal to the given number.",
  create([min, max]: number[]) {
    return {
      type: "operation",
      name: INCLUDE_OPERATION,
      args: [min, max],
    };
  },
  execute([min, max]: number[], compare: number) {
    return min >= compare && max < compare;
  },
};
