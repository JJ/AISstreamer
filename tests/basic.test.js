import { readFileSync } from "fs";
import path from "path";
import { Server } from "mock-socket";
import { AIS_API_URL, AIStrackAll } from "../lib/index.js";
import { strictEqual } from "node:assert";

describe("socket mock test", () => {
  let server;

  before(() => {
    server = new Server(AIS_API_URL);

    const messageExamples = JSON.parse(
      readFileSync(path.join(__dirname, "message_examples.json"), "utf8")
    );

    server.on("connection", (socket) => {
      const messageType = Object.keys(messageExamples);
      const message =
        obj[messageType[(messageType.length * Math.random()) << 0]];
      socket.send(JSON.stringify(message));
    });
  });

  let count = 0;
  function callback(message) {
    console.log(message);
    count++;
    if (count === 5) {
      server.close();
    }
  }
  AIStrackAll("API_KEY", callback);

  it("should have sent 5 messages", (done) => {
    strictEqual(count, 5);
    done();
  });
});
