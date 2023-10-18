import { readFileSync } from "fs";
import { WebSocket, Server } from "mock-socket";
import { strictEqual } from "node:assert";
import { AIS_API_URL, AIStrackAll } from "../lib/index.js";

describe("test server", () => {
  let count = 0;
  let messageExamples;

  const server = new Server(AIS_API_URL);
  const socket = new WebSocket(AIS_API_URL);

  function callback(message) {
    count++;
    describe("test message " + count, () => {
      it("get the correct type of message", (done) => {
        strictEqual(Object.keys(message.Message)[0], message.MessageType);
        done();
      });
    });
  }

  before((done) => {
    messageExamples = JSON.parse(readFileSync("tests/message_examples.json"));

    server.on("connection", (socket) => {
      console.log("connected " + socket.url);
      for (const message of Object.keys(messageExamples)) {
        socket.send(JSON.stringify(messageExamples[message]));
      }
      done();
    });

    socket.addEventListener("error", (event) => {
      console.error(event);
    });
    socket.addEventListener("message", (event) => {
      const aisMessage = JSON.parse(event.data);
      callback(aisMessage);
    });
  });

  describe("Now test", () => {
    it("test AIStrackAll", (done) => {
      strictEqual(count, Object.keys(messageExamples).length);
      done();
    });
  });
});
//  AIStrackAll("API_KEY", defaultBoundingBox, callback, server);
