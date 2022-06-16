import { Component } from "../ecs/Component";
import { ComponentManager } from "../ecs/ComponentManager";

export class Velocity extends Component {
    dx = 0;
    dy = 0;
}

export class VelocityComponentManager extends ComponentManager {
    constructor() {
        super('VelocityComponentManager');
        this.components = new Map<string, Velocity>();
    }
    
    addComponentToEntity(entityId: string) {
        this.components.set(entityId, new Velocity());
    }
}