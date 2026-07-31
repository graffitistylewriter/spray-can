/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

ObjectManager.js

Version 2.0

Responsibilities

• Register Engine Objects
• Unregister Objects
• Update Objects
• Destroy Objects

****************************************************************/

export default class ObjectManager {

    constructor() {

        this.objects = [];

    }

    /*=========================================================
        REGISTER
    =========================================================*/

    register(object) {

        if (!object) return;

        this.objects.push(object);

    }

    /*=========================================================
        REMOVE
    =========================================================*/

    unregister(object) {

        this.objects = this.objects.filter(

            item => item !== object

        );

    }

    /*=========================================================
        UPDATE
    =========================================================*/

    update(delta, elapsed) {

        for (const object of this.objects) {

            if (!object) continue;

            if (object.active === false) continue;

            if (typeof object.update !== "function") continue;

            object.update(

                delta,

                elapsed

            );

        }

    }

    /*=========================================================
        DESTROY
    =========================================================*/

    destroy() {

        for (const object of this.objects) {

            if (

                object &&

                typeof object.destroy === "function"

            ) {

                object.destroy();

            }

        }

        this.objects.length = 0;

    }

}