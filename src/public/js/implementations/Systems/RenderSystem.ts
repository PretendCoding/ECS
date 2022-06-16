import { ComponentManager } from "../../ecs/ComponentManager";
import { EntityManager } from "../../ecs/EntityManager";
import { System } from "../../ecs/System";
import { PositionComponentManager, Position } from "../Components/PositionComponent";
import { Renderable, RenderableComponentManager } from "../Components/RenderableComponent";


export class RenderSystem extends System {
    constructor(entityManager: EntityManager, [...managers]: ComponentManager[]) {
        super(entityManager, managers);
    }

    update() {
        this.refresh();
        this.entities.forEach(entityId => {
            let manager = this.managersToQuery.get('RenderableComponentManager') as RenderableComponentManager;
            let render = manager.components.get(entityId) as Renderable;
            let posManager = this.managersToQuery.get('PositionComponentManager') as PositionComponentManager;
            let pos = posManager.components.get(entityId) as Position;
            render.element.style.top = pos.y.toString() + 'px';
        });
    }
}