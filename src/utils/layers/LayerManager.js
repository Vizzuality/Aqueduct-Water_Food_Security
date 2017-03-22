/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import 'whatwg-fetch';
import L from 'leaflet/dist/leaflet';
import esri from 'esri-leaflet';
// Layers
import BubbleClusterLayer from 'utils/layers/markers/BubbleClusterLayer';
// Functions
import { getObjectConversion } from 'utils/filters/filters';

// adding support for esri
L.esri = esri;

export default class LayerManager {

  // Constructor
  constructor(map, options = {}) {
    this._map = map;
    this._mapLayers = {};
    this._mapRequests = {};
    this._layersLoading = {};
    this._rejectLayersLoading = false;
    this._onLayerAddedSuccess = options.onLayerAddedSuccess;
    this._onLayerAddedError = options.onLayerAddedError;
  }

  /*
    Public methods
  */
  addLayer(layer, opts = {}) {
    const method = {
      cartodb: this._addCartoLayer
    }[layer.provider];

    method && method.call(this, layer, opts);
    this._execCallback()
      .then(() => {
        this._onLayerAddedSuccess && this._onLayerAddedSuccess();
      })
      .catch(() => {
        this._layersLoading = {};
        this._rejectLayersLoading = false;
        this._onLayerAddedError && this._onLayerAddedError();
      });
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
    this._layersLoading = {};
  }

  /*
    Private methods
  */
  _execCallback() {
    return new Promise((resolve, reject) => {
      const loop = () => {
        if (!Object.keys(this._layersLoading).length) return resolve();
        if (this._rejectLayersLoading) return reject();
        setTimeout(loop);
      };
      setTimeout(loop);
    });
  }

  _getLayerConfigParsed(_layerConfig) {
    return {
      layers: _layerConfig.body.layers.map((l) => {
        return Object.assign({}, l, {
          options: Object.assign({}, l.options, {
            user_name: _layerConfig.account,
            cartocss_version: l.options.cartocssVersion
          })
        });
      })
    };
  }

  _addCartoLayer(layerSpec, opts) {
    const layerConfig = Object.assign({}, layerSpec.layerConfig, {
      id: layerSpec.id,
      category: layerSpec.category
    });
    const options = opts;

    if (this._mapRequests[layerConfig.category]) {
      if (this._mapRequests[layerConfig.category].readyState !== 4) {
        this._mapRequests[layerConfig.category].abort();
        delete this._mapRequests[layerConfig.category];
        delete this._layersLoading[layerConfig.id];
      }
    }

    switch (layerConfig.category) {
      case 'water': {
        const layerConfigConverted = getObjectConversion(layerConfig, options, 'water');
        const layerConfigParsed = Object.assign({}, layerConfigConverted, Object.assign({
          body: this._getLayerConfigParsed(layerConfigConverted)
        }));

        this._layersLoading[layerConfig.id] = true;
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', `https://${layerConfig.account}.carto.com/api/v1/map`);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify(layerConfigParsed.body));

        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
              const data = JSON.parse(xmlhttp.responseText);

              const tileUrl = `https://${layerConfig.account}.carto.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;

              this._mapLayers[layerConfig.id] = L.tileLayer(tileUrl).addTo(this._map).setZIndex(998);

              this._mapLayers[layerConfig.id].on('load', () => {
                delete this._layersLoading[layerConfig.id];
              });
              this._mapLayers[layerConfig.id].on('tileerror', () => {
                this._rejectLayersLoading = true;
              });
            } else {
              this._rejectLayersLoading = true;
            }
          }
        };

        this._mapRequests[layerConfig.category] = xmlhttp;

        break;
      }

      case 'food': {
        const layerConfigConverted = getObjectConversion(layerConfig, options, 'food');

        this._layersLoading[layerConfig.id] = true;
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', layerConfigConverted.body.url);
        xmlhttp.send();

        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
              const data = JSON.parse(xmlhttp.responseText);
              const geojson = data.rows[0].data.features || [];
              this._mapLayers[layerConfig.id] = new BubbleClusterLayer(
                geojson, layerConfig
              ).addTo(this._map);

              delete this._layersLoading[layerConfig.id];
            } else {
              this._rejectLayersLoading = true;
            }
          }
        };

        this._mapRequests[layerConfig.category] = xmlhttp;
        break;
      }

      default: {
        const layerConfigConverted = getObjectConversion(layerConfig, options, 'water');
        const layerConfigParsed = Object.assign({}, layerConfigConverted, Object.assign({
          body: this._getLayerConfigParsed(layerConfigConverted)
        }));

        this._layersLoading[layerConfig.id] = true;
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', `https://${layerConfig.account}.carto.com/api/v1/map`);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify(layerConfigParsed.body));

        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
              const data = JSON.parse(xmlhttp.responseText);
              // we can switch off the layer while it is loading
              const tileUrl = `https://${layerConfig.account}.carto.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;

              this._mapLayers[layerConfig.id] = L.tileLayer(tileUrl).addTo(this._map).setZIndex(999);

              this._mapLayers[layerConfig.id].on('load', () => {
                delete this._layersLoading[layerConfig.id];
              });
              this._mapLayers[layerConfig.id].on('tileerror', () => {
                this._rejectLayersLoading = true;
              });
            } else {
              this._rejectLayersLoading = true;
            }
          }
        };

        this._mapRequests[layerConfig.category] = xmlhttp;
      }
    }
  }
}
