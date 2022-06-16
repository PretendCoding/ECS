import { ComponentManager } from "../ecs/ComponentManager";
import { EntityManager } from "../ecs/EntityManager";
import { System } from "../ecs/System";
import { VelocityComponentManager, Velocity } from "./VelocityComponent";

export class Gravity extends System {
    constructor(entityManager: EntityManager, [...managers]: ComponentManager[]) {
        super(entityManager, managers);
    }

    update() {
        if (this.entities.size == 0) {
            this.populateEntitiesList();
        }
        this.entities.forEach(entityId => {
            let manager = this.managersToQuery.get('VelocityComponentManager') as VelocityComponentManager;
            let velocity = manager.components.get(entityId) as Velocity;
            velocity.dy += 0.01;
        });
    }
}