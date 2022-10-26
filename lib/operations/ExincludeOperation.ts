export const EXINCLUDE_OPERATION = "exinclude";
export const OperationExincludeModel = {
  type: "number",
  operation: EXINCLUDE_OPERATION,
  description: "Checks if the value is equal to the given number.",
  create([min, max]: number[]) {
    return {
      type: "operation",
      name: EXINCLUDE_OPERATION,
      args: [min, max],
    };
  },
  execute([min, max]: number[], compare: number) {
    return min < compare && max >= compare;
  },
};
