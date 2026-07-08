// ============================================================================
// Silence Engine
// Renderer.js
// Garden of Silence
// Version 0.2 Alpha
// ============================================================================

export class Renderer {


    //==========================================================================
    // TEXTURA DE PAPEL (generada una sola vez, reutilizada como patrón)
    //==========================================================================

    createPaperPattern() {


        const size = 220;


        const tile =
            document.createElement("canvas");


        tile.width = size;

        tile.height = size;


        const tctx =
            tile.getContext("2d");


        tctx.fillStyle = "#efe8da";

        tctx.fillRect(0, 0, size, size);


        for (let i = 0; i < 900; i++) {


            const x = Math.random() * size;

            const y = Math.random() * size;

            const light = Math.random() > 0.5;


            tctx.fillStyle =
                light
                    ? "rgba(255,252,240,0.5)"
                    : "rgba(120,105,80,0.05)";


            tctx.fillRect(x, y, 1, 1);


        }


        tctx.strokeStyle = "rgba(120,105,80,0.05)";

        tctx.lineWidth = 1;


        for (let i = 0; i < 12; i++) {


            const y = Math.random() * size;


            tctx.beginPath();

            tctx.moveTo(0, y);

            tctx.bezierCurveTo(

                size * 0.3, y + (Math.random() - 0.5) * 20,

                size * 0.7, y + (Math.random() - 0.5) * 20,

                size, y

            );

            tctx.stroke();


        }


        return this.ctx.createPattern(tile, "repeat");


    }


    constructor(canvas, camera) {


        this.canvas = canvas;


        this.ctx =
            canvas.getContext("2d");



        this.camera = camera;



        // ---------------------------------------------------------------------
        // Configuración visual
        // ---------------------------------------------------------------------

        this.background = "#efe8da";


        this.ctx.imageSmoothingEnabled = true;


        this.gridSize = 100;


        this.showGrid = false;


        this.showOrigin = false;


        this.paperPattern =
            this.createPaperPattern();



        // ---------------------------------------------------------------------
        // Capas
        // ---------------------------------------------------------------------

        this.layers = [];


        // ---------------------------------------------------------------------
        // Debug
        // ---------------------------------------------------------------------

        this.debug = false;


        this.lastRenderTime = 0;


    }





    //==========================================================================
    // RESIZE
    //==========================================================================

    resize() {


        const rect =
            this.canvas.getBoundingClientRect();



        this.canvas.width =
            rect.width;



        this.canvas.height =
            rect.height;


    }





    //==========================================================================
    // RENDER PRINCIPAL
    //==========================================================================

    render(world) {


        const ctx = this.ctx;



        this.clear();



        ctx.save();



        // -------------------------------------------------
        // Cámara
        // -------------------------------------------------

        ctx.translate(

            this.canvas.clientWidth / 2,

            this.canvas.clientHeight / 2

        );



        ctx.scale(

            this.camera.zoom,

            this.camera.zoom

        );



        ctx.translate(

            -this.camera.x,

            -this.camera.y

        );



        // -------------------------------------------------
        // Mundo
        // -------------------------------------------------

        this.drawGrid();



        this.drawOrigin();



        this.renderObjects(
            world
        );


        if (world.particles) {

            world.particles.draw(ctx);

        }



        ctx.restore();



        this.drawLightOverlay(world);


        this.drawInterface();


    }





    //==========================================================================
    // LIMPIAR CANVAS
    //==========================================================================

    clear() {


        this.ctx.clearRect(

            0,

            0,

            this.canvas.clientWidth,

            this.canvas.clientHeight

        );



        this.ctx.fillStyle =
            this.paperPattern ?? "#efe8da";



        this.ctx.fillRect(

            0,

            0,

            this.canvas.clientWidth,

            this.canvas.clientHeight

        );


    }





    //==========================================================================
    // GRID INFINITA
    //==========================================================================

