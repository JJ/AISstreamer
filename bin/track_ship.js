import {AIStrack, defaultBoundingBox} from "../lib/index.js";

const shipName = process.argv[2].toUpperCase();

console.log( "Tracking ship: " + shipName );

function printShipMessage( message ) {
    if ("MetaData" in message) {
        const metadata = message["MetaData"];
        let thisShipName = metadata["ShipName"];
        thisShipName = thisShipName.trim();
        if (thisShipName === shipName) {
            console.log(message);
        }
    }
}

const API_KEY = process.env.AISSTREAM_API_KEY;
AIStrack( API_KEY, shipName, defaultBoundingBox, printShipMessage );


