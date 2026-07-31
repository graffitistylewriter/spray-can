/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

Object3D.js

Version 1.0

Base Class

Every object inside the Experience Engine
inherits from this class.

Responsibilities

• Root Group
• Scene Helpers
• Visibility
• Active State
• Transform Helpers
• Animation Hooks
• Future Event Hooks

****************************************************************/

import * as THREE from "three";

export default class EngineObject {

    constructor(name = "EngineObject") {

        /*------------------------------------------------------
        Root Object
        ------------------------------------------------------*/

        this.root = new THREE.Group();
        this.root.name = name;

        /*------------------------------------------------------
        Metadata
        ------------------------------------------------------*/

        this.name = name;

        this.active = true;
        this.visible = true;

        /*------------------------------------------------------
        Future Hierarchy

        Every production object should expose these collections.

        ------------------------------------------------------*/

        this.parts = {};
        this.anchors = {};
        this.pivots = {};
        this.helpers = {};

    }

    /*=========================================================

        Scene

    =========================================================*/

    addTo(scene) {

        scene.add(this.root);

        return this;

    }

    removeFrom(scene) {

        scene.remove(this.root);

        return this;

    }

    /*=========================================================

        Visibility

    =========================================================*/

    show() {

        this.visible = true;

        this.root.visible = true;

        return this;

    }

    hide() {

        this.visible = false;

        this.root.visible = false;

        return this;

    }

    /*=========================================================

        Enable / Disable

    =========================================================*/

    enable() {

        this.active = true;

        return this;

    }

    disable() {

        this.active = false;

        return this;

    }

    /*=========================================================

        Position

    =========================================================*/

    setPosition(x = 0, y = 0, z = 0) {

        this.root.position.set(x, y, z);

        return this;

    }

    getPosition() {

        return this.root.position;

    }

    /*=========================================================

        Rotation

    =========================================================*/

    setRotation(x = 0, y = 0, z = 0) {

        this.root.rotation.set(x, y, z);

        return this;

    }

    getRotation() {

        return this.root.rotation;

    }

    /*=========================================================

        Scale

    =========================================================*/

    setScale(x = 1, y = x, z = x) {

        this.root.scale.set(x, y, z);

        return this;

    }

    /*=========================================================

        Child Helpers

    =========================================================*/

    add(child) {

        this.root.add(child);

        return child;

    }

    remove(child) {

        this.root.remove(child);

    }

    /*=========================================================

        Find Part

    =========================================================*/

    getPart(name) {

        return this.parts[name] ?? null;

    }

    /*=========================================================

        Find Anchor

    =========================================================*/

    getAnchor(name) {

        return this.anchors[name] ?? null;

    }

    /*=========================================================

        Update

        Override

    =========================================================*/

    update(delta, elapsed) {

        if (!this.active) return;

    }

    /*=========================================================

        Dispose

        Override when required.

    =========================================================*/

    dispose() {

        this.root.traverse((child) => {

            if (child.geometry) {

                child.geometry.dispose();

            }

            if (child.material) {

                if (Array.isArray(child.material)) {

                    child.material.forEach(m => m.dispose());

                } else {

                    child.material.dispose();

                }

            }

        });

    }

}