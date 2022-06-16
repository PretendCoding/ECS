import { Component } from "../ecs/Component";
import { ComponentManager } from "../ecs/ComponentManager";

export class Position extends Component {
    x = 0;
    y = 0;
}

export class PositionComponentManager extends ComponentManager{
    constructor() {
        super('PositionComponentManager');
        this.components = new Map<string, Position>();
    }

    addComponentToEntity(entityId: string) {
        this.components.set(entityId, new Position());
    }
}