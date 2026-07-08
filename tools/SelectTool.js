// ============================================================================
// Silence Engine
// SelectTool.js
// Garden of Silence
// ============================================================================


export class SelectTool {


    constructor(engine) {


        this.engine = engine;


        this.name =
            "select";


        this.dragging = null;


        this.offset = {

            x: 0,

            y: 0

        };


    }





    enter() {


    }





    exit() {


        this.dragging = null;


    }





    update() {


    }





    mouseDown() {


        const input =
            this.engine.input;



        const world =
            input.getMouseWorld();



        const object =
            this.engine.world.getObjectAt(

                world.x,

                world.y

            );



        this.engine.world.selectObject(
            object
        );



        if (object) {


            this.dragging = object;


            this.offset.x =
                object.x - world.x;


            this.offset.y =
                object.y - world.y;


        } else {


            this.dragging = null;


        }


    }





    mouseMove() {


        if (!this.dragging)
            return;


        if (!this.engine.input.mouse.down)
            return;


        const world =
            this.engine.input.getMouseWorld();


        this.dragging.moveTo(

            world.x + this.offset.x,

            world.y + this.offset.y

        );


    }





    mouseUp() {


        this.dragging = null;


    }


}