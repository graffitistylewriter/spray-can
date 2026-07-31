/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

HoverSystem.js

Version 3.0

Hero Idle Motion

Responsibilities

• Float
• Breathing
• Rotation

****************************************************************/

export default class HoverSystem {

    constructor(timeline, sprayCan) {

        this.timeline = timeline;

        this.sprayCan = sprayCan;

        this.time = 0;

    }

    update(delta) {

        this.time += delta;

        const root = this.sprayCan.root;

        /*
        Gentle Float
        */

        root.position.y =

            Math.sin(this.time * 1.15)

            * 0.018;

        /*
        Slow Rotation
        */

        root.rotation.y +=

            delta * 0.22;

        /*
        Soft Breathing

        */

        const scale =

            1 +

            Math.sin(

                this.time * 1.5

            ) * 0.003;

        root.scale.set(

            scale,

            scale,

            scale

        );

    }

    destroy() {}

}