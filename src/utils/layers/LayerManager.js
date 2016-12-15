/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import L from 'leaflet';
import forIn from 'lodash/forIn';
// Layers
import BubbleLayer from 'utils/layers/markers/BubbleLayer';
// Functions
import { getWaterSql, getFoodSql } from 'utils/filters/filters';

export default class LayerManager {

  // Constructor
  constructor(map, onLayerAddedSuccess = null, onLayerAddedError = null) {
    this._map = map;
    this._mapLayers = {};
    this._onLayerAddedSuccess = onLayerAddedSuccess;
    this._onLayerAddedError = onLayerAddedError;
  }

  /*
    Public methods
  */
  addLayer(layer, opts = {}) {
    const method = {
      leaflet: this._addLeafletLayer,
      arcgis: this._addEsriLayer,
      cartodb: this._addCartoLayer,
      geojson: this._addGeojsonLayer
    }[layer.provider];

    return method && method.call(this, layer, opts);
  }

  removeLayer(layerId) {
    if (this._mapLayers[layerId]) {
      this._map.removeLayer(this._mapLayers[layerId]);
      delete this._mapLayers[layerId];
    }
  }

  removeLayers() {
    Object.keys(this._mapLayers).forEach((id) => {
      if (this._mapLayers[id]) {
        this._map.removeLayer(this._mapLayers[id]);
        delete this._mapLayers[id];
      }
    });
  }

  /*
    Private methods
  */
  _addGeojsonLayer(layerSpec, opts) {
    const layer = layerSpec.layerConfig;
    const options = opts;
    layer.id = layerSpec.id;
    layer.sql = "with s as (SELECT iso, region, value, commodity FROM combined01_prepared where impactparameter='Yield' and year={{year}} and scenario='SSP2-GFDL' and iso is not null ), t as (SELECT iso, region, sum(value) as value FROM s group by iso, region), r as (select iso, region, value, 'allCrops' commodity from t union all select * from s), d as (select json_agg(crop) crops, region, geometry from (SELECT st_asgeojson(st_centroid(the_geom))  as geometry,  json_build_object('name',commodity,'slug',lower(commodity),'value', value) crop, region FROM impact_regions_159 t inner join  r on new_region=iso) c group by geometry, region) select json_build_object('type','FeatureCollection','features',json_agg(json_build_object('geometry',cast(geometry as json),'properties', json_build_object('crops',crops,'country',region),'type','Feature'))) as data from d";
    layer.params_config = [
      {
        key: 'year',
        required: true
      }
    ];

  }


  _addLeafletLayer(layerSpec, { zIndex }) {
    const layerData = layerSpec.layerConfig;

    let layer;

    layerData.id = layerSpec.id;

    // Transforming data layer
    // TODO: improve this
    if (layerData.body.crs && L.CRS[layerData.body.crs]) {
      layerData.body.crs = L.CRS[layerData.body.crs.replace(':', '')];
      layerData.body.pane = 'tilePane';
    }

    switch (layerData.type) {
      case 'wms':
        layer = new L.tileLayer.wms(layerData.url, layerData.body); // eslint-disable-line
        break;
      case 'tileLayer':
        if (layerData.body.indexOf('style: "function') >= 0) {
          layerData.body.style = eval(`(${layerData.body.style})`); // eslint-disable-line
        }
        layer = new L.tileLayer(layerData.url, layerData.body); // eslint-disable-line
        break;
      default:
        throw new Error('"type" specified in layer spec doesn`t exist');
    }

    if (layer) {
      const eventName = (layerData.type === 'wms' ||
      layerData.type === 'tileLayer') ? 'tileload' : 'load';
      layer.on(eventName, () => {
        this._onLayerAddedSuccess && this._onLayerAddedSuccess(layer);
      });
      if (zIndex) {
        layer.setZIndex(zIndex);
      }
      this._mapLayers[layerData.id] = layer;
    }
  }

  _addEsriLayer(layerSpec, { zIndex }) {
    const layer = layerSpec.layerConfig;
    layer.id = layerSpec.id;

    // Transforming layer
    // TODO: change this please @ra
    const bodyStringified = JSON.stringify(layer.body || {})
      .replace(/"mosaic-rule":/g, '"mosaicRule":')
      .replace(/"use-cors"/g, '"useCors"');

    if (L.esri[layer.type]) {
      const layerConfig = JSON.parse(bodyStringified);
      layerConfig.pane = 'tilePane';
      if (layerConfig.style &&
        layerConfig.style.indexOf('function') >= 0) {
        layerConfig.style = eval(`(${layerConfig.style})`); // eslint-disable-line
      }
      const newLayer = L.esri[layer.type](layerConfig);
      newLayer.on('load', () => {
        this._onLayerAddedSuccess && this._onLayerAddedSuccess(layer);
        const layerElement = this._map.getPane('tilePane').lastChild;
        if (zIndex) {
          layerElement.style.zIndex = zIndex;
        }
        layerElement.id = layer.id;
      });
      newLayer.addTo(this._map);
      this._mapLayers[layer.id] = newLayer;
    } else {
      throw new Error('"type" specified in layer spec doesn`t exist');
    }
  }

  _addCartoLayer(layerSpec, opts) {
    const layer = Object.assign({}, layerSpec.layerConfig, {
      id: layerSpec.id,
      category: layerSpec.category
    });
    const options = opts;

    switch (layer.category) {
      case 'water': {
        const body = getWaterSql(layer, options);
        const request = new Request(`https://${layer.account}.cartodb.com/api/v1/map`, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(body)
        });

        // add to the load layers lists before the fetch
        // to avoid multiples loads while the layer is loading
        this._mapLayers[layer.id] = true;
        fetch(request)
          .then((res) => {
            if (!res.ok) {
              const error = new Error(res.statusText);
              error.response = res;
              throw error;
            }
            return res.json();
          })
          .then((data) => {
            // we can switch off the layer while it is loading
            const tileUrl = `https://${layer.account}.cartodb.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;

            this._mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this._map).setZIndex(1000);

            this._mapLayers[layer.id].on('load', () => {
              this._onLayerAddedSuccess && this._onLayerAddedSuccess(layer);
            });
            this._mapLayers[layer.id].on('tileerror', () => {
              this._onLayerAddedError && this._onLayerAddedError(layer);
            });
          })
          .catch((err) => {
            this._onLayerAddedError && this._onLayerAddedError(layer);
          });
        break;
      }

      case 'food': {
        const body = getFoodSql(layer, options);
        // Get the sql from the current layer instead of hardcoding it
        const request = new Request(body.url, {
          method: 'GET'
        });

        fetch(request)
          .then((res) => {
            if (!res.ok) {
              const error = new Error(res.statusText);
              error.response = res;
              throw error;
            }
            return res.json();
          })
          .then((data) => {
            const geojson = data.rows[0].data.features;
            this._mapLayers[layer.id] = new BubbleLayer(
              geojson, {}
            ).addTo(this._map);
            this._onLayerAddedSuccess && this._onLayerAddedSuccess(layer);
          })
          .catch((err) => {
            console.error('Request failed', err);
            this._onLayerAddedError && this._onLayerAddedError(layer);
          });
        break;
      }

      default:
        throw new Error('"category" specified in layer spec doesn`t exist');
    }
  }
}
