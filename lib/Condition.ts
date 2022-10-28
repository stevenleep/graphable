import { Rule } from "./Rule";

export * from "./GroupConditionOperationEnum";

export interface ConditionConstructor {
  new (rule: Rule): Condition;
}

export class Condition {}
