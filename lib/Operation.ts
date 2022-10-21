export abstract class OperationDescriptor {
    abstract name: string;
    abstract operation: string;
    abstract description?: string;
    abstract execute(...args: any[]): void | boolean | Promise<void | boolean>;
}

export default class Operation {
    private _operations: OperationDescriptor[] = [];

    public register(operation: OperationDescriptor) {
        this._operations.push(operation);
    }

    public get(name: string): OperationDescriptor | undefined {
        return this._operations.find(o => o.name === name);
    }

    public get operations(): OperationDescriptor[] {
        return this._operations;
    }
}