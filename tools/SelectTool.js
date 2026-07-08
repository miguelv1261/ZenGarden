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


    }





    enter() {


    }





    exit() {


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


    }





    mouseMove() {


    }





    mouseUp() {


    }


}