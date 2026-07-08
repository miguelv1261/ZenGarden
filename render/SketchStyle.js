// ============================================================================
// Silence Engine
// SketchStyle.js
// Garden of Silence
// Utilidades de dibujo con aspecto "lápiz / acuarela" reutilizadas por todos
// los objetos del jardín. El ruido es determinista (sembrado por el id del
// objeto) para que el temblor de las líneas no vibre entre frames.
// ============================================================================


//==============================================================================
// PRNG DETERMINISTA (sembrado por un id de objeto)
//==============================================================================

export function createRng(seed) {


    let hash = 2166136261;

    const str = String(seed);


    for (let i = 0; i < str.length; i++) {

        hash ^= str.charCodeAt(i);

        hash = Math.imul(hash, 16777619);

    }


    let state = hash >>> 0;


    return function rng() {

        state |= 0;

        state = (state + 0x6D2B79F5) | 0;

        let t = Math.imul(state ^ (state >>> 15), 1 | state);

        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;

    };


}




//==============================================================================
// PUNTOS DE UNA MANCHA IRREGULAR (base para hojas, copas, pétalos, rocas)
//==============================================================================

export function blobPoints(rng, radius, options = {}) {


    const segments = options.segments ?? 12;

    const irregularity = options.irregularity ?? 0.22;

    const points = [];


    for (let i = 0; i < segments; i++) {


        const angle =
            (i / segments) * Math.PI * 2;


        const r =
            radius * (1 - irregularity / 2 + rng() * irregularity);


        points.push({

            x: Math.cos(angle) * r,

            y: Math.sin(angle) * r

        });


    }


    return points;


}




//==============================================================================
// PUNTOS DE UNA LÍNEA "TEMBLOROSA" ENTRE DOS EXTREMOS
//==============================================================================

export function wobbleLinePoints(rng, x1, y1, x2, y2, options = {}) {


    const segments = options.segments ?? 4;

    const amount = options.amount ?? 2.5;


    const dx = x2 - x1;

    const dy = y2 - y1;


    const nx = -dy;

    const ny = dx;


    const len = Math.hypot(nx, ny) || 1;


    const points = [];


    for (let i = 0; i <= segments; i++) {


        const t = i / segments;

        const baseX = x1 + dx * t;

        const baseY = y1 + dy * t;


        const edge =
            Math.sin(t * Math.PI);


        const jitter =
            (rng() - 0.5) * amount * edge;


        points.push({

            x: baseX + (nx / len) * jitter,

            y: baseY + (ny / len) * jitter

        });


    }


    return points;


}




//==============================================================================
// TRAZAR UNA RUTA SUAVE (curva) CERRADA A PARTIR DE PUNTOS
//==============================================================================

function tracePath(ctx, points, closed) {


    ctx.beginPath();


    ctx.moveTo(points[0].x, points[0].y);


    const count =
        closed ? points.length : points.length - 1;


    for (let i = 0; i < count; i++) {


        const curr = points[i];

        const next = points[(i + 1) % points.length];


        const midX = (curr.x + next.x) / 2;

        const midY = (curr.y + next.y) / 2;


        ctx.quadraticCurveTo(curr.x, curr.y, midX, midY);


    }


    if (closed)
        ctx.closePath();


}




//==============================================================================
// RELLENO ESTILO ACUARELA: varias capas translúcidas superpuestas
//==============================================================================

export function watercolorFill(ctx, points, color, rng, options = {}) {


    const layers = options.layers ?? 3;

    const baseAlpha = options.alpha ?? 0.28;


    for (let i = 0; i < layers; i++) {


        ctx.save();


        const scale =
            0.88 + rng() * 0.24;

        const offsetX =
            (rng() - 0.5) * 3;

        const offsetY =
            (rng() - 0.5) * 3;


        ctx.translate(offsetX, offsetY);

        ctx.scale(scale, scale);


        tracePath(ctx, points, true);


        ctx.fillStyle = color;

        ctx.globalAlpha = baseAlpha + rng() * 0.12;

        ctx.fill();


        ctx.restore();


    }


}




//==============================================================================
// TRAZO ESTILO LÁPIZ: la misma línea dibujada 2 veces, ligeramente distinta
//==============================================================================

export function sketchStroke(ctx, points, rng, options = {}) {


    const closed = options.closed ?? false;

    const color = options.color ?? "#3a2f22";

    const width = options.width ?? 2;

    const passes = options.passes ?? 2;


    for (let p = 0; p < passes; p++) {


        ctx.save();


        if (p > 0) {

            ctx.translate(
                (rng() - 0.5) * 1.4,
                (rng() - 0.5) * 1.4
            );

        }


        tracePath(ctx, points, closed);


        ctx.strokeStyle = color;

        ctx.lineWidth = width * (p === 0 ? 1 : 0.7);

        ctx.globalAlpha = p === 0 ? 0.8 : 0.35;

        ctx.lineCap = "round";

        ctx.lineJoin = "round";

        ctx.stroke();


        ctx.restore();


    }


}
