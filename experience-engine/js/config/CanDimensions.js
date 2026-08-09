/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

CanDimensions.js

Version 1.1

Canonical Spray Can Dimensions

Single Source Of Truth

Based on Montana Gold 400ml blueprint reference:
Height 195mm, Diameter 66mm, Scale 1 unit ≈ 33mm

Update (v1.1)

• SHOULDER_HEIGHT raised 0.180 → 0.420 to match the
  prominent chrome dome visible in all keyframe references.
  The previous value produced a barely-visible flat taper.

• Added CAP_RADIUS and CAP_HEIGHT for the new ActuatorCap
  part. Blueprint: Ø27.5mm cap = 0.205 radius in scene units.

• Added NOZZLE_RADIUS_OUTER, NOZZLE_RADIUS_INNER, and
  NOZZLE_HEIGHT_TOTAL for the fat-cap nozzle rebuild.

****************************************************************/

const CanDimensions = {

    /*=========================================================
        BODY
    =========================================================*/

    BODY_RADIUS: 0.495,

    BODY_HEIGHT: 2.10,

    LABEL_RADIUS: 0.4985,

    LABEL_HEIGHT: 1.82,

    /*=========================================================
        SHOULDER

        Raised from 0.180 → 0.420 to match keyframe dome.
    =========================================================*/

    SHOULDER_RADIUS: 0.495,

    SHOULDER_HEIGHT: 0.420,

    /*=========================================================
        CAP (Actuator / Protective Cap)

        Blueprint: Ø27.5mm = 0.205 scene-unit radius.
        23mm real height = 0.250 scene units.
    =========================================================*/

    CAP_RADIUS: 0.205,

    CAP_HEIGHT: 0.220,

    /*=========================================================
        VALVE
    =========================================================*/

    VALVE_CUP_RADIUS: 0.145,

    VALVE_CUP_HEIGHT: 0.045,

    STEM_RADIUS: 0.024,

    STEM_HEIGHT: 0.135,

    /*=========================================================
        NOZZLE (Fat Cap)

        Rebuilt as two-tier fat-cap matching reference photos.
    =========================================================*/

    NOZZLE_RADIUS_BASE: 0.115,

    NOZZLE_RADIUS_TOP: 0.090,

    NOZZLE_HEIGHT_BASE: 0.072,

    NOZZLE_HEIGHT_TOP: 0.058,

    /* Legacy alias kept for compatibility */

    NOZZLE_HEIGHT: 0.072,

    /*=========================================================
        BOTTOM
    =========================================================*/

    BOTTOM_RING_RADIUS: 0.463,

    BOTTOM_RING_THICKNESS: 0.024,

    BOTTOM_CAP_RADIUS: 0.468,

    /*=========================================================
        INTERNALS
    =========================================================*/

    PAINT_RADIUS: 0.430,

    PAINT_HEIGHT: 1.72,

    DIP_TUBE_RADIUS: 0.018,

    DIP_TUBE_HEIGHT: 1.62,

    MARBLE_RADIUS: 0.085

};

export default CanDimensions;
