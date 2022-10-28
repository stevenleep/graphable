import Engine from "./Engine";
import { genUUID } from "./helpers/genId";
import Rule from "./Rule";

export interface ConditionDescriptor {
  field?: string;
  operator?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: Record<string, unknown>;
}

export default class Condition {
  public id = "";

  public field = "";
  public operator = "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public value: any = "";

  /**
   * 规则的field关联的Condition数量映射
   */
  public fields = new Map<string, number>();

  public conditionsMap = new Map<string, Condition>();
  public children: Condition[] = [];
  public context: Record<string, unknown> = {};

  constructor(
    private readonly engine: Engine,
    private readonly rule: Rule,
    descriptor: ConditionDescriptor = {},
  ) {
    this.init(descriptor);
  }

  private init(descriptor: ConditionDescriptor) {
    this.id = genUUID();

    this.field = descriptor.field || "";
    this.operator = descriptor.operator || "";
    this.value = descriptor.value || "";
    this.context = descriptor.context || {};
  }

  public addCondition(conditionDescriptor: ConditionDescriptor = {}) {
    const condition = new Condition(this.engine, this.rule, conditionDescriptor);

    this.conditionsMap.set(condition.id, condition);
    this.children.push(condition);

    this.fields.set(condition.field, (this.fields.get(condition.field) || 0) + 1);

    return condition;
  }

  public removeCondition(conditionId: string) {
    this.conditionsMap.delete(conditionId);

    this.children = this.children.filter((condition) => condition.id !== conditionId);

    this.fields.set(conditionId, (this.fields.get(conditionId) || 0) - 1);

    if (this.fields.get(conditionId) === 0) {
      this.fields.delete(conditionId);
    }
  }

  public getConditions() {
    return this.children;
  }

  public getCondition(conditionId: string) {
    return this.conditionsMap.get(conditionId);
  }

  public getConditionsByField(field: string) {
    return this.children.filter((condition) => condition.field === field);
  }

  public getConditionsByOperator(operator: string) {
    return this.children.filter((condition) => condition.operator === operator);
  }

  public getMetaWithConditions() {
    return {
      ...this.getMeta(),
      conditions: this.children.map((condition) => condition.getMeta()),
    };
  }

  public fieldExists(field: string) {
    return this.fields.has(field);
  }

  public getFieldsObject() {
    return Object.fromEntries(this.fields);
  }

  public getMeta() {
    return {
      id: this.id,
      field: this.field,
      operator: this.operator,
      value: this.value,
      context: this.context,
      fields: this.getFieldsObject(),
    };
  }

  public fromJSON(conditionDescriptor: ConditionDescriptor = {}) {
    this.addCondition(conditionDescriptor);
  }
}
