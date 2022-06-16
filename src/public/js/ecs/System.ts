import { ComponentManager } from "./ComponentManager";
import { EntityManager } from "./EntityManager";

export class System {
    managersToQuery: Map<string, ComponentManager>;
    entities: Set<string>;
    entityManager: EntityManager;

    constructor(entityManager: EntityManager, [...managers]: Array<ComponentManager>) {
        this.entityManager = entityManager;
        this.managersToQuery = new Map<string, ComponentManager>();
        managers.forEach(manager => {
            this.managersToQuery.set(manager.name, manager);
        });
        this.entities = new Set<string>();
    }

    populateEntitiesList() {
        let ids = new Map<string, number>();
        let entities = new Set<string>();
        this.managersToQuery.forEach(manager => {
            let entityIds = manager.components.keys();
            for (const id of entityIds) {
                if (ids.has(id)) {
                    let count = ids.get(id) as number;
                    count++;
                    ids.set(id, count);
                } else {
                    ids.set(id, 1);
                }
            }
        });
        for (const id of ids) {
            if (id[1] == this.managersToQuery.size) {
                entities.add(id[0]);
            }
        }
        this.entities = entities;  
    }

    refresh() {
        if (this.entities.size == 0) {
            this.populateEntitiesList();
        }
    }

    init() {}

    update() {}
}