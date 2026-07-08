// ============================================================================
// Silence Engine
// ObjectFactory.js
// Garden of Silence
// Commit #3
// ============================================================================

import { Tree } from "../objects/Tree.js";
import { Rock } from "../objects/Rock.js";
import { Flower } from "../objects/Flower.js";
import { Plant } from "../objects/Plant.js";
import { SandPatch } from "../objects/SandPatch.js";


export class ObjectFactory {


    static create(type, options = {}) {


        switch (type) {


            case "tree":

                return new Tree(options);



            case "rock":

                return new Rock(options);



            case "flower":

                return new Flower(options);



            case "plant":

                return new Plant(options);



            case "sand":

                return new SandPatch(options);



            default:

                console.warn(
                    "Objeto desconocido:",
                    type
                );

                return null;


        }


    }



}