import { AIStrackAll, defaultBoundingBox } from "../lib/index.js";
import {writeFileSync} from "fs";
let messageExamples = {};

function storeMessage(message) {
  const messageType = message["MessageType"];
  if ( ! messageExamples.hasOwnProperty(messageType) ) {
    console.log( "New message type: " + messageType );
    messageExamples[messageType] = message;
    writeFileSync( "message_examples.json", JSON.stringify( messageExamples ) );
  }
}

const API_KEY = process.env.AISSTREAM_API_KEY;
AIStrackAll(API_KEY, defaultBoundingBox, storeMessage);
