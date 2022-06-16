import { Component } from "./ecs/Component";
import { ComponentManager } from "./ecs/ComponentManager";
import { EntityManager } from "./ecs/EntityManager";

const CREATE = 50000;

const descriptions = {
  create2Comp: 'Create 50,000 entities with two simple components ',
  destroy2Comp: 'Destroy 50,000 entities with two simple components',
  recreating: 'Recreating components now that pool is established',
  rewriteComp: 'Changing the values of each component             ',
};

const times = {
  create2Comp: 0,
  destroy2Comp: 0,
  recreating: 0,
};

function output() {
  console.log(`${descriptions.create2Comp}: ${times.create2Comp.toFixed(2)}ms`);
}

export function benchmarks() {
    let start = 0, end = 0;

    class Test extends Component {
        a = 1;
        b = 2;
    }

    class TestComponentManager extends ComponentManager {
        constructor() {
            super('TestComponentManager');
            this.components = new Map<string, Test>();
        }

        addComponentToEntity(entityId: string) {
            this.components.set(entityId, new Test());
        }
    }

    class Test2 extends Component {
        a = 3;
        b = 4;
    }

    class Test2ComponentManager extends ComponentManager {
        constructor() {
            super('Test2ComponentManager');
            this.components = new Map<string, Test2>();
        }

        addComponentToEntity(entityId: string) {
            this.components.set(entityId, new Test2());
        }
    }

    const World = new EntityManager();

    const TestManager = new TestComponentManager();
    const Test2Manager = new Test2ComponentManager();

    start = performance.now();

    for (let i = 0; i < CREATE; i++) {
        let ent = World.createEntity();
        ent.addComponent(TestManager);
        ent.addComponent(Test2Manager);
    }

    end = performance.now();
    times.create2Comp = end - start;
    output();
}