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
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noopener noreferrer">© Mapbox</a>' }
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
  url: 'https://api.mapbox.com/styles/v1/resourcewatch/ckae642b911g51ip324e0c4pr/tiles/256/%7Bz%7D/%7Bx%7D/%7By%7D@2x?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
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

export const WATER_INDICATORS_METADATA = {
  'Water-Stress': {
    description: 'Water stress measures the ratio of total water withdrawals to available renewable surface and groundwater supplies. Water withdrawals include domestic, industrial, irrigation, and livestock consumptive and nonconsumptive uses. Available renewable water supplies include the impact of upstream consumptive water users and large dams on downstream water availability. Higher values indicate more competition among users.',
    sources: [
      {
        'source-url': 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using',
        'source-name': 'WRI Aqueduct 2015'
      },
      {
        'source-url': 'https://www.wri.org/publication/aqueduct-30',
        'source-name': 'WRI Aqueduct 2019'
      }
    ]
  },
  'Groundwater-Table-Decline': {
    description: 'Groundwater table decline measures the average decline of the groundwater table as the average change for the period of study (1990–2014). The result is expressed in centimeters per year (cm/yr). Higher values indicate higher levels of unsustainable groundwater withdrawals.',
    sources: [
      {
        'source-url': 'https://www.wri.org/publication/aqueduct-30',
        'source-name': 'WRI Aqueduct 2019'
      }
    ]
  },
  'Interannual-Variability': {
    description: 'Interannual variability measures the average between-year variability of available water supply, including both renewable surface and groundwater supplies. Higher values indicate wider variations in available supply from year to year.',
    sources: [
      {
        'source-url': 'https://www.wri.org/publication/aqueduct-30',
        'source-name': 'WRI Aqueduct 2019'
      }
    ]
  },
  'Seasonal-Variability': {
    description: 'Seasonal variability measures the average within-year variability of available water supply, including both renewable surface and groundwater supplies. Higher values indicate wider variations of available supply within a year.',
    sources: [
      {
        'source-url': 'http://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using',
        'source-name': 'WRI Aqueduct 2015'
      },
      {
        'source-url': 'https://www.wri.org/publication/aqueduct-30',
        'source-name': 'WRI Aqueduct 2019'
      }
    ]
  },
  'Drought-Risk': {
    description: 'Drought risk measures where droughts are likely to occur, the population and assets exposed, and the vulnerability of the population and assets to adverse effects. Higher values indicate higher risk of drought.',
    sources: [
      {
        'source-url': 'https://www.wri.org/publication/aqueduct-30',
        'source-name': 'WRI Aqueduct 2019'
      }
    ]
  },
  'Coastal-Eutrophication-Potential': {
    description: 'Coastal eutrophication potential (CEP) measures the potential for riverine loadings of nitrogen (N), phosphorus (P), and silica (Si) to stimulate harmful algal blooms in coastal waters. The CEP indicator is a useful metric to map where anthropogenic activities produce enough point-source and nonpoint-source pollution to potentially degrade the environment. When N and P are discharged in excess over Si with respect to diatoms, a major type of algae, undesirable algal species often develop. The stimulation of algae leading to large blooms may in turn result in eutrophication and hypoxia (excessive biological growth and decomposition that reduces oxygen available to other organisms). It is therefore possible to assess the potential for coastal eutrophication from a river’s N, P, and Si loading. Higher values indicate higher levels of excess nutrients with respect to silica, creating more favorable conditions for harmful algal growth and eutrophication in coastal waters downstream.',
    sources: [
      {
        'source-url': 'https://www.wri.org/publication/aqueduct-30',
        'source-name': 'WRI Aqueduct 2019'
      }
    ]
  }
};

export default {
  MAP_OPTIONS,
  BASEMAPS,
  BASEMAP_LAYER_CONFIG,
  LABEL_LAYER_CONFIG,
  ZOOM_DISPLAYS_TOP,
  MARKER_LAYER,
  WATER_INDICATORS_METADATA
};
