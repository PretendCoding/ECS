import { Component } from "../../ecs/Component";
import { ComponentManager } from "../../ecs/ComponentManager";

export type Physics = Component;

export class PhysicsComponentManager extends ComponentManager {
    constructor() {
        super('PhysicsComponentManager');
        this.components = new Map<string, Physics>();
    }
    
    addComponentToEntity(entityId: string): Physics {
        this.components.set(entityId, {});
        return this.components.get(entityId) as Physics;
    }
}