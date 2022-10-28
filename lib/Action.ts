import Engine from "./Engine";
import Rule from "./Rule";

export default class Action {
  constructor(private readonly engine: Engine, private readonly rule: Rule) {}
}
