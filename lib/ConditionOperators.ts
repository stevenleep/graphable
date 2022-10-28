export enum ConditionOperatorEnum {
  // Only one of the conditions has to be met
  ANY = "ANY",
  // All conditions have to be met
  ALL = "ALL",
  // None of the conditions can be met
  NONE = "NONE",
}

export type ConditionOperatorValues = keyof typeof ConditionOperatorEnum;
