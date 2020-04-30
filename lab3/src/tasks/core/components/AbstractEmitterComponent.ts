import { AbstractComponent } from "./AbstractComponent";
import { EventEmitter } from "../events/EventEmitter";
import { EventHandler } from "../events/EventHandler";
import { CoreEvent } from "../events/CoreEvent";

export abstract class AbstractEmitterComponent extends AbstractComponent implements EventEmitter {
    private subscribers : Array<EventHandler>;

    constructor() {
        super();
        this.subscribers = [];
    }

    pushSubscriber(sub: EventHandler): void {
        this.subscribers.push(sub);
    }
    emitEvent(ev: CoreEvent): void {
        this.subscribers.forEach(sub => sub.handleEvent(ev));
    }
    
}