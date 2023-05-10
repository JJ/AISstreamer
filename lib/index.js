import WebSocket from "ws";

const AIS_API_URL = "wss://stream.aisstream.io/v0/stream";

class AISstreamer {
  constructor(
    apiKey,
    boundingBoxes = [
      [
        [-90, -180],
        [90, 180],
      ],
    ],
    apiKey,
    shipName,
    callback = (message) =>  console.log( message)
  ) {
      const socket = new WebSocket();
    const SHIPNAME= shipName.toUpperCase();
    socket.addEventListener("open", (_) => {
      const subscriptionMessage = {
        APIkey: apiKey,
        BoundingBoxes: boundingBoxes,
      };
      socket.send(JSON.stringify(subscriptionMessage));
    });

    socket.addEventListener("error", (event) => {
      console.error(event);
    });

    socket.addEventListener("message", (event) => {
      const aisMessage = JSON.parse(event.data);
      const metadata = aisMessage["MetaData"];
      const thisShipName = metadata["ShipName"].trim();
      if ( thisShipName === SHIPNAME) {
        callback( aisMessage )
      }

  }
}
