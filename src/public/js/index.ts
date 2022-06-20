//Required Imports
import { EntityManager } from "./ecs/EntityManager";
import { PhysicsComponentManager } from "./implementations/Components/PhysicsComponent";
import { PositionComponentManager } from "./implementations/Components/PositionComponent";
import { RenderableComponentManager } from "./implementations/Components/RenderableComponent";
import { TimedEventComponentManager } from "./implementations/Components/TimedEventComponent";
import { TimerComponentManager } from "./implementations/Components/TimerComponent";
import { VelocityComponentManager } from "./implementations/Components/VelocityComponent";
import { GravitySystem } from "./implementations/Systems/GravitySystem";
import { RenderSystem } from "./implementations/Systems/RenderSystem";
import { TimerSystem } from "./implementations/Systems/TimerSystem";
import { TransformSystem } from "./implementations/Systems/TransformSystem";

const stateChange = setInterval(() => {
    if (document.readyState == 'complete'){
        clearInterval(stateChange);
        main();
    }
}, 20);

// Create World/Entity Manager
const World = new EntityManager();

// Create component managers
const PositionManager = new PositionComponentManager();
const PhysicsManager = new PhysicsComponentManager();
const VelocityManager = new VelocityComponentManager();
const RenderManager = new RenderableComponentManager();
const TimerManager = new TimerComponentManager();
const TimedEventManager = new TimedEventComponentManager();

// Create systems
const gravity = new GravitySystem(World, [PositionManager, PhysicsManager, VelocityManager]);
const transform = new TransformSystem(World, [PositionManager, VelocityManager]);
const renderSys = new RenderSystem(World, [PositionManager, RenderManager]);
const timerSystem = new TimerSystem(World, [TimerManager, TimedEventManager]);


// Create the ball spawner
const BallSpawner = World.createEntity('BallSpawner');
BallSpawner.addComponents([TimerManager, TimedEventManager]);
BallSpawner.setComponentProperties(TimerManager, {name:"SpawnBall", frequency: 1500});
BallSpawner.setComponentProperties(TimedEventManager, {name: "SpawnBall", event: () => { console.log('Hello Timer!')}});

// Function run on document.readyState == 'complete'
function main() {
    
    // benchmarks();

    const Player = World.createEntity();
    Player.addComponents([PositionManager, PhysicsManager, VelocityManager, RenderManager]);
    Player.setComponentProperties(RenderManager, {element: document.querySelector('.Player') as HTMLDivElement});

    gameLoop(0);

}

// Gameloop..duh
function gameLoop(tick: number) {

    gravity.update();

    transform.update();

    renderSys.update();

    timerSystem.update(tick);

    requestAnimationFrame(gameLoop);

}