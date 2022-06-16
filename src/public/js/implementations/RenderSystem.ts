import { ComponentManager } from "../ecs/ComponentManager";
import { EntityManager } from "../ecs/EntityManager";
import { System } from "../ecs/System";
import { Position, PositionComponentManager } from "./PositionComponent";

export class RenderSystem extends System {
    constructor(entityManager: EntityManager, [...managers]: ComponentManager[]) {
        super(entityManager, managers);
    }

    update() {
        if (this.entities.size == 0) {
            this.populateEntitiesList();
        }
        this.entities.forEach(entityId => {
            // let manager = this.managersToQuery.get('RenderableComponentManager') as RenderableComponentManager;
            // This is where we'd get the renderable component, but neh
            let posManager = this.managersToQuery.get('PositionComponentManager') as PositionComponentManager;
            let player = document.querySelector('.Player') as HTMLDivElement;
            let pos = posManager.components.get(entityId) as Position;
            player.style.top = pos.y.toString() + 'px';
            // console.log(pos.y);
        });
    }
}