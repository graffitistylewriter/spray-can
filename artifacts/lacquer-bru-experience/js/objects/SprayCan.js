/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

SprayCan.js

Version 2.1

Responsibilities

• Create Root
• Create High-Level Hierarchy
• Create Materials
• Create Anchors
• Create Explosion Pivots
• Build Mechanical Assemblies
• Assembly Registry
• Maintain State

Bug Fix (v2.1)

• FIX: Removed the internal AssemblyAnimator creation from
  this constructor. It was constructed without a revealDirector
  argument, causing `this.revealDirector.getStage()` to throw
  TypeError: Cannot read properties of undefined on every
  frame. The canonical AssemblyAnimator is created in
  ExperienceEngine.createObjects() with the correct wiring
  (sprayCan + revealDirector) and updated by AnimationLoop.

• FIX: Removed the broken `this.animator.update()` call from
  update(). The call passed an extra stage argument that
  AssemblyAnimator.update() does not accept, and would have
  crashed immediately after the constructor fix above.

****************************************************************/

import * as THREE from "three";

import EngineObject from "../core/Object3D.js";

import CanMaterials from "../materials/CanMaterials.js";

import BodyAssembly from "../assemblies/BodyAssembly.js";
import TopAssembly from "../assemblies/TopAssembly.js";
import InternalAssembly from "../assemblies/InternalAssembly.js";

export default class SprayCan extends EngineObject {

    constructor(scene) {

        super("SprayCan");

        this.scene = scene;

        this.engine = null;

        /*------------------------------------------------------
        Materials
        ------------------------------------------------------*/

        this.materials = new CanMaterials();

        /*------------------------------------------------------
        Core Structure
        ------------------------------------------------------*/

        this.createHierarchy();

        this.createAnchors();

        this.createPivots();

        /*------------------------------------------------------
        Mechanical Assemblies
        ------------------------------------------------------*/

        this.buildAssemblies();

        this.createAssemblyRegistry();

        /*------------------------------------------------------
        Shared State
        ------------------------------------------------------*/

        this.state = {

            hovering: true,

            exploded: false,

            world: null

        };

        /*------------------------------------------------------
        Add To Scene
        ------------------------------------------------------*/

        this.addTo(scene);

        console.log("✓ SprayCan Initialised");

    }

    /*=========================================================
        BUILD ASSEMBLIES
    =========================================================*/

    buildAssemblies() {

        /*------------------------------------------------------
        Body
        ------------------------------------------------------*/

        this.bodyAssembly = new BodyAssembly(

            this.materials

        );

        this.bodyAssembly.group.name = "BodyAssembly";

        this.parts.body.add(

            this.bodyAssembly.group

        );

        /*------------------------------------------------------
        Top
        ------------------------------------------------------*/

        this.topAssembly = new TopAssembly(

            this.materials

        );

        this.topAssembly.group.name = "TopAssembly";

        this.parts.topAssembly.add(

            this.topAssembly.group

        );

        /*------------------------------------------------------
        Internal
        ------------------------------------------------------*/

        this.internalAssembly = new InternalAssembly(

            this.materials

        );

        this.internalAssembly.group.name = "InternalAssembly";

        this.parts.internal.add(

            this.internalAssembly.group

        );

    }

    /*=========================================================
        ASSEMBLY REGISTRY
    =========================================================*/

    createAssemblyRegistry() {

        this.assemblies = {

            body: this.bodyAssembly.group,

            shell: this.bodyAssembly.parts.shell,

            sleeve: this.bodyAssembly.parts.sleeve,

            bottomRing: this.bodyAssembly.parts.bottomRing,

            bottomCap: this.bodyAssembly.parts.bottomCap,

            shoulder: this.topAssembly.parts.shoulder,

            valveCup: this.topAssembly.parts.valveCup,

            valveStem: this.topAssembly.parts.valveStem,

            nozzle: this.topAssembly.parts.nozzle,

            internal: this.internalAssembly.group,

            paint: this.internalAssembly.parts.paint,

            dipTube: this.internalAssembly.parts.dipTube,

            marble: this.internalAssembly.parts.marble,

            vapour: this.internalAssembly.parts.vapour,

            soul: this.internalAssembly.parts.soul

        };

    }

    /*=========================================================
        GET ASSEMBLY
    =========================================================*/

    getAssembly(name) {

        return this.assemblies?.[name] ?? null;

    }

    /*=========================================================
        HIERARCHY
    =========================================================*/

    createHierarchy() {

        this.root.name = "SprayCan";

        this.parts = {

            interaction: new THREE.Group(),

            shell: new THREE.Group(),

            body: new THREE.Group(),

            topAssembly: new THREE.Group(),

            internal: new THREE.Group()

        };

        this.parts.interaction.name = "InteractionPivot";

        this.parts.shell.name = "Shell";

        this.parts.body.name = "Body";

        this.parts.topAssembly.name = "TopAssembly";

        this.parts.internal.name = "InternalAssembly";

        this.root.add(

            this.parts.interaction

        );

        this.parts.interaction.add(

            this.parts.shell

        );

        this.parts.shell.add(

            this.parts.body

        );

        this.parts.shell.add(

            this.parts.topAssembly

        );

        this.parts.shell.add(

            this.parts.internal

        );

    }

    /*=========================================================
        ANCHORS
    =========================================================*/

    createAnchors() {

        this.anchors = {

            soul: new THREE.Object3D(),

            blueprint: new THREE.Object3D(),

            camera: new THREE.Object3D()

        };

        this.anchors.soul.name = "SoulAnchor";

        this.anchors.blueprint.name = "BlueprintAnchor";

        this.anchors.camera.name = "CameraAnchor";

        this.parts.interaction.add(

            this.anchors.soul

        );

        this.parts.interaction.add(

            this.anchors.blueprint

        );

        this.parts.interaction.add(

            this.anchors.camera

        );

    }

    /*=========================================================
        PIVOTS
    =========================================================*/

    createPivots() {

        this.pivots = {

            shell: new THREE.Object3D(),

            top: new THREE.Object3D(),

            internal: new THREE.Object3D(),

            soul: new THREE.Object3D()

        };

        this.pivots.shell.name = "ShellPivot";

        this.pivots.top.name = "TopPivot";

        this.pivots.internal.name = "InternalPivot";

        this.pivots.soul.name = "SoulPivot";

    }

    /*=========================================================
        ENGINE
    =========================================================*/

    setEngine(engine) {

        this.engine = engine;

    }

    /*=========================================================
        UPDATE

        Animation is handled by dedicated systems/animators:

        • Hover animation    → HoverSystem
        • Explosion reveal   → ExplosionSystem (body separation)
        • Assembly staging   → AssemblyAnimator (top + internals)
        • Soul behaviour     → SoulSystem (future)
        • Blueprint          → BlueprintSystem (future)
        • Navigation         → NavigationSystem (future)

    =========================================================*/

    update(delta, elapsed) {

        if (!this.active) return;

        /*
        SprayCan itself has no per-frame logic at this stage.
        All motion is delegated to the system/animator layer.
        */

    }

    /*=========================================================
        DESTROY
    =========================================================*/

    destroy() {

        this.assemblies = null;

        this.engine = null;

    }

}
