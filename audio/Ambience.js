// ============================================================================
// Silence Engine
// Ambience.js
// Garden of Silence
// Sonido ambiental (viento suave) sintetizado con Web Audio API,
// sin depender de ningún archivo de audio externo.
// ============================================================================

export class Ambience {


    constructor() {


        this.ctx = null;


        this.nodes = null;


        this.playing = false;


    }




    //==========================================================================
    // ALTERNAR ENCENDIDO / APAGADO
    //==========================================================================

    async toggle() {


        if (this.playing) {


            this.stop();


        } else {


            await this.start();


        }


        return this.playing;


    }




    //==========================================================================
    // INICIAR (debe llamarse tras un gesto del usuario, ej. un click)
    //==========================================================================

    async start() {


        if (!this.ctx) {


            const AudioContextClass =
                window.AudioContext || window.webkitAudioContext;


            this.ctx = new AudioContextClass();


        }


        if (this.ctx.state === "suspended") {


            await this.ctx.resume();


        }


        const ctx = this.ctx;



        // -------------------------------------------------
        // Ruido de viento: ruido blanco filtrado, con un LFO
        // que hace que el filtro "respire" lentamente
        // -------------------------------------------------

        const bufferSize =
            ctx.sampleRate * 2;


        const noiseBuffer =
            ctx.createBuffer(1, bufferSize, ctx.sampleRate);


        const data =
            noiseBuffer.getChannelData(0);


        for (let i = 0; i < bufferSize; i++) {

            data[i] = Math.random() * 2 - 1;

        }


        const noise =
            ctx.createBufferSource();

        noise.buffer = noiseBuffer;

        noise.loop = true;


        const filter =
            ctx.createBiquadFilter();

        filter.type = "bandpass";

        filter.frequency.value = 500;

        filter.Q.value = 0.6;


        const lfo =
            ctx.createOscillator();

        lfo.frequency.value = 0.07;


        const lfoGain =
            ctx.createGain();

        lfoGain.gain.value = 250;


        lfo.connect(lfoGain);

        lfoGain.connect(filter.frequency);



        // -------------------------------------------------
        // Zumbido grave y suave de fondo (como una campana lejana)
        // -------------------------------------------------

        const drone =
            ctx.createOscillator();

        drone.type = "sine";

        drone.frequency.value = 110;


        const droneGain =
            ctx.createGain();

        droneGain.gain.value = 0.03;


        drone.connect(droneGain);



        // -------------------------------------------------
        // Mezcla y volumen maestro (entrada suave)
        // -------------------------------------------------

        const masterGain =
            ctx.createGain();

        masterGain.gain.value = 0;


        noise.connect(filter);

        filter.connect(masterGain);

        droneGain.connect(masterGain);

        masterGain.connect(ctx.destination);


        noise.start();

        lfo.start();

        drone.start();


        masterGain.gain.linearRampToValueAtTime(

            0.18,

            ctx.currentTime + 1.5

        );


        this.nodes = {

            noise,

            filter,

            lfo,

            lfoGain,

            drone,

            droneGain,

            masterGain

        };


        this.playing = true;


    }




    //==========================================================================
    // DETENER (con una pequeña salida suave)
    //==========================================================================

    stop() {


        if (!this.nodes)
            return;


        const { masterGain, noise, lfo, drone } = this.nodes;

        const ctx = this.ctx;


        masterGain.gain.linearRampToValueAtTime(

            0,

            ctx.currentTime + 0.8

        );


        setTimeout(() => {


            noise.stop();

            lfo.stop();

            drone.stop();


        }, 900);


        this.nodes = null;

        this.playing = false;


    }


}
