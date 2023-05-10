# AISstreamer

Client for AISstream socket API. It uses [AISstream free (and experimental) API](https://aisstream.io/) to track specific, single, ships.

## Installation

It should be as easy as `npm install AISstreamer`.

## Use

There's a single function, `AIStrack`:

```JS
import { AIStrack } from "../lib/index.js";
/** API_KEY needs to be defined as an environment variable */
const API_KEY = process.env.AISSTREAM_API_KEY;

/** The exact ship name needs to be used; this might include the company name */
const SHIP_NAME = process.env.SHIP_NAME.toUpperCase();

AIStrack(API_KEY, SHIP_NAME);
```

This will use the default callback, which simply prints the JSON message, every time it finds the ship. Please read the documentation if you want to change the tracked zone, as well as have a different callback called when the ship is found

## AISstream messages

Every message will have a form similar to this one

```JSON
 {
  Message: {
    ShipStaticData: {
      AisVersion: 2,
      CallSign: 'ZGIJ3',
      Destination: 'ANTIBES',
      Dimension: [Object],
      Dte: false,
      Eta: [Object],
      FixType: 3,
      ImoNumber: 9794549,
      MaximumStaticDraught: 3.3,
      MessageID: 5,
      Name: 'PAPA',
      RepeatIndicator: 0,
      Spare: false,
      Type: 37,
      UserID: 319156300,
      Valid: true
    }
  },
  MessageType: 'ShipStaticData',
  MetaData: {
    MMSI: 319156300,
    ShipName: 'PAPA',
    latitude: 43.587181666666666,
    longitude: 7.130946666666667,
    time_utc: '2023-05-10 11:46:52.509865357 +0000 UTC'
  }
}
```

That is, there are three keys: `Message`, `MessageType`, `Metadata`. The value of `MessageType` will be also the single key in `Message`. The content of this message will vary with the type of data; however, the `Metadata` part will remain invariable, and it contains the name of the ship as well as the [MMSI](https://en.wikipedia.org/wiki/Maritime_Mobile_Service_Identity)

## LICENSE


(c) JJ Merelo, 2023

This is released under the GPL-3.0 license. See [LICENSE](LICENSE) for more information.