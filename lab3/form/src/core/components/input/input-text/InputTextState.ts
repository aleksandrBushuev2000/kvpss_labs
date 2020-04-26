export class InputTextState {
    public input : string;
    public focused : boolean;
    public hasFirstFocus : boolean;

    constructor(
        input : string = "",
        focused : boolean = false,
        hasFirstFocus : boolean = false,
    ) {
        this.input = input;
        this.focused = focused;
        this.hasFirstFocus = hasFirstFocus;
    }
};