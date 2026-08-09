/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

LightingSystem.js

Version 2.1

Studio Lighting System

Responsibilities

• Ambient Fill
• Key Light (top-centre stage spotlight)
• Rim Light (hard chrome edge from behind)
• Soul Fill (blue-tinted sub-fill for soul glow prep)

Update (v2.1)

Reworked to match the dark dramatic studio lighting in the
keyframe references:

• Ambient pulled way down (0.45 → 0.08) — the keyframes
  are near-total darkness with a single spotlight. High
  ambient washes out the depth and kills the matte-body /
  chrome-shoulder contrast that makes the can read.

• Key light moved to dead-centre top (0, 10, 4) at higher
  intensity (3.0 → 4.5). This matches the single overhead
  stage spotlight in Fig.01 that bleaches the top of the
  shoulder dome and falls off fast into shadow on the body.

• Rim light strengthened and repositioned directly behind
  the can (-4, 2, -6) at a cool-white colour. This defines
  the chrome shoulder edge in Fig.01/02 — that bright ring
  that separates the shoulder from the dark body.

• Added a blue-tinted point light at the valve area (0, 0.6, 2)
  at very low intensity (0.08). This is the precursor to
  the soul glow that ignites in Fig.04. It keeps the inner
  area from going completely cold before the reveal.

• Removed the generic "TopStrip" light — it was duplicating
  the key light and flattening the shadow gradient.

****************************************************************/

import * as THREE from "three";

export default class LightingSystem {

    constructor(scene) {

        this.scene = scene;

        this.group = new THREE.Group();

        this.group.name = "StudioLighting";

        this.build();

        this.scene.add(this.group);

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        /*------------------------------------------------------
        Ambient — minimal fill only.
        Enough to keep shadows from going pure black.
        ------------------------------------------------------*/

        const ambient = new THREE.AmbientLight(

            0x1a1e28,

            0.08

        );

        ambient.name = "Ambient";

        this.group.add(ambient);

        /*------------------------------------------------------
        Key Light — single overhead studio spot.
        Replicates the dramatic top spotlight seen in all
        keyframes. Falls hard and fast down the can body.
        ------------------------------------------------------*/

        const key = new THREE.DirectionalLight(

            0xffffff,

            4.5

        );

        key.position.set(

            0,

            10,

            4

        );

        key.castShadow = true;

        key.shadow.mapSize.set(

            2048,

            2048

        );

        key.shadow.camera.near = 0.5;

        key.shadow.camera.far = 50;

        key.shadow.bias = -0.0005;

        key.name = "KeyLight";

        this.group.add(key);

        /*------------------------------------------------------
        Rim Light — hard chrome edge definition.
        Positioned behind-left to create the bright ring on
        the shoulder dome visible in Fig.01 and Fig.02.
        Cool white to match the chrome material.
        ------------------------------------------------------*/

        const rim = new THREE.DirectionalLight(

            0xd0e4ff,

            2.8

        );

        rim.position.set(

            -4,

            2,

            -6

        );

        rim.name = "RimLight";

        this.group.add(rim);

        /*------------------------------------------------------
        Soul Fill — very soft blue point light near valve area.
        Pre-conditions the inner chrome for the soul glow
        reveal. Barely visible at rest; the SoulSystem will
        animate its intensity upward in Fig.04.
        ------------------------------------------------------*/

        this.soulLight = new THREE.PointLight(

            0x4dc8ff,

            0.08,

            3.0

        );

        this.soulLight.position.set(

            0,

            0.6,

            0.5

        );

        this.soulLight.name = "SoulFill";

        this.group.add(this.soulLight);

        /*------------------------------------------------------
        Subtle front fill — keeps label text legible in hero.
        Very low intensity, slightly warm.
        ------------------------------------------------------*/

        const frontFill = new THREE.DirectionalLight(

            0xfff5e8,

            0.35

        );

        frontFill.position.set(

            1,

            1,

            8

        );

        frontFill.name = "FrontFill";

        this.group.add(frontFill);

    }

    /*=========================================================
        UPDATE

        Soul intensity can be animated here by
        AssemblyAnimator/SoulSystem in a future pass.
    =========================================================*/

    update() {}

    /*=========================================================
        SOUL GLOW API

        Called by SoulSystem when Fig.04 stage activates.
    =========================================================*/

    setSoulIntensity(value) {

        if (this.soulLight) {

            this.soulLight.intensity = value;

        }

    }

    destroy() {

        this.scene.remove(

            this.group

        );

    }

}
