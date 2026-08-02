import * as THREE from "three";

const clampPhase = (progress, start, end) => {

    const normalized = THREE.MathUtils.clamp(

        (progress - start) / (end - start),

        0,

        1

    );

    return normalized * normalized * (3 - 2 * normalized);

};

const setTransform = (object, amount, position, rotation) => {

    object.position.set(

        position.x * amount,

        position.y * amount,

        position.z * amount

    );

    object.rotation.set(

        rotation.x * amount,

        rotation.y * amount,

        rotation.z * amount

    );

};

export default class AssemblyAnimator {

    constructor(sprayCan, revealDirector) {

        this.sprayCan = sprayCan;

        this.revealDirector = revealDirector;

    }

    update() {

        if (!this.sprayCan || !this.revealDirector) return;

        const progress = this.revealDirector.getProgress();

        const prepare = clampPhase(progress, 0.08, 0.22);

        const release = clampPhase(progress, 0.18, 0.62);

        const internals = clampPhase(progress, 0.40, 0.76);

        const finalise = clampPhase(progress, 0.62, 0.92);

        const parts = this.sprayCan;

        parts.parts.interaction.position.y = 0.14 * prepare;

        const body = parts.bodyAssembly.parts;

        setTransform(

            body.shell,

            release,

            { x: -0.18, y: -0.26, z: 0.02 },

            { x: -0.08, y: 0.10, z: 0.24 }

        );

        setTransform(

            body.sleeve,

            release,

            { x: -0.18, y: -0.26, z: 0.02 },

            { x: -0.08, y: 0.10, z: 0.24 }

        );

        setTransform(

            body.bottomRing,

            finalise,

            { x: 0.52, y: -0.18, z: 0.08 },

            { x: 0.38, y: -0.20, z: -0.42 }

        );

        setTransform(

            body.bottomCap,

            finalise,

            { x: 0.56, y: -0.22, z: 0.12 },

            { x: 0.46, y: 0.28, z: -0.46 }

        );

        const top = parts.topAssembly.parts;

        setTransform(

            top.shoulder,

            release,

            { x: 0.06, y: 0.42, z: 0.01 },

            { x: 0.12, y: -0.16, z: -0.12 }

        );

        setTransform(

            top.valveCup,

            clampPhase(progress, 0.28, 0.68),

            { x: 0.12, y: 0.76, z: 0.02 },

            { x: 0.16, y: 0.18, z: -0.16 }

        );

        setTransform(

            top.valveStem,

            clampPhase(progress, 0.34, 0.72),

            { x: 0.18, y: 1.02, z: 0.04 },

            { x: 0.22, y: 0.22, z: -0.18 }

        );

        const nozzleRelease = clampPhase(progress, 0.40, 0.78);

        setTransform(

            top.nozzle,

            nozzleRelease,

            { x: 0.28, y: 1.34, z: 0.10 },

            { x: 0.34, y: Math.PI * 2.5, z: -0.32 }

        );

        const internalsParts = parts.internalAssembly.parts;

        setTransform(

            internalsParts.dipTube,

            internals,

            { x: 0.62, y: -0.12, z: 0.12 },

            { x: 0.08, y: -0.22, z: 0.52 }

        );

        setTransform(

            internalsParts.marble,

            clampPhase(progress, 0.48, 0.82),

            { x: 0.58, y: 0.36, z: 0.16 },

            { x: Math.PI * 1.5, y: Math.PI * 2.0, z: Math.PI }

        );

        internalsParts.paint.scale.setScalar(1 - finalise * 0.16);

    }

}
