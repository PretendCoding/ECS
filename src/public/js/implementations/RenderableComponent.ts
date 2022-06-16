import { Component } from "../ecs/Component";
import { ComponentManager } from "../ecs/ComponentManager";

export class Renderable extends Component {}

export class RenderableComponentManager extends ComponentManager {
    constructor() {
        super('RenderableComponentManager');
        this.components = new Map<string, Renderable>();
    }
    
    addComponentToEntity(entityId: string) {
        this.components.set(entityId, new Renderable());
    }
}