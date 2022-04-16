export const DBConfig = {
  name: "TrackDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "tracks",
      storeConfig: { keyPath: "id" },
      storeSchema: [
        { name: "trackName", keypath: "trackName", options: { unique: false } },
        { name: "creator", keypath: "creator", options: { unique: false } },
        { name: "plays", keypath: "plays", options: { unique: false } },
        { name: "published", keypath: "published", options: { unique: false } },
        { name: "lines", keypath: "lines", options: { unique: false } },
      ],
    },
    {
      store: "autosave",
      storeConfig: { keyPath: "line" },
      storeSchema: [
        { name: "line", keypath: "line", options: { unique: false } },
      ],
    },
  ],
};
