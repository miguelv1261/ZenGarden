// ============================================================================
// Silence Engine
// World.js
// Garden of Silence
// Version 0.2 Alpha
// ============================================================================

import { ObjectFactory } from "../factory/ObjectFactory.js";
import { ParticleSystem } from "../effects/Particles.js";


export class World {


    constructor(){


        // ---------------------------------------------------------------------
        // Objetos del mundo
        // ---------------------------------------------------------------------

        this.objects = [];



        // ---------------------------------------------------------------------
        // Tiempo del mundo
        // ---------------------------------------------------------------------

        this.time = 0;



        // ---------------------------------------------------------------------
        // Estado
        // ---------------------------------------------------------------------

        this.paused = false;



        // ---------------------------------------------------------------------
        // ID interno
        // ---------------------------------------------------------------------

        this.nextId = 1;



        // ---------------------------------------------------------------------
        // Notificación de selección (usada por el Inspector)
        // ---------------------------------------------------------------------

        this.onSelectionChange = null;



        // ---------------------------------------------------------------------
        // Partículas ambientales (hojas / pétalos)
        // ---------------------------------------------------------------------

        this.particles =
            new ParticleSystem();



    }





    //==========================================================================
    // UPDATE DEL MUNDO
    //==========================================================================

    update(delta){


        if(this.paused)
            return;



        this.time += delta;



        for(const object of this.objects){


            if(object.active){


                object.update(delta);


            }


        }



        this.particles.update(delta, this.objects);


    }





    //==========================================================================
    // AGREGAR OBJETO
    //==========================================================================

    add(object){


        if(!object)
            return;



        if(!object.id){


            object.id =
                this.nextId++;


        }



        this.objects.push(object);



        return object;


    }





    //==========================================================================
    // ELIMINAR OBJETO
    //==========================================================================

    remove(object){


        const index =
            this.objects.indexOf(object);



        if(index !== -1){


            this.objects.splice(

                index,

                1

            );



            if(object.selected && this.onSelectionChange){

                this.onSelectionChange(null);

            }


        }


    }





    //==========================================================================
    // BUSCAR OBJETO POR ID
    //==========================================================================

    getById(id){


        return this.objects.find(

            object =>
                object.id === id

        );


    }





    //==========================================================================
    // LIMPIAR MUNDO
    //==========================================================================

    clear(){


        this.objects = [];

        this.nextId = 1;


    }





    //==========================================================================
    // OBJETOS POR CAPA
    //==========================================================================

    getLayer(layer){


        return this.objects.filter(

            object =>
                object.layer === layer

        );


    }





    //==========================================================================
    // OBJETOS VISIBLES
    //==========================================================================

    getVisibleObjects(camera){


        return this.objects.filter(

            object => {


                if(!object.visible)
                    return false;



                return camera.isVisible(

                    object.x,

                    object.y,

                    object.width,

                    object.height

                );


            }

        );


    }





    //==========================================================================
    // BUSCAR OBJETO POR POSICIÓN
    //==========================================================================

    getObjectAt(x,y){



        const sorted =
            [...this.objects]

            .sort(

                (a,b)=>

                    b.layer - a.layer

            );



        for(const object of sorted){



            if(
                object.containsPoint &&
                object.containsPoint(x,y)
            ){


                return object;


            }


        }



        return null;


    }





    //==========================================================================
    // SELECCIÓN
    //==========================================================================

    deselectAll(){


        for(const object of this.objects){


            object.deselect();


        }


    }





    selectObject(object){


        this.deselectAll();



        if(object){


            object.select();


        }



        if(this.onSelectionChange){

            this.onSelectionChange(object || null);

        }


    }




    //==========================================================================
    // OBJETO SELECCIONADO ACTUAL
    //==========================================================================

    getSelected(){


        return this.objects.find(

            object => object.selected

        ) ?? null;


    }





    //==========================================================================
    // CONTADORES
    //==========================================================================

    count(){


        return this.objects.length;


    }





    //==========================================================================
    // SERIALIZAR JARDÍN
    //==========================================================================

    serialize(){


        return {


            version:"0.2",


            time:this.time,


            objects:

                this.objects.map(

                    object =>
                        object.serialize()

                )


        };


    }





    //==========================================================================
    // CARGAR JARDÍN
    //==========================================================================

    load(data){


        this.clear();



        if(!data || !data.objects)
            return;



        for(const objectData of data.objects){


            const object =
                ObjectFactory.create(

                    objectData.type,

                    objectData

                );


            if(object){

                this.add(object);

            }


        }



        this.time =
            data.time ?? 0;


    }





    //==========================================================================
    // PAUSA
    //==========================================================================

    pause(){


        this.paused = true;


    }



    resume(){


        this.paused = false;


    }



}