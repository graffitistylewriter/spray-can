/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

MotionProfile.js

Version 1.0

Canonical Motion Profiles

Responsibilities

• Mechanical Motion
• Easing
• Travel Distance
• Overshoot
• Settle
• Timing

****************************************************************/

const MotionProfile = {

    /*=========================================================
        HERO LIFT
    =========================================================*/

    LIFT: {

        delay: 0.00,

        duration: 1.20,

        distance: 0.12,

        overshoot: 0.01,

        settle: 0.003

    },

    /*=========================================================
        SHOULDER
    =========================================================*/

    SHOULDER: {

        delay: 0.10,

        duration: 1.40,

        distance: 0.16,

        overshoot: 0.02,

        settle: 0.005

    },

    /*=========================================================
        VALVE
    =========================================================*/

    VALVE: {

        delay: 0.18,

        duration: 1.30,

        distance: 0.08,

        overshoot: 0.01,

        settle: 0.002

    },

    /*=========================================================
        INTERNAL
    =========================================================*/

    INTERNAL: {

        delay: 0.35,

        duration: 1.60,

        distance: 0.28,

        overshoot: 0.03,

        settle: 0.008

    },

    /*=========================================================
        SOUL
    =========================================================*/

    SOUL: {

        delay: 0.70,

        duration: 2.20,

        distance: 0.45,

        overshoot: 0.04,

        settle: 0.010

    }

};

export default MotionProfile;