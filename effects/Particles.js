// ============================================================================
// Silence Engine
// Particles.js
// Garden of Silence
// Hojas y pétalos cayendo suavemente cerca de árboles y flores
// ============================================================================

export class ParticleSystem {


    constructor() {


        this.particles = [];


        this.timer = 0;


        this.spawnInterval = 0.6;


        this.maxParticles = 40;


    }




    //==========================================================================
    // UPDATE
    //==========================================================================

    update(delta, objects) {


        this.timer += delta;


        if (

            this.timer > this.spawnInterval &&
            this.particles.length < this.maxParticles

        ) {


            this.timer = 0;


            this.trySpawn(objects);


        }



        for (let i = this.particles.length - 1; i >= 0; i--) {


            const particle = this.particles[i];


            particle.age += delta;

            particle.life -= delta;


            particle.x += particle.vx * delta;

            particle.y += particle.vy * delta;


            particle.x +=
                Math.sin(particle.age * particle.swaySpeed) *
                particle.swayAmount *
                delta;


            particle.rotation +=
                particle.rotationSpeed * delta;


            if (particle.life <= 0) {


                this.particles.splice(i, 1);


            }


        }


    }




    //==========================================================================
    // INTENTAR CREAR UNA PARTÍCULA CERCA DE UN ÁRBOL O FLOR
    //==========================================================================

    trySpawn(objects) {


        const sources =
            objects.filter(object =>

                object.visible &&
                (object.type === "tree" || object.type === "flower")

            );


        if (sources.length === 0)
            return;


        const source =
            sources[Math.floor(Math.random() * sources.length)];


        const isFlower =
            source.type === "flower";


        this.particles.push({

            x: source.x + (Math.random() - 0.5) * (isFlower ? 18 : 46),

            y: source.y - (isFlower ? 14 : 36) + (Math.random() - 0.5) * 10,

            vx: 0,

            vy: 10 + Math.random() * 10,

            rotation: Math.random() * Math.PI * 2,

            rotationSpeed: (Math.random() - 0.5) * 2,

            swaySpeed: 1 + Math.random(),

            swayAmount: 10 + Math.random() * 10,

            age: 0,

            life: 3 + Math.random() * 2,

            size: isFlower ? (3 + Math.random() * 2) : (5 + Math.random() * 3),

            color: isFlower ? source.color : "#8a9e5c"

        });


    }




    //==========================================================================
    // DIBUJO
    //==========================================================================

    draw(ctx) {


        for (const particle of this.particles) {


            const alpha =
                Math.max(0, Math.min(1, particle.life / 1.2));


            ctx.save();


            ctx.translate(particle.x, particle.y);

            ctx.rotate(particle.rotation);


            ctx.globalAlpha = alpha * 0.8;

            ctx.fillStyle = particle.color;


            ctx.beginPath();

            ctx.ellipse(0, 0, particle.size, particle.size * 0.6, 0, 0, Math.PI * 2);

            ctx.fill();


            ctx.restore();


        }


    }


}
