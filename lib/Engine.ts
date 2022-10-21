import Action from "./Action";
import Condition from "./Condition";
import Operation from "./Operation";

export default class Engine {
    /**
     * you can use Engine.Action | Engine.Condition to create Action | Condition instance
     */
    static Action = Action;
    static Condition = Condition;

    operation: Operation = new Operation();

    constructor() {

    }
}
