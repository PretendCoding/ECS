import { Entity } from "./Entity";

export class EntityManager {
    entities: Map<string, Entity>;

    constructor() {
        this.entities = new Map<string, Entity>();
    }

    createEntity(entityId?: string): Entity {
        if (!entityId) {
            entityId = crypto.randomUUID();
        }        
        if (this.entities.has(entityId)) {
            throw new Error(`${this} already has an entity called ${entityId}`);
        }
        this.entities.set(entityId, new Entity(entityId));
        return this.entities.get(entityId) as Entity;
    }
}