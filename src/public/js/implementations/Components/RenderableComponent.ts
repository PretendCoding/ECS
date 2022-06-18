import { Component } from "../../ecs/Component";
import { ComponentManager } from "../../ecs/ComponentManager";

// export class Renderable extends Component {
//     [element: string]: HTMLElement;

//     constructor() {
//         super();
//         this.element = document.createElement('HTMLElement');
//     }
// }

export interface Renderable extends Component {
    [key: string]: HTMLElement | string;
    element: HTMLElement;
    name: string;
}

const Default: Renderable = {
    element: document.createElement('meta'),
    name: 'DefaultRenderableName'
}

export class RenderableComponentManager extends ComponentManager {
    constructor() {
        super('RenderableComponentManager');
        this.components = new Map<string, Renderable>();
    }
    
    addComponentToEntity(entityId: string): Renderable {
        this.components.set(entityId, Default);
        return this.components.get(entityId) as Renderable;
    }

    // setComponentProperties(entityId: string, properties: Renderable) {
    //     console.log(this.components);
    //     if (this.components.has(entityId)) {
    //         let component = this.components.get(entityId) as Renderable;
    //         /*
    //             If I have to create a setComponentProperties for each manager anyway, I could just do
    //             component.element = properties.element

    //             but that seems very annoying, and I feel like this could be a function in ComponentManager which I don't
    //             need to override on a per manager basis, but idk
    //         */
    //         for (const property in properties) {
    //             if (component.hasOwnProperty(property)) {
    //                 component[property] = properties[property];
    //             } else {
    //                 throw new Error(`${component} does not have property ${property}`)
    //             }
    //         }
    //     }
    //     console.log(this.components);
    // }
}