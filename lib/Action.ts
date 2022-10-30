import Engine from "./Engine";
import { genId } from "./helpers/genId";
import Rule from "./Rule";

export interface ActionDescriptor {
  field?: string;
  operator?: string;
  payload?: unknown;
  dependencies?: string[];
  reverseDependencies?: string[];
  context?: Record<string, unknown>;
}

export default class Action {
  public id = "";
  public field = "";
  public operator = "";
  public payload: unknown = "";
  public context: Record<string, unknown> = {};
  public dependencies: string[] = [];
  public reverseDependencies: string[] = [];

  public actionMaps = new Map<string, Action>();
  public children: Action[] = [];

  constructor(
    private readonly engine: Engine,
    private readonly rule: Rule,
    descriptor: ActionDescriptor = {},
  ) {
    this.init(descriptor);
  }

  private init(descriptor: ActionDescriptor) {
    this.id = genId();

    this.field = descriptor.field || "";
    this.operator = descriptor.operator || "";
    this.payload = descriptor.payload || "";
    this.context = descriptor.context || {};
    this.dependencies = descriptor.dependencies || [];
    this.reverseDependencies = descriptor.reverseDependencies || [];
  }

  public addActions(actionDescriptor: ActionDescriptor[]) {
    return actionDescriptor.map((action) => this.addAction(action));
  }
  public addAction(actionDescriptor: ActionDescriptor) {
    const action = new Action(this.engine, this.rule, actionDescriptor);

    this.actionMaps.set(action.id, action);
    this.children.push(action);

    return action;
  }

  public removeAction(actionId: string) {
    this.actionMaps.delete(actionId);
    this.children = this.children.filter((action) => action.id !== actionId);
  }

  public updateAction(actionId: string, actionDescriptor: ActionDescriptor) {
    const action = this.actionMaps.get(actionId);
    if (action) {
      Object.assign(action, actionDescriptor);
    }
  }

  public fromJSON(json: ActionDescriptor | ActionDescriptor[]) {
    this.addActions(Array.isArray(json) ? json : [json]);
  }

  public getMeta() {
    return {
      id: this.id,
      field: this.field,
      operator: this.operator,
      payload: this.payload,
      context: this.context,
      dependencies: this.dependencies,
      reverseDependencies: this.reverseDependencies,
    };
  }

  public getMetaWithActions() {
    return {
      action: this.getMeta(),
      actions: this.children.map((action) => action.getMeta()),
    };
  }
}
