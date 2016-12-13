/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import L from 'leaflet';

import BubbleLayer from 'utils/interfaces/markers/BubbleLayer';

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
      marker: this._addMarkerLayer
    }[layer.provider];

    return method && method.call(this, layer, opts);
  }

  removeLayer(layerId) {
    this._map.removeLayer(this._mapLayers[layerId]);
    delete this._mapLayers[layerId];
  }

  /*
    Private methods
  */
  _addMarkerLayer(layerSpec) {
    const layer = layerSpec.layerConfig;
    layer.id = layerSpec.id;

    switch (layer.type) {
      case 'bubble': {
        // Get the sql from the current layer instead of hardcoding it
        const sql = "with r as (SELECT iso, value, commodity FROM combined01_prepared where   impactparameter='Food Demand' and year= 2020 and scenario='SSP2-GFDL') select geom, jsonb_object_agg(commodity, value) properties from (SELECT st_asgeojson(st_centroid(the_geom)) geom,  commodity, value FROM impact_regions_159 t inner join  r on new_region=iso) c group by geom";
        const request = new Request(`https://wri-01.cartodb.com/api/v2/sql/?q=${sql}`, {
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
            this._mapLayers[layer.id] = new BubbleLayer(
              this._convertToGeoJson(data.rows), {}
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
        throw new Error('"type" specified in layer spec doesn`t exist');
    }
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

  _addCartoLayer(layerSpec, { zIndex }) {
    const layer = layerSpec.layerConfig;
    layer.id = layerSpec.id;

    const request = new Request(`https://${layer.account}.cartodb.com/api/v1/map`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: layer.body
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
        if (zIndex) {
          this._mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this._map).setZIndex(zIndex);
        }
        this._mapLayers[layer.id].on('load', () => {
          this._onLayerAddedSuccess && this._onLayerAddedSuccess(layer);
        });
        this._mapLayers[layer.id].on('tileerror', () => {
          this._onLayerAddedError && this._onLayerAddedError(layer);
        });
      })
      .catch((err) => {
        console.error('Request failed', err);
        this._onLayerAddedError && this._onLayerAddedError(layer);
      });
  }

  // This function should be unnecessary if the response from the query is done well
  static _convertToGeoJson(items) {
    return items.map((item) => {
      return {
        type: 'Feature',
        properties: JSON.parse(item.properties),
        geometry: JSON.parse(item.geom)
      };
    });
  }

}
