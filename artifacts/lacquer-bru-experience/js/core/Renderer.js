/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

Renderer.js

Version 0.1

Responsibilities

• Create WebGL Renderer
• Configure Renderer
• Tone Mapping
• Colour Space
• Resize
• Render Scene

NO Camera Logic
NO Scene Logic
NO Animation

****************************************************************/

import * as THREE from "three";

export default class RendererManager {

    constructor(canvas, scene, camera) {

        this.canvas = canvas;
        this.scene = scene;
        this.camera = camera;

        this.createRenderer();

        this.resize();

        window.addEventListener(

            "resize",

            () => this.resize()

        );

        console.log("✓ Renderer Created");

    }

    /*=========================================================

        CREATE RENDERER

    =========================================================*/

    createRenderer() {

        this.renderer = new THREE.WebGLRenderer({

            canvas: this.canvas,

            antialias: true,

            alpha: true,

            powerPreference: "high-performance"

        });

        /*
        ------------------------------------------------------

        Colour Management

        ------------------------------------------------------
        */

        this.renderer.outputColorSpace =
            THREE.SRGBColorSpace;

        /*
        ------------------------------------------------------

        Tone Mapping

        ------------------------------------------------------
        */

        this.renderer.toneMapping =
            THREE.ACESFilmicToneMapping;

        this.renderer.toneMappingExposure = 1.0;

        /*
        ------------------------------------------------------

        Pixel Ratio

        Limit to 2 for performance

        ------------------------------------------------------
        */

        this.renderer.setPixelRatio(

            Math.min(

                window.devicePixelRatio,

                2

            )

        );

        /*
        ------------------------------------------------------

        Physically Correct Lighting

        ------------------------------------------------------
        */

        this.renderer.useLegacyLights = false;

        /*
        ------------------------------------------------------

        Shadows

        Disabled for Version 0.1

        We'll enable once the real can model
        is introduced.

        ------------------------------------------------------
        */

        this.renderer.shadowMap.enabled = false;

        this.renderer.shadowMap.type =
            THREE.PCFSoftShadowMap;

    }

    /*=========================================================

        RENDER

    =========================================================*/

    render() {

        this.renderer.render(

            this.scene,

            this.camera

        );

    }

    /*=========================================================

        RESIZE

    =========================================================*/

    resize() {

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        this.renderer.setPixelRatio(

            Math.min(

                window.devicePixelRatio,

                2

            )

        );

    }

}