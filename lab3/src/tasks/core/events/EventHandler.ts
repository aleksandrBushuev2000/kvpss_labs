import { CoreEvent } from "./CoreEvent";

export interface EventHandler {
    handleEvent(event : CoreEvent) : void;
}