// ============================================================================
// Silence Engine
// Renderer.js
// Garden of Silence
// Version 0.2 Alpha
// ============================================================================

export class Renderer {


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


        this.showGrid = true;


        this.showOrigin = true;



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



        ctx.restore();



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
            "#efe8da";



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