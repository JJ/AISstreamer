import {AIStrack, defaultBoundingBox} from "../lib/index.js";

function printMessageType( message ) {
    console.log( message["MessageType"] );
}

const API_KEY = process.env.AISSTREAM_API_KEY;
console.log(API_KEY);
AIStrack( API_KEY, "COSCO PHILIPPINES", defaultBoundingBox, printMessageType );


