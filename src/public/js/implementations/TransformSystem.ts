import { ComponentManager } from "../ecs/ComponentManager";
import { EntityManager } from "../ecs/EntityManager";
import { System } from "../ecs/System";
import { Position, PositionComponentManager } from "./PositionComponent";
import { Velocity, VelocityComponentManager } from "./VelocityComponent";

export class TransformSystem extends System {
    constructor(entityManager: EntityManager, [...managers]: ComponentManager[]) {
        super(entityManager, managers);
    }

    update() {
        if (this.entities.size == 0) {
            this.populateEntitiesList();
        }
        this.entities.forEach(entityId => {
            let posManager = this.managersToQuery.get('PositionComponentManager') as PositionComponentManager;
            let volManager = this.managersToQuery.get('VelocityComponentManager') as VelocityComponentManager;
            let position = posManager.components.get(entityId) as Position;
            let velocity = volManager.components.get(entityId) as Velocity;
            position.y += velocity.dy;
        });
    }
}