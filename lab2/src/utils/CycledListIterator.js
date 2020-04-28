export class CycledListIterator {
    constructor(list) {
        this.current = list.first;
    }

    next() {
        this.current = this.current.next;
        return this.current.data;
    }

    peekNext() {
        return this.current.next.data;
    }

    peekPrev() {
        return this.current.prev.data;
    }

    peekCurrent() {
        return this.current.data;
    }
}