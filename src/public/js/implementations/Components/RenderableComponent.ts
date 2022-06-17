import { Component } from "../../ecs/Component";
import { ComponentManager } from "../../ecs/ComponentManager";

export class Renderable extends Component {
    element: HTMLElement;

    constructor() {
        super();
        this.element = document.createElement('HTMLElement');
    }
}

export class RenderableComponentManager extends ComponentManager {
    constructor() {
        super('RenderableComponentManager');
        this.components = new Map<string, Renderable>();
    }
    
    addComponentToEntity(entityId: string): Renderable {
        this.components.set(entityId, new Renderable());
        return this.components.get(entityId) as Renderable;
    }

    setComponentProperties(entityId: string, properties: Renderable) {
        console.log(this.components);
        if (this.components.has(entityId)) {
            let component = this.components.get(entityId) as Renderable;
            /*
                If I have to create a setComponentProperties for each manager anyway, I could just do
                component.element = properties.element

                but that seems very annoying, and I feel like this could be a function in ComponentManager which I don't
                need to override on a per manager basis, but idk
            */
            for (const element in properties) {
                // This doesn't work, throwing error
                    // Uncaught SyntaxError: missing ] after element list
                Function('"use strict"; ' + component + '[' + element + '] = ' + properties + '[' + element + ']')();

                // This works fine, but using eval is slow and dangerous
                // eval("component[element] = properties[element]");
            }
        }
        console.log(this.components);
    }
}