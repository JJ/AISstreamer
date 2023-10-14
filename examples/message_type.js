import {AIStrack, defaultBoundingBox} from "../lib/index.js";

function printMessageType( message ) {
    console.log( message["MessageType"] );
}

AIStrack( process.env.AISSTREAM_API_KEY, "COSCO PHILIPPINES", defaultBoundingBox, printMessageType );


