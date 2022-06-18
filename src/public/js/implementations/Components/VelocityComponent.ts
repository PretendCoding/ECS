import { Component } from "../../ecs/Component";
import { ComponentManager } from "../../ecs/ComponentManager";

// export class Velocity extends Component {
//     dx = 0;
//     dy = 0;
// }

export interface Velocity extends Component {
    [key: string]: number;
    dx: 0;
    dy: 0;
};

const Default: Velocity = {
    dx: 0,
    dy: 0
}

export class VelocityComponentManager extends ComponentManager {
    constructor() {
        super('VelocityComponentManager');
        this.components = new Map<string, Velocity>();
    }
    
    addComponentToEntity(entityId: string): Velocity {
        this.components.set(entityId, Default);
        return this.components.get(entityId) as Velocity;
    }
}