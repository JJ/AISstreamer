import { readFileSync } from "fs";
import { WebSocket, Server } from "mock-socket";
import { strictEqual } from "node:assert";
import {
  AIS_API_URL,
  globals,
  AIStrackAll,
  defaultBoundingBox,
} from "../lib/index.js";

describe("test server", () => {
  let count = 0;
  let messageExamples;

  const server = new Server(AIS_API_URL);
  const socket = new WebSocket(AIS_API_URL);

  function callback() {
    count++;
  }

  before((done) => {
    messageExamples = JSON.parse(readFileSync("tests/message_examples.json"));

    server.on("connection", (socket) => {
      for (const message of Object.keys(messageExamples)) {
        socket.send(JSON.stringify(messageExamples[message]));
      }
      done();
    });

    globals.AISsocket = socket;
    AIStrackAll("API_KEY", defaultBoundingBox, callback);
  });

  describe("Now test", () => {
    it("test AIStrackAll", (done) => {
      strictEqual(count, Object.keys(messageExamples).length);
      done();
    });
  });
});
//  AIStrackAll("API_KEY", defaultBoundingBox, callback, server);
