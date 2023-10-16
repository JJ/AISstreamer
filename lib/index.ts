/**
 * URL used by the API; this might change if the version changes or at any time, since it's experimental
 */
const AIS_API_URL = "wss://stream.aisstream.io/v0/stream";

export const defaultBoundingBox = [
  [
    [-90, -180],
    [90, 180],
  ],
];

let socket = null;

// Creates a deno websocket client and subscribes to the AIS API
export function createSocket(apiKey, boundingBoxes = defaultBoundingBox) {
  if (socket) {
    return socket;
  }
  socket = new WebSocket(AIS_API_URL);

  socket.onopen = () => {
    console.log("Socket connected");
    socket.send(
      JSON.stringify({
        apiKey,
        boundingBoxes,
      })
    );
  };

  socket.onmessage = (event) => {
    const reader = new FileReader();
    console.log(event);
    const decodedBlob = reader.readAsText(event.data);
    console.log(decodedBlob);
  };

  socket.onclose = () => {
    console.log("Socket closed");
  };
  return socket;
}
