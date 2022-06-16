import { ComponentManager } from "./ComponentManager";

export class Entity {
    id: string;

    constructor(id: string) {
        this.id = id;
    }

    addComponent(manager: ComponentManager) {
        manager.addComponentToEntity(this.id);
    }
}