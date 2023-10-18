import { readFileSync } from "fs";
import { WebSocket, Server } from "mock-socket";
import { AIS_API_URL } from "../lib/test-mock.js";

const server = new Server(AIS_API_URL);
const socket = new WebSocket(AIS_API_URL);

let count = 0;
function callback(message) {
  count++;
  if (count == 5) {
    socket.close();
  }
  console.log(message, count);
}

const messageExamples = JSON.parse(readFileSync("message_examples.json"));

server.on("connection", (socket) => {
  console.log("connected " + socket.url);
  for (const message of Object.keys(messageExamples)) {
    socket.send(JSON.stringify(messageExamples[message]));
  }
});

socket.addEventListener("error", (event) => {
  console.error(event);
});
socket.addEventListener("message", (event) => {
  const aisMessage = JSON.parse(event.data);
  callback(aisMessage);
});
socket.addEventListener("close", () => {
  console.log("socket closed after ", count, " messages");
});
