import { EventEmitter } from "./EventEmitter";

export class CoreEvent {
    public name : string;
    public data : object;
    public target : EventEmitter;
}