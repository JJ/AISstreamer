import WebSocket from "ws";

const AIS_API_URL = "wss://stream.aisstream.io/v0/stream";

export function AIStrack(
  apiKey,
  shipName,
  boundingBoxes = [
    [
      [-90, -180],
      [90, 180],
    ],
  ],
  callback = (message) => console.log(message)
) {
  const socket = new WebSocket(AIS_API_URL);
  const SHIPNAME = shipName.toUpperCase();
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
    let thisShipName = metadata["ShipName"];
    thisShipName = thisShipName.trim();
    if (thisShipName === SHIPNAME) {
      callback(aisMessage);
    }
  });
}
