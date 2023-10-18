import { readFileSync } from "fs";
import { WebSocket, Server } from "mock-socket";
import { AIS_API_URL } from "../lib/test-mock.js";

  const server new Server(AIS_API_URL);

  let count = 0;
  function callback(message) {
    count++;
    if (count === 5) {
      socket.close();
    }
    console.log(message, count);
  }


    const messageExamples = JSON.parse(
      readFileSync("message_examples.json")
    );

    server.on("connection", (socket) => {
      const messageType = Object.keys(messageExamples);
      const message =
        messageExamples[messageType[(messageType.length * Math.random()) << 0]];
      socket.send(JSON.stringify(message));
    });

    const socket = new WebSocket(AIS_API_URL);
    socket.addEventListener("open", (_) => {
      const subscriptionMessage = {
        APIkey: "API_KEY",
        BoundingBoxes: defaultBoundingBox,
      };
      socket.send(JSON.stringify(subscriptionMessage));
    });
    socket.addEventListener("error", (event) => {
      console.error(event);
    });
    socket.addEventListener("message", (event) => {
      const aisMessage = JSON.parse(event.data);
      callback(aisMessage);
    });
    socket.addEventListener("close", () => {
      it("should have sent 5 messages", (done) => {
        strictEqual(count, 5);
        done();
      });
    });
  });

  //  AIStrackAll("API_KEY", defaultBoundingBox, callback, server);
});
