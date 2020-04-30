export class InputPayload {
    data : string;
    name : string;

    constructor(name : string, data : string) {
        this.name = name;
        this.data = data;
    }
}