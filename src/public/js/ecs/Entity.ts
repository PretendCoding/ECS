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

    addComponents(componentManagers: ComponentManager[]) {
        for (let manager of componentManagers) {
            this.addComponent(manager);
        }
    }
    
    setComponentProperties(manager: ComponentManager, properties: Component) {
        manager.setComponentProperties(this.id, properties);
    }

    addComponent_SetProperties(manager: ComponentManager, properties: Component) {
        this.addComponent(manager);
        this.setComponentProperties(manager, properties);
    }

    addComponents_SetProperties(componentManagers: Array<ComponentManager>, properties: Array<Component> | Map<ComponentManager, Component>) {

        if (properties.hasOwnProperty('length')) {
            // Means its and array, so it should be 1:1
            // If it's not, throw an error
            let prop = properties as Array<Component>;
            if (componentManagers.length !== prop.length) {
                throw new Error('properties is an array of components, but does not match the size of componentManagers. Did you mean for properties to be a Map<ComponenetManager, Component>?')
            }
            for (let i = 0; i < componentManagers.length; i++) {
                componentManagers[i].setComponentProperties(this.id, prop[i]);
            }
        } 
        
        if (properties.hasOwnProperty('size')) {
            let props = properties as Map<ComponentManager, Component>;
            for (const manager of componentManagers) {
                if (props.has(manager)) {
                    manager.setComponentProperties(this.id, props.get(manager) as Component);
                }
            }
        }

    }
}