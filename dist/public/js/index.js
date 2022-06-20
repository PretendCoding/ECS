(()=>{"use strict";var e={333:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ComponentManager=void 0,t.ComponentManager=class{constructor(e){this.components=new Map,this.name=e}addComponentToEntity(e){throw new Error(`function addComponentToEntity in ${this.name} should be overridden, and is not`)}setComponentProperties(e,t){if(this.components.has(e)){let n=this.components.get(e);for(const e in t){if(!n.hasOwnProperty(e)){if(n.hasOwnProperty("name"))throw new Error(`${n.name} does not have property ${e}`);throw new Error(`This component does not have a name nor a property ${e}`)}n[e]=t[e]}}}}},180:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Entity=void 0,t.Entity=class{constructor(e){this.id=e}addComponent(e){return e.addComponentToEntity(this.id)}addComponents(e){for(let t of e)this.addComponent(t)}setComponentProperties(e,t){e.setComponentProperties(this.id,t)}addComponent_SetProperties(e,t){this.addComponent(e),this.setComponentProperties(e,t)}addComponents_SetProperties(e,t){if(t.hasOwnProperty("length")){let n=t;if(e.length!==n.length)throw new Error("properties is an array of components, but does not match the size of componentManagers. Did you mean for properties to be a Map<ComponenetManager, Component>?");for(let t=0;t<e.length;t++)e[t].setComponentProperties(this.id,n[t])}if(t.hasOwnProperty("size")){let n=t;for(const t of e)n.has(t)&&t.setComponentProperties(this.id,n.get(t))}}}},125:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EntityManager=void 0;const o=n(180);t.EntityManager=class{constructor(){this.entities=new Map}createEntity(e){if(e||(e=crypto.randomUUID()),this.entities.has(e))throw new Error(`${this} already has an entity called ${e}`);return this.entities.set(e,new o.Entity(e)),this.entities.get(e)}}},533:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.System=void 0,t.System=class{constructor(e,[...t]){this.entityManager=e,this.managersToQuery=new Map,t.forEach((e=>{this.managersToQuery.set(e.name,e)})),this.entities=new Set}populateEntitiesList(){let e=new Map,t=new Set;this.managersToQuery.forEach((t=>{let n=t.components.keys();for(const t of n)if(e.has(t)){let n=e.get(t);n++,e.set(t,n)}else e.set(t,1)}));for(const n of e)n[1]==this.managersToQuery.size&&t.add(n[0]);this.entities=t}refresh(){0==this.entities.size&&this.populateEntitiesList()}init(){}update(e){}}},401:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PhysicsComponentManager=void 0;const o=n(333);class s extends o.ComponentManager{constructor(){super("PhysicsComponentManager"),this.components=new Map}addComponentToEntity(e){return this.components.set(e,{}),this.components.get(e)}}t.PhysicsComponentManager=s},114:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PositionComponentManager=void 0;const o=n(333),s={x:0,y:0};class r extends o.ComponentManager{constructor(){super("PositionComponentManager"),this.components=new Map}addComponentToEntity(e){return this.components.set(e,s),this.components.get(e)}}t.PositionComponentManager=r},235:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RenderableComponentManager=void 0;const o=n(333),s={element:document.createElement("meta"),name:"DefaultRenderableName"};class r extends o.ComponentManager{constructor(){super("RenderableComponentManager"),this.components=new Map}addComponentToEntity(e){return this.components.set(e,s),this.components.get(e)}}t.RenderableComponentManager=r},133:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TimedEventComponentManager=void 0;const o=n(333),s={event:()=>{},name:"DefaultTimedEventName"};class r extends o.ComponentManager{constructor(){super("TimedEventComponentManager"),this.components=new Map}addComponentToEntity(e){return this.components.set(e,s),this.components.get(e)}}t.TimedEventComponentManager=r},173:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TimerComponentManager=t.TimerType=void 0;const o=n(333);var s;(s=t.TimerType||(t.TimerType={}))[s.TIMEOUT=0]="TIMEOUT",s[s.LOOP=1]="LOOP";const r={name:"DefaultTimerName",components:new Array};class a extends o.ComponentManager{constructor(){super("TimerComponentManager"),this.components=new Map}addComponentToEntity(e){return this.components.set(e,r),this.components.get(e)}}t.TimerComponentManager=a},73:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.VelocityComponentManager=void 0;const o=n(333),s={dx:0,dy:0};class r extends o.ComponentManager{constructor(){super("VelocityComponentManager"),this.components=new Map}addComponentToEntity(e){return this.components.set(e,s),this.components.get(e)}}t.VelocityComponentManager=r},898:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GravitySystem=void 0;const o=n(533);class s extends o.System{constructor(e,[...t]){super(e,t)}update(){this.refresh(),this.entities.forEach((e=>{this.managersToQuery.get("VelocityComponentManager").components.get(e).dy+=.1}))}}t.GravitySystem=s},830:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RenderSystem=void 0;const o=n(533);class s extends o.System{constructor(e,[...t]){super(e,t)}update(){this.refresh(),this.entities.forEach((e=>{let t=this.managersToQuery.get("RenderableComponentManager").components.get(e),n=this.managersToQuery.get("PositionComponentManager").components.get(e);t.element.style.top=n.y.toString()+"px"}))}}t.RenderSystem=s},244:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TimerSystem=void 0;const o=n(533);class s extends o.System{constructor(e,[...t]){super(e,t),this.time=0}update(e){let t=e-this.time;this.time+=t,this.refresh(),this.entities.forEach((e=>{let n=this.managersToQuery.get("TimerComponentManager"),o=this.managersToQuery.get("TimedEventComponentManager"),s=n.components.get(e),r=o.components.get(e),a=s.components[0].frequency,i=r.event;(this.time%a>a-t/2||this.time%a<t/2)&&i()}))}}t.TimerSystem=s},428:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TransformSystem=void 0;const o=n(533);class s extends o.System{constructor(e,[...t]){super(e,t)}update(){this.refresh(),this.entities.forEach((e=>{let t=this.managersToQuery.get("PositionComponentManager"),n=this.managersToQuery.get("VelocityComponentManager"),o=t.components.get(e),s=n.components.get(e);o.y+=s.dy}))}}t.TransformSystem=s}},t={};function n(o){var s=t[o];if(void 0!==s)return s.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}(()=>{const e=n(125),t=n(401),o=n(114),s=n(235),r=n(133),a=n(173),i=n(73),p=n(898),m=n(830),c=n(244),d=n(428),h=setInterval((()=>{"complete"==document.readyState&&(clearInterval(h),function(){const e=y.createEntity();e.addComponents([u,l,g,M]),e.setComponentProperties(M,{element:document.querySelector(".Player")}),_(0)}())}),20),y=new e.EntityManager,u=new o.PositionComponentManager,l=new t.PhysicsComponentManager,g=new i.VelocityComponentManager,M=new s.RenderableComponentManager,C=new a.TimerComponentManager,f=new r.TimedEventComponentManager,v=new p.GravitySystem(y,[u,l,g]),T=new d.TransformSystem(y,[u,g]),w=new m.RenderSystem(y,[u,M]),P=new c.TimerSystem(y,[C,f]),E=y.createEntity("BallSpawner");function _(e){v.update(),T.update(),w.update(),P.update(e),requestAnimationFrame(_)}E.addComponents([C,f]),E.setComponentProperties(C,{name:"SpawnBall",frequency:1500}),E.setComponentProperties(f,{name:"SpawnBall",event:()=>{console.log("Hello Timer!")}})})()})();