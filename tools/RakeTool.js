// ============================================================================
// Silence Engine
// RakeTool.js
// Garden of Silence
// Rastrilla la arena mientras el usuario arrastra el mouse sobre un SandPatch
// ============================================================================


export class RakeTool {


    constructor(engine) {


        this.engine = engine;

        this.name = "rake";


        this.activePatch = null;

        this.lastWorld = null;


    }




    //==========================================================================
    // CICLO DE VIDA
    //==========================================================================

    enter() {


        this.engine.canvas.style.cursor = "crosshair";


    }




    exit() {


        this.activePatch = null;

        this.lastWorld = null;

        this.engine.canvas.style.cursor = "grab";


    }




    update() {


    }




    //==========================================================================
    // MOUSE DOWN: ¿hay arena bajo el cursor? empezamos a rastrillar
    //==========================================================================

    mouseDown() {


        const world =
            this.engine.input.getMouseWorld();


        const patch =
            this.findPatchAt(world.x, world.y);


        if (patch) {


            this.activePatch = patch;

            this.lastWorld = world;


        }


    }




    //==========================================================================
    // MOUSE MOVE: si estamos arrastrando sobre un parche, dibujar el surco
    //==========================================================================

    mouseMove() {


        if (!this.activePatch)
            return;


        if (!this.engine.input.mouse.down)
            return;


        const world =
            this.engine.input.getMouseWorld();


        this.activePatch.rakeStroke(

            this.lastWorld,

            world

        );


        this.lastWorld = world;


    }




    //==========================================================================
    // MOUSE UP: soltar el rastrillo
    //==========================================================================

    mouseUp() {


        this.activePatch = null;

        this.lastWorld = null;


    }




    //==========================================================================
    // DOBLE CLIC: alisar la arena bajo el cursor
    //==========================================================================

    doubleClick() {


        const world =
            this.engine.input.getMouseWorld();


        const patch =
            this.findPatchAt(world.x, world.y);


        if (patch) {

            patch.smooth();

        }


    }




    //==========================================================================
    // BUSCAR PARCHE DE ARENA BAJO UN PUNTO DEL MUNDO
    //==========================================================================

    findPatchAt(x, y) {


        const patches =
            this.engine.world.objects.filter(

                object => object.type === "sand"

            );


        // el último agregado queda "encima"

        for (let i = patches.length - 1; i >= 0; i--) {


            if (patches[i].containsPoint(x, y)) {


                return patches[i];


            }


        }


        return null;


    }


}
