import { CycledList } from "./CycledList";
import { CycledListElement } from "./CycledListElement";

export class CycledListIterator<T> {
    private current : CycledListElement<T>
    
    constructor(list : CycledList<T>) {
        this.current = list.getHead();
    }

    next() {
        this.current = this.current.getNext();
        return this.current.getData();
    }

    peekPrevPrev() {
        return this.current.getPrev().getPrev();
    }

    peekNext() {
        return this.current.getNext().getData();
    }

    peekPrev() {
        return this.current.getPrev().getData();
    }

    peekCurrent() {
        return this.current.getData();
    }
}