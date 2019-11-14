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

export const WATER_INDICATORS_METADATA = {
  'Water-Stress': {
    description: 'Measures the ratio of total annual water withdrawals to total available annual renewable supply, accounting for upstream consumptive use. Higher values indicate less water availability and more competition among users. Baseline values are generated using hydrological modeling of long-term trends from 1960 to 2014.',
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
    description: 'Measures trends in the decline of the groundwater table. The slope of the decline correlates to the severity of the trend. Baseline values are generated using hydrological modeling from 1990 to 2014.',
    sources: [
      {
        'source-url': 'https://www.wri.org/publication/aqueduct-30',
        'source-name': 'WRI Aqueduct 2019'
      }
    ]
  },
  'Interannual-Variability': {
    description: 'Measures the variability in water supply from year to year. It is an indicator of the unpredictability of supply. Baseline values are generated using hydrological modeling of long-term trends from 1960 to 2014.',
    sources: [
      {
        'source-url': 'https://www.wri.org/publication/aqueduct-30',
        'source-name': 'WRI Aqueduct 2019'
      }
    ]
  },
  'Seasonal-Variability': {
    description: 'Measures the variation in water supply between months of the year. Areas with high seasonal variability may have extreme wet and/or dry seasons. Baseline values are generated using hydrological modeling of long-term trends from 1960 to 2014.',
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
    description: 'Estimates the average magnitude of droughts based on the severity and frequency of periods of time during which soil moisture remains low. Baseline values are generated using hydrological modeling of long-term trends from 1960 to 2014.',
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
