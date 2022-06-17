import { EntityManager } from "./ecs/EntityManager";
import { PhysicsComponentManager } from "./implementations/Components/PhysicsComponent";
import { PositionComponentManager } from "./implementations/Components/PositionComponent";
import { Renderable, RenderableComponentManager } from "./implementations/Components/RenderableComponent";
import { VelocityComponentManager } from "./implementations/Components/VelocityComponent";
import { GravitySystem } from "./implementations/Systems/GravitySystem";
import { RenderSystem } from "./implementations/Systems/RenderSystem";
import { TransformSystem } from "./implementations/Systems/TransformSystem";

const stateChange = setInterval(() => {
    if (document.readyState == 'complete'){
        clearInterval(stateChange);
        main();
    }
}, 20);

const World = new EntityManager();

const PositionManager = new PositionComponentManager();
const PhysicsManager = new PhysicsComponentManager();
const VelocityManager = new VelocityComponentManager();
const RenderManager = new RenderableComponentManager();

const gravity = new GravitySystem(World, [PositionManager, PhysicsManager, VelocityManager]);

const transform = new TransformSystem(World, [PositionManager, VelocityManager]);

const renderSys = new RenderSystem(World, [PositionManager, RenderManager]);

function main() {
    
    // benchmarks();

    const Player = World.createEntity();
    Player.addComponent(PositionManager);
    Player.addComponent(PhysicsManager);
    Player.addComponent(VelocityManager);
    Player.addComponent(RenderManager);
    Player.setComponentProperties(RenderManager, {element: document.querySelector('.Player') as HTMLDivElement});
    // const comp = Player.addComponent(RenderManager) as Renderable;
    // comp.element = document.querySelector('.Player') as HTMLDivElement;

    gameLoop();

}

function gameLoop() {

    gravity.update();

    transform.update();

    renderSys.update();

    requestAnimationFrame(gameLoop);

}