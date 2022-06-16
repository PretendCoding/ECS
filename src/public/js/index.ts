import { EntityManager } from "./ecs/EntityManager";
import { Gravity } from "./implementations/GravitySystem";
import { PhysicsComponentManager } from "./implementations/PhysicsComponent";
import { PositionComponentManager } from "./implementations/PositionComponent";
import { RenderableComponentManager } from "./implementations/RenderableComponent";
import { RenderSystem } from "./implementations/RenderSystem";
import { TransformSystem } from "./implementations/TransformSystem";
import { VelocityComponentManager } from "./implementations/VelocityComponent";

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

const gravity = new Gravity(World, [PositionManager, PhysicsManager, VelocityManager]);

const transform = new TransformSystem(World, [PositionManager, VelocityManager]);

const renderSys = new RenderSystem(World, [PositionManager, RenderManager]);

function main() {
    
    const Player = World.createEntity('Player');
    Player.addComponent(PositionManager);
    Player.addComponent(PhysicsManager);
    Player.addComponent(VelocityManager);
    Player.addComponent(RenderManager);

    gameLoop();

}

function gameLoop() {

    gravity.update();

    transform.update();

    renderSys.update();

    requestAnimationFrame(gameLoop);
}