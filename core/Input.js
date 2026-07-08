// ============================================================================
// Silence Engine
// Input.js
// Garden of Silence
// Version 0.2 Alpha
// ============================================================================

export class Input {


    constructor(canvas, camera, toolManager = null) {


        this.canvas = canvas;

        this.camera = camera;

        this.toolManager = toolManager;



        // ---------------------------------------------------------------------
        // Mouse Screen
        // ---------------------------------------------------------------------

        this.mouse = {

            x:0,

            y:0,

            down:false,

            button:null

        };



        // ---------------------------------------------------------------------
        // Mouse World
        // ---------------------------------------------------------------------

        this.worldMouse = {

            x:0,

            y:0

        };



        // ---------------------------------------------------------------------
        // Drag Camera
        // ---------------------------------------------------------------------

        this.draggingCamera = false;


        this.lastMouse = {

            x:0,

            y:0

        };



        // ---------------------------------------------------------------------
        // Keyboard
        // ---------------------------------------------------------------------

        this.keys = {};



        // ---------------------------------------------------------------------
        // Estado
        // ---------------------------------------------------------------------

        this.spacePressed = false;



        this.init();


    }





    //==========================================================================
    // CONEXIÓN CON TOOLMANAGER
    //==========================================================================

    setToolManager(toolManager){


        this.toolManager = toolManager;


    }




    //==========================================================================
    // INICIALIZACIÓN
    //==========================================================================

    init(){


        this.canvas.addEventListener(

            "mousemove",

            e => this.mouseMove(e)

        );



        this.canvas.addEventListener(

            "mousedown",

            e => this.mouseDown(e)

        );



        this.canvas.addEventListener(

            "mouseup",

            e => this.mouseUp(e)

        );



        this.canvas.addEventListener(

            "mouseleave",

            () => this.mouseLeave()

        );



        this.canvas.addEventListener(

            "wheel",

            e => this.mouseWheel(e),

            {
                passive:false
            }

        );



        window.addEventListener(

            "keydown",

            e => this.keyDown(e)

        );



        window.addEventListener(

            "keyup",

            e => this.keyUp(e)

        );



        this.canvas.addEventListener(

            "contextmenu",

            e => e.preventDefault()

        );


    }





    //==========================================================================
    // UPDATE
    //==========================================================================

    update(){


        this.worldMouse =
            this.camera.screenToWorld(

                this.mouse.x,

                this.mouse.y

            );



    }





    //==========================================================================
    // MOUSE MOVE
    //==========================================================================

    mouseMove(event){


        const rect =
            this.canvas.getBoundingClientRect();



        this.mouse.x =
            event.clientX - rect.left;



        this.mouse.y =
            event.clientY - rect.top;



        if(this.draggingCamera){


            const dx =
                this.mouse.x -
                this.lastMouse.x;



            const dy =
                this.mouse.y -
                this.lastMouse.y;



            this.camera.move(

                -dx / this.camera.zoom,

                -dy / this.camera.zoom

            );


        }



        this.lastMouse.x =
            this.mouse.x;



        this.lastMouse.y =
            this.mouse.y;


        if(this.toolManager){

            this.toolManager.mouseMove(event);

        }


    }





    //==========================================================================
    // MOUSE DOWN
    //==========================================================================

    mouseDown(event){


        this.mouse.down = true;


        this.mouse.button =
            event.button;



        // -------------------------------------------------
        // Botón central
        // -------------------------------------------------

        if(event.button === 1){


            this.draggingCamera = true;


        }



        // -------------------------------------------------
        // Barra espaciadora + click izquierdo
        // -------------------------------------------------

        if(

            event.button === 0 &&

            this.spacePressed

        ){


            this.draggingCamera = true;


        }


        this.lastMouse.x =
            this.mouse.x;


        this.lastMouse.y =
            this.mouse.y;


        if(this.toolManager){

            this.toolManager.mouseDown(event);

        }


    }





    //==========================================================================
    // MOUSE UP
    //==========================================================================

    mouseUp(event){


        this.mouse.down = false;



        if(event.button === 1 || event.button === 0){


            this.draggingCamera = false;


        }


        if(this.toolManager){

            this.toolManager.mouseUp(event);

        }


    }





    //==========================================================================
    // MOUSE LEAVE
    //==========================================================================

    mouseLeave(){


        this.mouse.down = false;


        this.draggingCamera = false;


    }





    //==========================================================================
    // ZOOM
    //==========================================================================

    mouseWheel(event){


        event.preventDefault();



        this.camera.zoomAt(

            this.mouse.x,

            this.mouse.y,

            event.deltaY

        );


    }





    //==========================================================================
    // KEYBOARD
    //==========================================================================

    keyDown(event){


        this.keys[event.code] = true;



        if(event.code === "Space"){


            this.spacePressed = true;



            event.preventDefault();


        }


    }





    keyUp(event){


        this.keys[event.code] = false;



        if(event.code === "Space"){


            this.spacePressed = false;


        }


    }





    //==========================================================================
    // UTILIDADES
    //==========================================================================

    isKeyDown(key){


        return this.keys[key] === true;


    }





    getMouseWorld(){


        return {


            x:this.worldMouse.x,


            y:this.worldMouse.y


        };


    }



}