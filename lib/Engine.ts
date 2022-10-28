import { ConditionOperatorEnum } from "./ConditionOperators";

import Rule from "./Rule";

export default class Engine {
  public rule = new Rule(this, { operator: ConditionOperatorEnum.NONE });
}
