import Condition from "./Condition";
import Action from "./Action";
import Engine from "./Engine";
import { ConditionOperatorEnum, ConditionOperatorValues } from "./ConditionOperators";
import { genId } from "./helpers/genId";

export interface RuleOptions {
  operator?: ConditionOperatorValues | ConditionOperatorEnum;
}

const flattedRules = new Map<string | number, Rule>();

export default class Rule {
  public condition: Condition | null = null;
  public action: Action | null = null;
  /**
   * top rule does not exist id
   */
  public id = "";
  /**
   * all any none
   */
  public children: Rule[] = [];
  public rulesMap = new Map<string, Rule>();
  public conditionOperator: ConditionOperatorEnum | ConditionOperatorValues =
    ConditionOperatorEnum.NONE;

  constructor(private readonly engine: Engine, private readonly options: RuleOptions = {}) {
    this.prepare();
    this.init();
  }

  private prepare() {
    this.condition = new Condition(this.engine, this);
    this.action = new Action(this.engine, this);
  }

  private init() {
    this.conditionOperator = this.options.operator || ConditionOperatorEnum.NONE;
    this.id = genId();
  }

  public addNewRule(
    options: RuleOptions = {
      operator: ConditionOperatorEnum.ANY,
    },
  ) {
    const rule = new Rule(this.engine, options);

    /**
     * 为了构造树形结构
     */
    this.children.push(rule);

    /**
     * 为了方便查找 rule
     */
    this.rulesMap.set(rule.id, rule);
    flattedRules.set(rule.id!, rule);

    return rule;
  }

  public removeRule(ruleOrRuleId: Rule | Rule["id"]) {
    const ruleId = typeof ruleOrRuleId === "string" ? ruleOrRuleId : ruleOrRuleId.id;
    this.children = this.children.filter((rule) => rule.id !== ruleId);
    this.rulesMap.delete(ruleId);
    flattedRules.delete(ruleId!);
  }

  public getRule(ruleId: Rule["id"]) {
    return flattedRules.get(ruleId!);
  }

  public getAllRules() {
    return flattedRules;
  }

  public getAllRulesArray() {
    return Array.from(flattedRules.values());
  }

  public getAllRulesWithMeta() {
    return this.getAllRulesArray().map((rule) => ({
      rule: rule.getMeta(),
      rules: rule.children.map((child) => child.getMeta()),
    }));
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public getRulesWithMeta() {
    return this.children.map((child) => child.getMeta());
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public getMeta() {
    return {
      id: this.id,
      operator: this.conditionOperator,
      condition: this.condition?.getMetaWithConditions().conditions,
      conditionFields: this.condition?.getFieldsObject(),
      action: this.action?.getMetaWithActions().actions,
      children:
        Array.isArray(this.children) && this.children.length > 0
          ? this.getRulesWithMeta.bind(this)()
          : [],
    };
  }

  /**
   * TODO
   */
  public fromJSON() {
    this.addNewRule({ operator: ConditionOperatorEnum.ANY });
    this.condition?.fromJSON({});
  }
}
