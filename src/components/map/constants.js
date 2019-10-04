export const MAP_OPTIONS = {
  detectRetina: true,
  scrollWheelZoom: true,
  zoom: 3,
  minZoom: 2,
  maxZoom: 9,
  center: {
    lat: 30,
    lng: -15
  }
};

export const BASEMAP_LAYER_CONFIG = {
  url: 'https://api.mapbox.com/styles/v1/resourcewatch/cjtr6fhr3060g1fok829tfwm7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
  options: { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>' }
};

export const BASEMAPS = {
  // Open Street Maps
  osm: {
    id: 'osm',
    value: 'https://api.tiles.mapbox.com/v4/wri.c974eefc/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid3JpIiwiYSI6IjU3NWNiNGI4Njc4ODk4MmIyODFkYmJmM2NhNDgxMWJjIn0.v1tciCeBElMdpnrikGDrPg',
    label: 'Light',
    options: { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>' }
  },
  satellite: {
    id: 'satellite',
    value: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    label: 'Satellite',
    options: { attribution: '&copy; <a href="https://www.google.com/maps/@15,-2.970703,3z?hl=es" target="_blank">Google</a>' }
  },
  terrain: {
    id: 'terrain',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqi456h02pg2rp6w2mwp61c/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Terrain',
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>' }
  },
  hydro: {
    id: 'hydro',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjtr6fhr3060g1fok829tfwm7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Hydrography',
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>' }
  }
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
  BASEMAPS,
  BASEMAP_LAYER_CONFIG,
  LABEL_LAYER_CONFIG,
  ZOOM_DISPLAYS_TOP,
  MARKER_LAYER
};
