import { ComponentManager } from "../../ecs/ComponentManager";
import { EntityManager } from "../../ecs/EntityManager";
import { System } from "../../ecs/System";
import { VelocityComponentManager, Velocity } from "../Components/VelocityComponent";

export class GravitySystem extends System {
    constructor(entityManager: EntityManager, [...managers]: ComponentManager[]) {
        super(entityManager, managers);
    }

    update() {
        this.refresh();
        this.entities.forEach(entityId => {
            let manager = this.managersToQuery.get('VelocityComponentManager') as VelocityComponentManager;
            let velocity = manager.components.get(entityId) as Velocity;
            velocity.dy += 0.01;
        });
    }
}