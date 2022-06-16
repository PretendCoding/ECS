import { Component } from "./Component";

export class ComponentManager {
    components: Map<string, Component>;
    name: string;

    constructor(name: string) {
        this.components = new Map<string, Component>();
        this.name = name;
    }

    addComponentToEntity(entityId: string): Component {
        throw new Error(`function addComponentToEntity in ${this.name} should be overridden, and is not`);
        return new Component();
    }
}