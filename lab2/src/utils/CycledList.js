import { CycledListIterator } from "./CycledListIterator";

class CycledListElement {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

export class CycledList {
    constructor() {
        this.first = null;
        this.last = null;
    }

    push(data) {
        let newListElement = new CycledListElement(data);

        if (this.first == null) {
            this.first = newListElement;
            this.last = newListElement;
            newListElement.prev = newListElement;
            newListElement.next = newListElement;
        } else {
            newListElement.next = this.first;
            newListElement.prev = this.last;
            this.last.next = newListElement;
            this.last = newListElement;
            this.first.prev = this.last
        }
    }

    createIterator() {
        return new CycledListIterator(this);
    }
}