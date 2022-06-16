import { Component } from "../../ecs/Component";
import { ComponentManager } from "../../ecs/ComponentManager";

export class Renderable extends Component {
    element: HTMLElement;

    constructor() {
        super();
        this.element = document.createElement('HTMLElement');
    }
}

export class RenderableComponentManager extends ComponentManager {
    constructor() {
        super('RenderableComponentManager');
        this.components = new Map<string, Renderable>();
    }
    
    addComponentToEntity(entityId: string): Renderable {
        this.components.set(entityId, new Renderable());
        return this.components.get(entityId) as Renderable;
    }
}