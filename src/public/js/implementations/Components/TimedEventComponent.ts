import { Component } from "../../ecs/Component";
import { ComponentManager } from "../../ecs/ComponentManager";

export interface TimedEvent extends Component {
    [key: string]: Function | string;
    event: Function;
    name: string;
}

const Default: TimedEvent = {
    event: () => {},
    name: 'DefaultTimedEventName'
}

export class TimedEventComponentManager extends ComponentManager{
    constructor() {
        super('TimedEventComponentManager');
        this.components = new Map<string, TimedEvent>();
    }

    addComponentToEntity(entityId: string): TimedEvent {
        this.components.set(entityId, Default);
        return this.components.get(entityId) as TimedEvent;
    }
}