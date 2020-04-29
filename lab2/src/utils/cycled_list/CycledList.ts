import { CycledListIterator } from "./CycledListIterator";
import { CycledListElement } from "./CycledListElement";

export class CycledList<T> {
    private first : CycledListElement<T>;
    private last : CycledListElement<T>;

    constructor() {
        this.first = null;
        this.last = null;
    }

    push(data : T) {
        let newListElement = new CycledListElement<T>(data);

        if (this.first == null) {
            this.first = newListElement;
            this.last = newListElement;
            newListElement.setPrev(newListElement);
            newListElement.setNext(newListElement);
        } else {
            newListElement.setNext(this.first);
            newListElement.setPrev(this.last);
            this.last.setNext(newListElement);
            this.last = newListElement;
            this.first.setPrev(this.last);
        }
    }

    getHead() : CycledListElement<T> {
        return this.first;
    }

    createIterator() : CycledListIterator<T> {
        return new CycledListIterator<T>(this);
    }
}