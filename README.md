## OSM Address Parser
This is a simple web app that uses the [parse-address library](https://github.com/hassansin/parse-address/tree/master) to convert an address string into JOSM or iD tag structure to ease addition into OpenStreetMap. Because of limitations of the underlying library, it will only work for strings that look like US based addresses. Make sure to review any tags for completeness and accuracy before uploading to OSM.

It is currently deployed at [https://osm-address-parser.vercel.app/](https://osm-address-parser.vercel.app/)

### To run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
