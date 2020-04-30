export class InputValidationObject {
    private isValid : boolean;
    private invalidReason : string;

    constructor(isValid : boolean, invalidReason : string) {
        this.isValid = isValid;
        this.invalidReason = invalidReason;
    }

    public getValidState() {
        return this.isValid;
    }

    public getInvalidReason() {
        return this.invalidReason;
    }
}