export class CycledListElement<T> {
    private data : T;
    private prev : CycledListElement<T>;
    private next : CycledListElement<T>;

    constructor(data : T) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }

    public getPrev() : CycledListElement<T> {
        return this.prev;
    }

    public setPrev(prev : CycledListElement<T>) : void {
        this.prev = prev;
    }
  
    public getNext() : CycledListElement<T> {
        return this.next;
    }

    public setNext(next : CycledListElement<T>) : void {
        this.next = next;
    }

    public getData() : T {
        return this.data;
    }

}