# AISstreamer [![Test and generate docs](https://github.com/JJ/AISstreamer/actions/workflows/test-and-gen-docs.yml/badge.svg)](https://github.com/JJ/AISstreamer/actions/workflows/test-and-gen-docs.yml)

Client for AISstream socket API. It uses [AISstream free (and experimental)
API](https://aisstream.io/) to track specific, single, ships (in the first
version).

## Installation

It should be as easy as `npm install aisstreamer`.

## Documentation

Documentation is hosted at [GitHub pages](https://jj.github.io/AISstreamer); regenerate it locally after changes with `npm run doc`. If you fork this repository and give the fork the necessary permissions, the included workflow will do that for you.

## Use

Two exported functions, `AISTrackAll` and `AISTrack`, as well as a constant, `defaultBoundingBox`

```JS
import { AIStrack, AISTrackAll, defaultBoundingBox } from "aisstreamer";

// API_KEY can be defined as an environment variable
const API_KEY = process.env.AISSTREAM_API_KEY;

// Execute the callback for every message related to vessels in the box
AISTrackAll(API_KEY,
            defaultBoundingBox,
            (msg) => console.log( msg["MessageType"]));

// The exact ship name needs to be used; this might include the company name
const SHIP_NAME = process.env.SHIP_NAME.toUpperCase();

AIStrack(API_KEY, SHIP_NAME);
```

This will use the default callback, which simply prints the message in JSON
format, every time it finds the ship. Please read the documentation if you want
to change the tracked zone, as well as have a different callback called when the
ship is found. Please check out the [reference](https://jj.github.io/AISstreamer/global.html#AIStrack) for a more extensive explanation, and the [`examples` directory](examples/) for a few scripts that use this.

## AISstream messages

Every message received from AISstream will have a form similar to this one

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

That is, there are three keys: `Message`, `MessageType`, `Metadata`. The value
of `MessageType` will be also the single key in `Message`. The content of this
message will vary with the type of data; however, the `Metadata` part will
remain invariable, and it contains the name of the ship as well as the
[MMSI](https://en.wikipedia.org/wiki/Maritime_Mobile_Service_Identity) for the ship we're tracking

## Versions

* `0.0.1` Initial version.
* `0.0.2` Refactoring with several functions, mainly a general `AISTrackAll` that does not focus on a single ship. Bugs eliminated.

## LICENSE

(c) JJ Merelo, 2023

This is released under the GPL-3.0 license. See [LICENSE](LICENSE) for more information.
