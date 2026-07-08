// ============================================================================
// Silence Engine
// GameObject.js
// Garden of Silence
// Version 0.2 Alpha
// ============================================================================

export class GameObject {


    constructor(options = {}) {


        // ---------------------------------------------------------------------
        // Identificación
        // ---------------------------------------------------------------------

        this.id =
            options.id ??
            crypto.randomUUID();


        this.name =
            options.name ??
            "GameObject";


        this.type =
            options.type ??
            "object";



        // ---------------------------------------------------------------------
        // Transformación
        // ---------------------------------------------------------------------

        this.x =
            options.x ?? 0;


        this.y =
            options.y ?? 0;


        this.rotation =
            options.rotation ?? 0;


        this.scale =
            options.scale ?? 1;



        // ---------------------------------------------------------------------
        // Dimensiones
        // ---------------------------------------------------------------------

        this.width =
            options.width ?? 50;


        this.height =
            options.height ?? 50;



        // ---------------------------------------------------------------------
        // Estado
        // ---------------------------------------------------------------------

        this.visible =
            options.visible ?? true;


        this.active =
            options.active ?? true;


        this.selected =
            false;



        // ---------------------------------------------------------------------
        // Capas
        // ---------------------------------------------------------------------

        this.layer =
            options.layer ?? 0;



        // ---------------------------------------------------------------------
        // Profundidad visual
        // ---------------------------------------------------------------------

        this.zIndex =
            options.zIndex ?? 0;



        // ---------------------------------------------------------------------
        // Animación
        // ---------------------------------------------------------------------

        this.velocityX = 0;

        this.velocityY = 0;


        this.rotationSpeed = 0;


        this.scaleSpeed = 0;



        // ---------------------------------------------------------------------
        // Vida del objeto
        // ---------------------------------------------------------------------

        this.age = 0;


        this.createdAt =
            Date.now();



        // ---------------------------------------------------------------------
        // Render
        // ---------------------------------------------------------------------

        this.opacity =
            options.opacity ?? 1;



        this.shadow = true;


    }





    //==========================================================================
    // UPDATE
    //==========================================================================

    update(delta){


        if(!this.active)
            return;



        this.age += delta;



        this.x +=
            this.velocityX * delta;



        this.y +=
            this.velocityY * delta;



        this.rotation +=
            this.rotationSpeed * delta;



        this.scale +=
            this.scaleSpeed * delta;



    }





    //==========================================================================
    // DRAW BASE
    //==========================================================================

    draw(ctx){


        if(!this.visible)
            return;



        ctx.save();



        ctx.translate(
            this.x,
            this.y
        );



        ctx.rotate(
            this.rotation
        );



        ctx.scale(
            this.scale,
            this.scale
        );



        ctx.globalAlpha =
            this.opacity;



        this.drawObject(ctx);



        if(this.selected){

            this.drawSelection(ctx);

        }



        ctx.restore();


    }





    //==========================================================================
    // DIBUJO PERSONALIZADO
    //==========================================================================
    //
    // Cada objeto hijo implementará:
    //
    // Tree.js
    // Rock.js
    // Flower.js
    //
    //==========================================================================

    drawObject(ctx){


        ctx.fillStyle =
            "#777";


        ctx.fillRect(
            -25,
            -25,
            50,
            50
        );


    }





    //==========================================================================
    // SELECCIÓN
    //==========================================================================

    drawSelection(ctx){


        ctx.save();



        ctx.strokeStyle =
            "#8bbf7a";


        ctx.lineWidth =
            3;



        ctx.setLineDash(
            [8,5]
        );



        ctx.strokeRect(

            -this.width / 2,

            -this.height / 2,

            this.width,

            this.height

        );



        ctx.restore();


    }





    //==========================================================================
    // COLISIÓN SIMPLE
    //==========================================================================

    containsPoint(x,y){


        const halfW =
            this.width / 2;



        const halfH =
            this.height / 2;



        return (

            x >= this.x - halfW &&

            x <= this.x + halfW &&

            y >= this.y - halfH &&

            y <= this.y + halfH

        );


    }





    //==========================================================================
    // TRANSFORMACIONES
    //==========================================================================

    moveTo(x,y){


        this.x = x;

        this.y = y;


    }



    move(dx,dy){


        this.x += dx;

        this.y += dy;


    }



    rotate(angle){


        this.rotation += angle;


    }



    setScale(value){


        this.scale = value;


    }





    //==========================================================================
    // ESTADO
    //==========================================================================

    select(){


        this.selected = true;


    }



    deselect(){


        this.selected = false;


    }



    destroy(){


        this.active = false;

        this.visible = false;


    }




    //==========================================================================
    // SERIALIZACIÓN PARA GUARDAR JARDINES
    //==========================================================================

    serialize(){


        return {


            id:this.id,


            name:this.name,


            type:this.type,


            x:this.x,


            y:this.y,


            rotation:this.rotation,


            scale:this.scale,


            layer:this.layer,


            zIndex:this.zIndex,


            opacity:this.opacity


        };


    }



}