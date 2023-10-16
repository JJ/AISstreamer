import { createSocket } from "../lib/index.ts";

// read environment variable from command line
const API_KEY = Deno.env.get("AISSTREAM_API_KEY");

createSocket(API_KEY);
