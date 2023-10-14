import {AIStrackAll, defaultBoundingBox} from "../lib/index.js";

function printMessageType( message ) {
    console.log( message["MessageType"] );
    if ( message["MessageType"] == "BinaryAcknowledge" ) {
        console.log( message );
    }
}

const API_KEY = process.env.AISSTREAM_API_KEY;
AIStrackAll( API_KEY, defaultBoundingBox, printMessageType );


