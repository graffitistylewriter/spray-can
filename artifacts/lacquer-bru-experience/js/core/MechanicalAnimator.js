/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

MechanicalAnimator.js

Version 1.0

Mechanical Motion Library

Responsibilities

• Lift
• Lower
• Extend
• Retract
• Rotate
• Smooth Motion
• Shared Animation Behaviour

****************************************************************/

export default class MechanicalAnimator {

    /*=========================================================
        LIFT
    =========================================================*/

    static lift(object, target, speed, delta) {

        if (!object) return;

        object.position.y += (

            target -

            object.position.y

        ) * speed * delta;

    }

    /*=========================================================
        LOWER
    =========================================================*/

    static lower(object, target, speed, delta) {

        if (!object) return;

        object.position.y += (

            target -

            object.position.y

        ) * speed * delta;

    }

    /*=========================================================
        EXTEND
    =========================================================*/

    static extend(object, target, speed, delta) {

        if (!object) return;

        object.position.y += (

            target -

            object.position.y

        ) * speed * delta;

    }

    /*=========================================================
        RETRACT
    =========================================================*/

    static retract(object, target, speed, delta) {

        if (!object) return;

        object.position.y += (

            target -

            object.position.y

        ) * speed * delta;

    }

    /*=========================================================
        ROTATE X
    =========================================================*/

    static rotateX(object, target, speed, delta) {

        if (!object) return;

        object.rotation.x += (

            target -

            object.rotation.x

        ) * speed * delta;

    }

    /*=========================================================
        ROTATE Y
    =========================================================*/

    static rotateY(object, target, speed, delta) {

        if (!object) return;

        object.rotation.y += (

            target -

            object.rotation.y

        ) * speed * delta;

    }

    /*=========================================================
        ROTATE Z
    =========================================================*/

    static rotateZ(object, target, speed, delta) {

        if (!object) return;

        object.rotation.z += (

            target -

            object.rotation.z

        ) * speed * delta;

    }

}