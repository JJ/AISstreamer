import AISStreamer from "../lib/index.js
"
const API_KEY = process.env.AISSTREAM_API_KEY;
const SHIP_NAME = process.env.SHIP_NAME.toUpperCase();


const tracker = new AISStreamer( API_KEY, SHIP_NAME)
