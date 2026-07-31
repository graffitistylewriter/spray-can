# Lacquer Bru — Experience Engine

A scroll-driven interactive 3D spray can landing page for **Lacquer Bru** — a South African creative studio specialising in graffiti murals, branding, design, and web development. The can explodes on scroll to reveal its internal components (valve, dip tube, mixing marble, paint reservoir, shoulder dome, nozzle) as a portfolio/brand statement.

## Run & Operate

- `pnpm --filter @workspace/lacquer-bru-experience run dev` — run the experience (served at `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000, served at `/api`)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Experience Engine: Plain HTML/JS/CSS + Three.js r185 (served via Vite dev server)
- 3D: Three.js WebGL with MeshPhysicalMaterial, custom geometry built entirely in JS (no external 3D models)
- Scroll animation: native `window.scroll` → RevealDirector → stage-based AssemblyAnimator
- API: Express 5 (for future backend features)
- DB: PostgreSQL + Drizzle ORM (future)

## Where things live

```
artifacts/lacquer-bru-experience/   ← The 3D experience (served at /)
├── index.html                      ← Page entry point
├── css/
│   ├── layout.css                  ← Global layout, scroll spacer, fixed container
│   └── engine.css                  ← Canvas states, is-ready fade-in, utility classes
└── js/
    ├── main.js                     ← Bootstrap
    ├── engine/ExperienceEngine.js  ← Master orchestrator
    ├── core/                       ← Scene, Camera, Renderer, AnimationLoop, RevealDirector, etc.
    ├── objects/SprayCan.js         ← Can hierarchy + assemblies
    ├── assemblies/                 ← BodyAssembly, TopAssembly, InternalAssembly
    ├── parts/                      ← Individual geometry parts (Nozzle, ValveCup, etc.)
    ├── materials/CanMaterials.js   ← MeshPhysicalMaterial library
    ├── config/CanDimensions.js     ← Single source of truth for all geometry sizes
    ├── systems/                    ← HoverSystem, ExplosionSystem, LightingSystem, EnvironmentSystem
    └── config/EngineConfig.js      ← Engine configuration

artifacts/api-server/               ← Express API (served at /api)
lib/api-spec/openapi.yaml           ← API contract source of truth
lib/db/                             ← Drizzle ORM schema (future)
```

## Architecture decisions

- **Scroll → animation**: `window.scroll` maps scrollY to [0,1] progress → `RevealDirector` → stage enum (IDLE → LIFT → SHOULDER_REVEAL → VALVE_REVEAL → INTERNAL_REVEAL → SOUL_REVEAL → WORLD_REVEAL). `AssemblyAnimator` reads the stage and lerps assembly positions. `ExplosionSystem` separately drives the body's downward offset.
- **No external 3D models**: all geometry is Three.js primitives (CylinderGeometry, SphereGeometry, TorusGeometry, LatheGeometry). `CanDimensions.js` is the single source of truth — change a value there and every part updates.
- **Fixed container + scroll spacer**: `#experience-engine` is `position: fixed` (viewport-pinned). The 500vh `#scroll-spacer` below it makes the page scrollable while the canvas stays in view.
- **System/animator split**: `HoverSystem` owns idle float/rotate. `ExplosionSystem` owns body Y offset. `AssemblyAnimator` owns staged topAssembly + internal movement. They do NOT write to the same Three.js properties to avoid fighting.
- **is-ready pattern**: `engine.css` hides canvas at `opacity: 0` until `ExperienceEngine` adds `is-ready` class after full init — prevents flash of blank canvas.

## GitHub source

Original codebase: https://github.com/graffitistylewriter/spray-can

## User preferences

- Brand name: **Lacquer Bru** (spelled L-A-C-Q-U-E-R, like the paint). South African brand, "bru" = friend/great times in Afrikaans slang.
- The experience is intended to live as a section of a custom Shopify theme (fully bespoke, no preset templates).
- Reveal stages MUST match the keyframe reference images the user has — do not move part positions without checking the keyframes.
- The user has 16 years of experience in the creative industry and has a clear artistic vision — follow their lead on aesthetics.

## Gotchas

- Three.js renders to `#engine-canvas` via the canvas element passed to `RendererManager`. Do NOT call `container.appendChild(renderer.domElement)` — the canvas is already in the DOM.
- `AssemblyAnimator` and `ExplosionSystem` must not write to the same Three.js object properties (they will fight). AssemblyAnimator owns topAssembly + internal Y; ExplosionSystem owns body Y.
- The 500vh `#scroll-spacer` controls how much physical scrolling maps to the full animation. Adjust its height to change scroll speed.
- `CanDimensions.js` is the canonical source for all geometry measurements. Always add new dimensions there.
- Mouse parallax is handled by `MouseController` (registered as a system). It writes to `can.position.x/y` — don't also write to root position from another system.
