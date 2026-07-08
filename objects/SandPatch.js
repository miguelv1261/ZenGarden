// ============================================================================
// Silence Engine
// SandPatch.js
// Garden of Silence
// Arena rastrillable con textura propia (canvas offscreen)
// ============================================================================

import { GameObject } from "../core/GameObject.js";


export class SandPatch extends GameObject {


    constructor(options = {}) {


        super({

            ...options,

            name: "Sand",

            type: "sand",

            width: 300,

            height: 200

        });


        // ---------------------------------------------------------------------
        // Forma del estanque de arena (elipse dentro del bounding box)
        // ---------------------------------------------------------------------

        this.radiusX = this.width / 2;

        this.radiusY = this.height / 2;


        // ---------------------------------------------------------------------
        // Textura offscreen: aquí vive el grano y los surcos rastrillados.
        // Se dibuja UNA vez y se va modificando, en vez de recalcular cada frame.
        // ---------------------------------------------------------------------

        this.texture =
            document.createElement("canvas");

        this.texture.width = this.width;
        this.texture.height = this.height;

        this.tctx =
            this.texture.getContext("2d");


        this.generateBase();


    }




    //==========================================================================
    // GENERAR TEXTURA BASE (grano + patrón de calma inicial)
    //==========================================================================

    generateBase() {


        const ctx = this.tctx;

        const w = this.width;
        const h = this.height;


        ctx.clearRect(0, 0, w, h);


        // Color base de la arena

        ctx.fillStyle = "#dcc493";

        ctx.fillRect(0, 0, w, h);


        // Grano: cientos de puntitos claros/oscuros al azar

        for (let i = 0; i < 1400; i++) {


            const gx = Math.random() * w;
            const gy = Math.random() * h;

            const light = Math.random() > 0.5;

            ctx.fillStyle =
                light
                    ? "rgba(255,248,225,0.18)"
                    : "rgba(110,90,60,0.14)";

            ctx.fillRect(gx, gy, 1.4, 1.4);


        }


        // Patrón inicial de surcos concéntricos (jardín recién rastrillado)

        const cx = w / 2;
        const cy = h / 2;

        for (let r = 18; r < Math.min(w, h) / 2 - 10; r += 14) {


            this.drawGrooveArc(cx, cy, r);


        }


    }




    //==========================================================================
    // DIBUJAR UN ARCO DE SURCOS (para el patrón inicial concéntrico)
    //==========================================================================

    drawGrooveArc(cx, cy, r) {


        const steps = 40;

        let prev = null;


        for (let i = 0; i <= steps; i++) {


            const angle = (i / steps) * Math.PI * 2;

            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * (r * (this.height / this.width));


            if (prev) {

                this.drawGrooveSegment(prev.x, prev.y, x, y, 1);

            }


            prev = { x, y };


        }


    }




    //==========================================================================
    // DIBUJAR UN SEGMENTO DE SURCO (efecto rastrillo: varias púas + relieve)
    //==========================================================================
    //
    // x1,y1 -> x2,y2 en coordenadas de la textura (0..width, 0..height)
    //
    //==========================================================================

    drawGrooveSegment(x1, y1, x2, y2, intensity = 1) {


        const ctx = this.tctx;

        const dx = x2 - x1;
        const dy = y2 - y1;

        const len = Math.hypot(dx, dy) || 1;

        const nx = -dy / len;
        const ny = dx / len;


        const tineCount = 5;
        const spacing = 5;


        for (let i = 0; i < tineCount; i++) {


            const offset =
                (i - (tineCount - 1) / 2) * spacing;

            const ox = nx * offset;
            const oy = ny * offset;


            // sombra del surco (lado hundido)

            ctx.strokeStyle =
                `rgba(105,85,55,${0.32 * intensity})`;

            ctx.lineWidth = 1.6;

            ctx.lineCap = "round";

            ctx.beginPath();

            ctx.moveTo(x1 + ox + nx * 1.3, y1 + oy + ny * 1.3);

            ctx.lineTo(x2 + ox + nx * 1.3, y2 + oy + ny * 1.3);

            ctx.stroke();


            // brillo del surco (lado elevado)

            ctx.strokeStyle =
                `rgba(255,250,232,${0.42 * intensity})`;

            ctx.lineWidth = 1.3;

            ctx.beginPath();

            ctx.moveTo(x1 + ox - nx * 1.3, y1 + oy - ny * 1.3);

            ctx.lineTo(x2 + ox - nx * 1.3, y2 + oy - ny * 1.3);

            ctx.stroke();


        }


    }




    //==========================================================================
    // RASTRILLAR (llamado desde RakeTool con coordenadas del mundo)
    //==========================================================================

    rakeStroke(fromWorld, toWorld) {


        const p1 = this.worldToLocal(fromWorld.x, fromWorld.y);
        const p2 = this.worldToLocal(toWorld.x, toWorld.y);


        const w = this.width;
        const h = this.height;


        this.drawGrooveSegment(

            p1.x + w / 2,
            p1.y + h / 2,

            p2.x + w / 2,
            p2.y + h / 2

        );


    }




    //==========================================================================
    // ALISAR (borrar rastros y volver a la arena limpia)
    //==========================================================================

    smooth() {


        this.generateBase();


    }




    //==========================================================================
    // CONVERTIR PUNTO DEL MUNDO A ESPACIO LOCAL DEL OBJETO
    //==========================================================================

    worldToLocal(wx, wy) {


        const cos = Math.cos(-this.rotation);
        const sin = Math.sin(-this.rotation);

        const dx = wx - this.x;
        const dy = wy - this.y;


        return {

            x: (dx * cos - dy * sin) / this.scale,

            y: (dx * sin + dy * cos) / this.scale

        };


    }




    //==========================================================================
    // ¿EL PUNTO ESTÁ DENTRO DE LA ELIPSE DE ARENA?
    //==========================================================================

    containsPoint(x, y) {


        const local = this.worldToLocal(x, y);


        const nx = local.x / this.radiusX;
        const ny = local.y / this.radiusY;


        return (nx * nx + ny * ny) <= 1;


    }




    //==========================================================================
    // DIBUJO
    //==========================================================================

    drawObject(ctx) {


        // recorte elíptico + textura rastrillada

        ctx.save();

        ctx.beginPath();

        ctx.ellipse(0, 0, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);

        ctx.clip();

        ctx.drawImage(

            this.texture,

            -this.width / 2,
            -this.height / 2,

            this.width,
            this.height

        );

        ctx.restore();


        // borde del estanque, como un cajón de madera hundido

        ctx.save();

        ctx.beginPath();

        ctx.ellipse(0, 0, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);

        ctx.lineWidth = 6;

        ctx.strokeStyle = "rgba(110,85,55,0.28)";

        ctx.stroke();

        ctx.restore();


    }


}
