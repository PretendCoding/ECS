import { Component } from "../../ecs/Component";
import { ComponentManager } from "../../ecs/ComponentManager";

// export class Position extends Component {
//     [Property in keyof Type]: number;
//     [y in keyof]: number;
// }

export interface Position extends Component {
    [key: string]: number;
    x: 0;
    y: 0;
}

const Default: Position = {
    x: 0,
    y: 0
}
export class PositionComponentManager extends ComponentManager{
    constructor() {
        super('PositionComponentManager');
        this.components = new Map<string, Position>();
    }

    addComponentToEntity(entityId: string): Position {
        this.components.set(entityId, Default);
        return this.components.get(entityId) as Position;
    }
}