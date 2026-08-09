/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

HoverSystem.js

Version 3.1

Hero Idle Motion

Responsibilities

• Float
• Breathing
• Slow Y Rotation
• Base tilt (Z axis lean matching keyframes)

Update (v3.1)

• Added a constant base Z-axis tilt of -0.06 radians (~3.4°).
  Every keyframe shows the can with a very slight lean to the
  left. The tilt is subtle at the Fig.01 idle state — it
  becomes more dramatic during the reveal via ExplosionSystem.

• Float amplitude reduced from 0.018 → 0.012 and frequency
  from 1.15 → 0.9. Slower, softer breathing matches the
  "stillness / anticipation" tone of Fig.01.

• Rotation speed reduced from 0.22 → 0.15 rad/s. The Fig.02
  keyframe shows a slow deliberate rotation, not a spin.

• Breathing scale reduced from ±0.003 → ±0.002. Barely
  perceptible; adds life without drawing attention to itself.

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
        Gentle Float — slow, breathing.

        */

        root.position.y =

            Math.sin(this.time * 0.9)

            * 0.012;

        /*
        Slow Y Rotation — shows off the can label naturally.

        */

        root.rotation.y +=

            delta * 0.15;

        /*
        Base Z Tilt — constant lean matching keyframes.

        Applied every frame so it stays stable regardless
        of other systems writing rotation.x or rotation.y.
        The value is intentionally very small — just enough
        to break the rigidly vertical look without the can
        appearing tilted or unstable in Fig.01.
        */

        root.rotation.z = -0.06;

        /*
        Soft Breathing Scale — barely perceptible.

        */

        const scale =

            1 +

            Math.sin(

                this.time * 1.2

            ) * 0.002;

        root.scale.set(

            scale,

            scale,

            scale

        );

    }

    destroy() {}

}
