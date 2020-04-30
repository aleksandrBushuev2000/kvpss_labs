import { EventHandler } from "./EventHandler";
import { CoreEvent } from "./CoreEvent";

export interface EventEmitter {
    pushSubscriber(sub : EventHandler) : void;
    emitEvent(ev : CoreEvent) : void;
}