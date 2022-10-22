import Operation from "./Operation";
import Rule from "./Rule";

export default class Engine {
    static Rule = Rule;
    operation: Operation = new Operation();
    constructor() {

    }
}