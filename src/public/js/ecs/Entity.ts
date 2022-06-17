import { Component } from "./Component";
import { ComponentManager } from "./ComponentManager";

export class Entity {
    id: string;

    constructor(id: string) {
        this.id = id;
    }

    addComponent(manager: ComponentManager): Component {
        return manager.addComponentToEntity(this.id);
    }

    setComponentProperties(manager: ComponentManager, properties: Component) {
        manager.setComponentProperties(this.id, properties);
    }
}