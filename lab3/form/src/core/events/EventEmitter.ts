import { EventHandler } from "./EventHandler";
import { CoreEvent } from "./CoreEvent";

export abstract class EventEmitter {
    protected subscribers : Array<EventHandler>;
    
    constructor() {
        this.subscribers = [];
    }

    pushSubscriber(sub : EventHandler) {
        this.subscribers.push(sub);
    }

    emitEvent(ev : CoreEvent) {
        this.subscribers.forEach(sub => sub.handleEvent(ev));
    }
}