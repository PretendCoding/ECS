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
    components: Map<string, TimedEvent[]>;

    constructor() {
        super('TimedEventComponentManager');
        this.components = new Map<string, TimedEvent[]>();
    }

    addComponentToEntity(entityId: string): TimedEvent {
        if (this.components.has(entityId)) {
            let compArray = this.components.get(entityId) as Array<TimedEvent>;
            let index = compArray.push(Default) as number - 1;
            return compArray[index];
        }

        this.components.set(entityId, new Array<TimedEvent>());
        let compArray = this.components.get(entityId) as Array<TimedEvent>;
        compArray[0] = Default;
        return compArray[0];
    }
}