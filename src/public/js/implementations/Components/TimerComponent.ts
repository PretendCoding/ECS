import { Component } from "../../ecs/Component";
import { ComponentManager } from "../../ecs/ComponentManager";

export interface Timer extends Component {
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
    frequency: 0,
    type: TimerType.LOOP,
    name: 'DefaultTimerName'
}
export class TimerComponentManager extends ComponentManager{
    constructor() {
        super('TimerComponentManager');
        this.components = new Map<string, Timer>();
    }

    addComponentToEntity(entityId: string): Timer {
        this.components.set(entityId, Default);
        return this.components.get(entityId) as Timer;
    }
}