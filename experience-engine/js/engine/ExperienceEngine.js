/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

ExperienceEngine.js

Version 3.0

Application Controller

Responsibilities

• Build Engine
• Create Scene
• Create Camera
• Create Renderer
• Create Timeline
• Create Engine Objects
• Register Systems
• Start Animation Loop
• Handle Resize
• Public API

****************************************************************/

import * as THREE from "three";
import SceneManager from "../core/Scene.js";
import CameraManager from "../core/Camera.js";
import RendererManager from "../core/Renderer.js";
import AnimationLoop from "../core/AnimationLoop.js";
import Timeline from "../core/Timeline.js";
import RevealDirector from "../core/RevealDirector.js";
import InteractionController from "../core/InteractionController.js";
import Stage from "../core/Stage.js";
import SystemManager from "../core/SystemManager.js";
import ObjectManager from "../core/ObjectManager.js";
import SprayCan from "../objects/SprayCan.js";
import HoverSystem from "../systems/HoverSystem.js";
import MouseController from "../core/MouseController.js";
import ExplosionSystem from "../systems/ExplosionSystem.js";
import LightingSystem from "../systems/LightingSystem.js";
import EnvironmentSystem from "../systems/EnvironmentSystem.js";
import AssemblyAnimator from "../core/AssemblyAnimator.js";

export default class ExperienceEngine {

    constructor(options = {}) {

        console.log("=======================================");
        console.log(" Lacquer Bru Experience Engine");
        console.log(" Version 3.0");
        console.log("=======================================");

        this.options = options;

        this.container =
            options.container || document.body;

        this.width =
            this.container.clientWidth;

        this.height =
            this.container.clientHeight;

        this.clock =
            new THREE.Clock();

        this.build();

    }

    /*=========================================================
        BUILD ENGINE
    =========================================================*/

    build() {

        this.createScene();

        this.createCamera();

        this.createRenderer();

        this.createTimeline();

        this.createObjects();

        this.createSystems();

        this.start();

        this.registerEvents();

    }

    /*=========================================================
        Scene
    =========================================================*/

    createScene() {

        this.sceneManager =
            new SceneManager();

        this.scene =
            this.sceneManager.scene;

    }

    /*=========================================================
        Camera
    =========================================================*/

    createCamera() {

        this.cameraManager =
            new CameraManager(

                this.width,

                this.height

            );

        this.camera =
            this.cameraManager.camera;

    }

    /*=========================================================
        Renderer
    =========================================================*/

    createRenderer() {

        this.rendererManager =
            new RendererManager(

                this.width,

                this.height

            );

        this.renderer =
            this.rendererManager.renderer;

        this.container.appendChild(

            this.renderer.domElement

        );

    }

    /*=========================================================
        Timeline
    =========================================================*/

    createTimeline() {

        this.timeline = new Timeline();

        this.revealDirector =

            new RevealDirector();

        this.interactionController =

            new InteractionController(

                this

            );

        this.assemblyAnimator = null;

        this.revealDirector.setStage(

            Stage.IDLE

        );

    }

    /*=========================================================
        Objects
    =========================================================*/

    createObjects() {

        this.objectManager =
            new ObjectManager();

        this.sprayCan =
            new SprayCan(

                this.scene

            );

        this.sprayCan.setEngine(

            this

        );

        this.objectManager.register(

            this.sprayCan

        );

        this.assemblyAnimator =

            new AssemblyAnimator(

                this.sprayCan,

                this.revealDirector

            );

    }

        /*=========================================================
        Systems
    =========================================================*/

    createSystems() {

        this.systemManager =
            new SystemManager();

        //----------------------------------------
        // Hover
        //----------------------------------------

        this.hoverSystem =
            new HoverSystem(

                this.timeline,

                this.sprayCan

            );

        this.systemManager.register(

            this.hoverSystem

        );

        //----------------------------------------
        // Mouse
        //----------------------------------------

        this.mouseController =
            new MouseController(

                this

            );

        this.systemManager.register(

            this.mouseController

        );

        //----------------------------------------
        // Explosion
        //----------------------------------------

        this.explosionSystem =
            new ExplosionSystem(

                this.timeline,

                this.sprayCan,

                this.revealDirector

            );

        this.systemManager.register(

            this.explosionSystem

        );

        //----------------------------------------
        // Lighting
        //----------------------------------------

        this.lightingSystem =
            new LightingSystem(

                this.scene

            );

        this.systemManager.register(

            this.lightingSystem

        );

        //----------------------------------------
        // Environment
        //----------------------------------------

        this.environmentSystem =
            new EnvironmentSystem(

                this.scene,

                this.renderer

            );

        this.systemManager.register(

            this.environmentSystem

        );

        //----------------------------------------
        // Future Systems
        //----------------------------------------

        /*
            BlueprintSystem

            NavigationSystem

            SoulSystem
        */

    }

    /*=========================================================
        START
    =========================================================*/

    start() {

        this.loop =
            new AnimationLoop(

                this

            );

        this.loop.start();

    }

    /*=========================================================
        EVENTS
    =========================================================*/

    registerEvents() {

        window.addEventListener(

            "resize",

            () => this.resize()

        );

    }

    /*=========================================================
        RESIZE
    =========================================================*/

    resize() {

        this.width =
            this.container.clientWidth;

        this.height =
            this.container.clientHeight;

        this.cameraManager.resize(

            this.width,

            this.height

        );

        this.rendererManager.resize(

            this.width,

            this.height

        );

    }

        /*=========================================================
        PUBLIC API
    =========================================================*/

    play() {

        this.timeline.play(

            "hover"

        );

    }

    startExperience() {

        this.interactionController.startExperience();

    }

    expand() {

        this.setStage(

            Stage.INTERNAL_REVEAL

        );

    }

    collapse() {

        this.setStage(

            Stage.IDLE

        );

    }

    enterWorld(name) {

        console.log(

            "Entering World:",

            name

        );

    }

    /*=========================================================
        REVEAL API
    =========================================================*/

    setStage(stage) {

        if (!this.revealDirector) return;

        this.revealDirector.setStage(

            stage

        );

    }

    getStage() {

        if (!this.revealDirector) {

            return Stage.IDLE;

        }

        return this.revealDirector.getStage();

    }

    /*=========================================================
        DESTROY
    =========================================================*/

    destroy() {

        if (this.loop) {

            this.loop.stop();

        }

        if (this.systemManager) {

            this.systemManager.destroy();

        }

        if (this.objectManager) {

            this.objectManager.destroy();

        }

        if (this.mouseController) {

            this.mouseController.destroy();

        }

        if (

            this.interactionController

        ) {

            this.interactionController.disable();

        }

        window.removeEventListener(

            "resize",

            this.resize

        );

    }

}