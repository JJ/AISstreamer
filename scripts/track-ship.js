import { AIStrack } from "../lib/index.js";
/** API_KEY needs to be defined as an environment variable */
const API_KEY = process.env.AISSTREAM_API_KEY;

/** The exact ship name needs to be used; this might include the company name */
const SHIP_NAME = process.env.SHIP_NAME.toUpperCase();

AIStrack(API_KEY, SHIP_NAME);
