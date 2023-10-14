import WebSocket from "ws";

/**
 * URL used by the API; this might change if the version changes or at any time, since it's experimental
 */
const AIS_API_URL = "wss://stream.aisstream.io/v0/stream";

export const defaultBoundingBox = [
  [-90, -180],
  [90, 180],
];

/**
 * Track a specific ship in a specific zone. The ship is referred to by name; the zone is by default a single bounding box.
 * Please check the README and documentation for message formats.

 * @param { String } apiKey AISStream API key
 * @param { String } shipName The ship name in ALL CAPS, which is how they are stored
 * @param { Array } boundingBoxes This is an array of bounding boxes, that is, a set of two corners where latitude goes first, longitude next. You can check out these in your favorite map application. Ships only within those bounding boxes will be tracked. By default, the bounding box includes all latitudes and longitudes
 * @param { function } callback Function called every time an AIS message for that ship is found. This function takes the message as an argument.
 *
 */
export function AIStrack(
  apiKey,
  shipName,
  boundingBoxes = defaultBoundingBox,
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
