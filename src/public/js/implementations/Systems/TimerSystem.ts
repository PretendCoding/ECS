import { ComponentManager } from "../../ecs/ComponentManager";
import { EntityManager } from "../../ecs/EntityManager";
import { System } from "../../ecs/System";
import { TimedEvent, TimedEventComponentManager } from "../Components/TimedEventComponent";
import { Timer, TimerComponentManager } from "../Components/TimerComponent";
import { VelocityComponentManager, Velocity } from "../Components/VelocityComponent";

export class TimerSystem extends System {
    time: number;

    constructor(entityManager: EntityManager, [...managers]: ComponentManager[]) {
        super(entityManager, managers);
        this.time = 0;
    }

    update(tick: number) {

        let lastTime = tick - this.time;
        this.time += lastTime;

        this.refresh();
        this.entities.forEach(entityId => {
            let timerManger = this.managersToQuery.get('TimerComponentManager') as TimerComponentManager;
            let timedEventManger = this.managersToQuery.get('TimedEventComponentManager') as TimedEventComponentManager;
            let timer = timerManger.components.get(entityId) as Timer;
            let timedEvent = timedEventManger.components.get(entityId) as TimedEvent;
            let frequency = timer.frequency;
            let event = timedEvent.event;
            if (this.time%frequency > frequency - lastTime/2 || this.time%frequency < lastTime/2) {
                event();
                // console.log('tick:' + tick);
                // console.log('time:' + this.time);
            }
        });
    }
}