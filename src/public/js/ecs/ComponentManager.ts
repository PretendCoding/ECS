import { Component } from "./Component";

export class ComponentManager {
// It might be better to call this entityComponentPairs since that's what it is
    components: Map<string, Component>;
    name: string;

    constructor(name: string) {
        this.components = new Map<string, Component>();
        this.name = name;
    }

    addComponentToEntity(entityId: string): Component {
        throw new Error(`function addComponentToEntity in ${this.name} should be overridden, and is not`);
        return {};
    }

    setComponentProperties(entityId: string, properties: Component) {
        if (this.components.has(entityId)) {
            let component = this.components.get(entityId) as Component;
            for (const property in properties) {
                if (component.hasOwnProperty(property)) {
                    component[property] = properties[property];
                } else {
                    if (component.hasOwnProperty('name')) {
                        throw new Error(`${component.name} does not have property ${property}`);
                    }
                    throw new Error(`This component does not have a name nor a property ${property}`);
                }
            }
        }
    }
}
