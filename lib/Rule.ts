import { Action, ActionConstructor } from "./Action";
import {
  Condition,
  ConditionConstructor,
  GroupConditionOperationEnum,
  GroupConditionOperationValues,
} from "./Condition";
import { genUUID } from "./helpers/genId";

export interface RuleOptions {
  groupConditionOperation?: GroupConditionOperationEnum | GroupConditionOperationValues;

  idPrefix?: string;

  /**
   * Allows custom implementation of rules and conditions to be managed
   */
  Action?: ActionConstructor;
  Condition?: ConditionConstructor;
}

export interface RuleMetaItem {
  id: string;
  parentID: string | null;
  operation: GroupConditionOperationEnum | GroupConditionOperationValues;
  conditions: [];
  actions: [];
  children?: RuleMetaItem[];
  flatted?: RuleMetaItem[];
}

const flattenedRules = new Map<string, Rule>();
export class Rule {
  private flatten = flattenedRules;

  /**
   * default condition group is ANY
   */
  static DefaultOptions: RuleOptions = {
    idPrefix: "rule",
    groupConditionOperation: GroupConditionOperationEnum.ANY,
    Action,
    Condition,
  };

  private options: RuleOptions = Rule.DefaultOptions;

  /**
   * self instance
   */
  public id = "";
  public action: Action | null = null;
  public condition: Condition | null = null;
  public groupConditionOperation: GroupConditionOperationEnum | GroupConditionOperationValues =
    GroupConditionOperationEnum.ANY;

  /**
   * relationship
   */
  public parentID: string | null = null;
  public parent: Rule | null = null;
  public children: Rule[] = [];

  constructor(userOptions: RuleOptions = {}) {
    this.prepare(userOptions);
    flattenedRules.set(this.id!, this);
  }

  private prepare(userOptions: RuleOptions) {
    /**
     * merge user options with default options
     */
    this.options = Object.assign({}, Rule.DefaultOptions, userOptions);

    /**
     * operation
     */
    this.setGroupConditionOperation(this.options.groupConditionOperation);

    /**
     * rule id
     */
    this.id = this.options.idPrefix + genUUID();

    /**
     * create action and condition instance
     */
    this.action = new this.options.Action!(this);
    this.condition = new this.options.Condition!(this);
  }

  /**
   *
   * @title setGroupConditionOperation
   *
   * @param groupConditionOperation set group condition operation
   * @returns this
   *
   * @throws Error if groupConditionOperation is not valid
   * @see GroupConditionOperationEnum
   * @see GroupConditionOperationValues
   */
  public setGroupConditionOperation(
    groupConditionOperation?: GroupConditionOperationEnum | GroupConditionOperationValues,
  ) {
    if (groupConditionOperation) {
      this.groupConditionOperation = groupConditionOperation;
    }
  }

  public createChild(userOptions: RuleOptions = {}) {
    const child = new Rule(userOptions);
    child.parent = this;
    child.parentID = this.id;
    this.children.push(child);
  }

  public removeChild(childOrId: Rule | string) {
    const id = typeof childOrId === "string" ? childOrId : (childOrId.id as string);
    const index = this.children.findIndex((child) => child.id === id);
    if (index > -1) {
      this.children.splice(index, 1);
    }
    flattenedRules.delete(id);
  }

  public getGroupConditionOperation() {
    return this.groupConditionOperation;
  }

  /**
   * @param indexOrId rule index or id
   * @returns rule
   */
  public getChild(indexOrId: number | string) {
    if (typeof indexOrId === "number") {
      return this.children[indexOrId];
    } else {
      return this.children.find((child) => child.id === indexOrId);
    }
  }

  public getChildren() {
    return this.children;
  }

  public getChildrenLength() {
    return this.children.length;
  }

  public getFlattenedRules() {
    return Array.from(flattenedRules.values());
  }

  public getMeta(
    rule: Rule,
    config: {
      flatted?: boolean;
      children?: boolean;
    } = {
      children: false,
      flatted: false,
    },
  ): RuleMetaItem {
    const { flatted, children } = config;
    const meta: RuleMetaItem = {
      id: rule.id,
      parentID: rule.parentID,
      operation: rule.groupConditionOperation,
      conditions: [],
      actions: [],
    };

    if (children) {
      meta.children = rule.children.map((child) => this.getMeta(child, config));
    }
    if (flatted) {
      meta.flatted = rule.getFlattenedRules().map((child) => this.getMeta(child, config));
    }
    return meta;
  }

  public toJSON(instance?: Rule | Rule[]) {
    if (instance) {
      return Array.isArray(instance)
        ? instance.map((rule) => this.getMeta(rule))
        : instance.getMeta(instance);
    } else {
      return this.getMeta(this);
    }
  }

  public toComplexJSON(instance?: Rule | Rule[]) {
    const config = { children: true, flatted: true };
    if (instance) {
      return Array.isArray(instance)
        ? instance.map((rule) => this.getMeta(rule, config))
        : instance.getMeta(instance, config);
    } else {
      return this.getMeta(this, config);
    }
  }

  public fromJSON(json: RuleMetaItem) {
    console.log(json);
    // TODO
  }
}
