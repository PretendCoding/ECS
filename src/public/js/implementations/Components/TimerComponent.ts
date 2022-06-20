import { Component } from "../../ecs/Component";
import { ComponentManager } from "../../ecs/ComponentManager";

export interface Timer extends Component {
    [key: string]: Array<TimerProperties> | string;
    components: Array<TimerProperties>;
}

export interface TimerProperties {
    [key: string]: number | string;
    frequency: number;
    type: TimerType;
    name: string;
}

export enum TimerType {
    TIMEOUT,
    LOOP
}

const Default: Timer = {
    // frequency: 0,
    // type: TimerType.LOOP,
    name: 'DefaultTimerName',
    components: new Array<TimerProperties>()
}
export class TimerComponentManager extends ComponentManager{
    constructor() {
        super('TimerComponentManager');
        this.components = new Map<string, Timer[]>();
        this.isComponentAnArray = true;
    }

    addComponentToEntity(entityId: string): Timer {
        if (this.components.has(entityId)) {
            let compArray = this.components.get(entityId) as Array<Timer>;
            let index = compArray.push(Default) as number - 1;
            return compArray[index];
        }

        this.components.set(entityId, new Array<Timer>());
        let compArray = this.components.get(entityId) as Array<Timer>;
        compArray[0] = Default;
        return compArray[0];
    }
}