    drawGrid() {


        if (!this.showGrid)
            return;



        const ctx =
            this.ctx;



        const view =
            this.camera.getViewport();



        const size =
            this.gridSize;



        ctx.beginPath();



        ctx.strokeStyle =
            "rgba(80,70,50,0.08)";



        ctx.lineWidth =
            1 / this.camera.zoom;



        const startX =
            Math.floor(view.left / size) * size;



        const startY =
            Math.floor(view.top / size) * size;



        for (

            let x = startX;

            x <= view.right;

            x += size

        ) {


            ctx.moveTo(
                x,
                view.top
            );


            ctx.lineTo(
                x,
                view.bottom
            );


        }





        for (

            let y = startY;

            y <= view.bottom;

            y += size

        ) {


            ctx.moveTo(
                view.left,
                y
            );


            ctx.lineTo(
                view.right,
                y
            );


        }



        ctx.stroke();


    }





    //==========================================================================
    // ORIGEN DEL MUNDO
    //==========================================================================

    drawOrigin() {


        if (!this.showOrigin)
            return;



        const ctx =
            this.ctx;



        ctx.lineWidth =
            2 / this.camera.zoom;



        // eje X

        ctx.strokeStyle =
            "rgba(200,80,80,.5)";



        ctx.beginPath();

        ctx.moveTo(-10000, 0);

        ctx.lineTo(10000, 0);

        ctx.stroke();



        // eje Y

        ctx.strokeStyle =
            "rgba(80,120,200,.5)";



        ctx.beginPath();

        ctx.moveTo(0, -10000);

        ctx.lineTo(0, 10000);

        ctx.stroke();


    }





    //==========================================================================
    // OBJETOS
    //==========================================================================

    renderObjects(world) {


        const ctx =
            this.ctx;



        const objects =
            [...world.objects];



        // ordenar por profundidad

        objects.sort(

            (a, b) => {

                if (a.layer !== b.layer)

                    return a.layer - b.layer;



                return a.zIndex - b.zIndex;

            }

        );



        for (const object of objects) {



            if (!object.visible)
                continue;



            object.draw(ctx);


        }


    }





    //==========================================================================
    // LUZ AMBIENTAL (varía lentamente con el tiempo del mundo)
    //==========================================================================

    drawLightOverlay(world) {


        const ctx = this.ctx;


        const w = this.canvas.clientWidth;

        const h = this.canvas.clientHeight;


        const t = world.time * 0.05;


        const cx = w * (0.5 + Math.sin(t) * 0.15);

        const cy = h * (0.35 + Math.cos(t * 0.7) * 0.08);


        const glow =
            ctx.createRadialGradient(

                cx, cy, 0,

                cx, cy, Math.max(w, h) * 0.8

            );


        glow.addColorStop(0, "rgba(255,248,220,0.10)");

        glow.addColorStop(1, "rgba(255,248,220,0)");


        ctx.save();

        ctx.fillStyle = glow;

        ctx.fillRect(0, 0, w, h);

        ctx.restore();



        const vignette =
            ctx.createRadialGradient(

                w / 2, h / 2, Math.min(w, h) * 0.4,

                w / 2, h / 2, Math.max(w, h) * 0.75

            );


        vignette.addColorStop(0, "rgba(0,0,0,0)");

        vignette.addColorStop(1, "rgba(40,30,20,0.10)");


        ctx.save();

        ctx.fillStyle = vignette;

        ctx.fillRect(0, 0, w, h);

        ctx.restore();


    }




    //==========================================================================
    // UI DEBUG
    //==========================================================================

    drawInterface() {


        if (!this.debug)
            return;



        const ctx =
            this.ctx;



        ctx.save();



        ctx.fillStyle =
            "#333";



        ctx.font =
            "14px Arial";



        ctx.fillText(

            `Camera X:${Math.round(this.camera.x)} Y:${Math.round(this.camera.y)}`,

            20,

            25

        );



        ctx.fillText(

            `Zoom:${this.camera.zoom.toFixed(2)}`,

            20,

            45

        );



        ctx.restore();


    }





    //==========================================================================
    // ACTIVAR DEBUG
    //==========================================================================

    toggleDebug() {


        this.debug =
            !this.debug;


    }





}