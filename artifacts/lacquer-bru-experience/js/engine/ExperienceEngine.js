/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

ExperienceEngine.js

Version 3.1

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

Bug Fixes (v3.1)

• FIX: createRenderer() now passes the HTML canvas element
  (#engine-canvas) to RendererManager instead of width/height
  numbers. Three.js was silently creating its own off-screen
  canvas and rendering to it, leaving #engine-canvas blank.

• FIX: Added `is-ready` CSS class to the container after
  build() completes. engine.css hides #engine-canvas with
  opacity:0 until this class is present — without it the
  canvas was invisible even when rendering correctly.

• FIX: Added a scroll event listener that maps window.scrollY
  to RevealDirector progress [0,1]. Previously onScroll()
  existed on InteractionController but was never called.

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
import SoulSystem from "../systems/SoulSystem.js";
import WorldNavigationSystem from "../systems/WorldNavigationSystem.js";
import AssemblyAnimator from "../core/AssemblyAnimator.js";

export default class ExperienceEngine {

    constructor(options = {}) {

        console.log("=======================================");
        console.log(" Lacquer Bru Experience Engine");
        console.log(" Version 3.1");
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

        /*------------------------------------------------------
        FIX: Mark engine as ready so CSS reveals the canvas.
        engine.css keeps #engine-canvas at opacity:0 until
        the container receives this class.
        ------------------------------------------------------*/

        this.container.classList.add('is-ready');

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

        FIX: Pass the actual #engine-canvas DOM element and the
        already-created scene/camera to RendererManager.
        Previously this passed (this.width, this.height) —
        numbers — which Three.js ignored, causing it to create
        a second, invisible canvas instead of using the one
        declared in index.html.
    =========================================================*/

    createRenderer() {

        const canvas =
            this.container.querySelector('#engine-canvas');

        this.rendererManager =
            new RendererManager(

                canvas,

                this.scene,

                this.camera

            );

        this.renderer =
            this.rendererManager.renderer;

        /*
        Do NOT call this.container.appendChild(renderer.domElement)
        here. The canvas is already in the DOM via index.html.
        Appending again would create a second canvas on top.
        */

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

        this.soulSystem = new SoulSystem(

            this.sprayCan,

            this.revealDirector,

            this.lightingSystem

        );

        this.systemManager.register(

            this.soulSystem

        );

        this.worldNavigationSystem = new WorldNavigationSystem(

            this,

            this.revealDirector

        );

        this.systemManager.register(

            this.worldNavigationSystem

        );

        //----------------------------------------
        // Future Systems
        //----------------------------------------

        /*
            BlueprintSystem
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

        FIX: Added scroll listener that maps window.scrollY
        to a [0,1] progress value and forwards it to
        InteractionController → RevealDirector.
        Previously onScroll() existed but was never called.
    =========================================================*/

    registerEvents() {

        window.addEventListener(

            "resize",

            () => this.resize()

        );

        window.addEventListener(

            "scroll",

            () => {

                const maxScroll =
                    document.documentElement.scrollHeight -
                    window.innerHeight;

                if (maxScroll <= 0) return;

                const progress = window.scrollY / maxScroll;

                if (this.interactionController) {

                    this.interactionController.onScroll(

                        progress

                    );

                }

            },

            { passive: true }

        );

        /*------------------------------------------------------
        BEGIN button — triggers autoplay
        ------------------------------------------------------*/

        const beginBtn =
            this.container.querySelector('#begin-btn');

        if (beginBtn) {

            beginBtn.addEventListener('click', () => {

                if (this.interactionController) {

                    this.interactionController.onCTA();

                }

            });

        }

        const replayBtn =
            this.container.querySelector('#replay-btn');

        if (replayBtn) {

            replayBtn.addEventListener('click', () => {

                this.interactionController?.reset();

                window.scrollTo({ top: 0, behavior: 'smooth' });

            });

        }

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
