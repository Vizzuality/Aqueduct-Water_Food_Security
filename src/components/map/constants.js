export const MAP_OPTIONS = {
  detectRetina: true,
  scrollWheelZoom: true,
  zoom: 3,
  minZoom: 2,
  maxZoom: 15,
  center: {
    lat: 30,
    lng: -15
  },
  bounds: {
    bbox: null,
    options: { paddingTopLeft: [0, 0] }
  }
};

export const BASEMAP_LAYER_CONFIG = {
  url: 'https://api.tiles.mapbox.com/v4/wri.c974eefc/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid3JpIiwiYSI6IjU3NWNiNGI4Njc4ODk4MmIyODFkYmJmM2NhNDgxMWJjIn0.v1tciCeBElMdpnrikGDrPg',
  options: { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>' }
};

export const LABEL_LAYER_CONFIG = {
  url: 'https://api.tiles.mapbox.com/v4/wri.acf5a04e/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid3JpIiwiYSI6IjU3NWNiNGI4Njc4ODk4MmIyODFkYmJmM2NhNDgxMWJjIn0.v1tciCeBElMdpnrikGDrPg',
  options: { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>' }
};

export const ZOOM_DISPLAYS_TOP = [2, 3];

export const MARKER_LAYER = {
  id: 'marker-layer',
  provider: 'leaflet',
  layerConfig: {
    body: [],
    parse: false,
    type: 'featureGroup'
  },
  legendConfig: {}
};

export default {
  MAP_OPTIONS,
  BASEMAP_LAYER_CONFIG,
  LABEL_LAYER_CONFIG,
  ZOOM_DISPLAYS_TOP,
  MARKER_LAYER
};
