// import { Component } from "../../ecs/Component";
// import { ComponentManager } from "../../ecs/ComponentManager";

// export class Weapon extends Component {
//     name = 'Weapon Name';
//     damage = 0;
// }

// export class WeaponComponentManager extends ComponentManager{
//     constructor() {
//         super('WeaponComponentManager');
//         this.components = new Map<string, Weapon>();
//     }

//     addComponentToEntity(entityId: string): Weapon {
//         this.components.set(entityId, new Weapon());
//         return this.components.get(entityId) as Weapon;
//     }
// }