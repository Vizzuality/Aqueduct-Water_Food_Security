/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import 'whatwg-fetch';
import L from 'leaflet/dist/leaflet';
import esri from 'esri-leaflet';
// Layers
import BubbleClusterLayer from 'utils/layers/markers/BubbleClusterLayer';
// Functions
import { makePromiseCancelable } from 'utils/utils';
import { getWaterSql, getFoodSql } from 'utils/filters/filters';

// adding support for esri
L.esri = esri;

export default class LayerManager {

  // Constructor
  constructor(map, options = {}) {
    this._map = map;
    this._mapLayers = {};
    this._mapRequests = {};
    this.layersLoading = {};
    this.rejectLayersLoading = false;
    this._onLayerAddedSuccess = options.onLayerAddedSuccess;
    this._onLayerAddedError = options.onLayerAddedError;
  }

  /*
    Public methods
  */
  addLayer(layer, opts = {}) {
    const method = {
      leaflet: this._addLeafletLayer,
      arcgis: this._addEsriLayer,
      cartodb: this._addCartoLayer
    }[layer.provider];

    method && method.call(this, layer, opts);
    this._execCallback()
      .then(() =>{
        this._onLayerAddedSuccess && this._onLayerAddedSuccess();
      })
      .catch(() => {
        this.rejectLayersLoading = false;
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
  }

  /*
    Private methods
  */
  _execCallback() {
    let timeout;
    const ready = new Promise((resolve, reject) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => reject(), 20000); // if it takes +20s something's wrong: reject the promise

      const loop = () => {
        if(!Object.keys(this.layersLoading).length) return resolve();
        if(this.rejectLayersLoading) return reject();
        setTimeout(loop);
      };
      setTimeout(loop);
    });
    return ready;
  }

  _addLeafletLayer(layerSpec, { zIndex }) {
    const layerData = layerSpec.layerConfig;

    let layer;

    layerData.id = layerSpec.id;
    this.layersLoading[layerData.id] = true;

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
        delete this.layersLoading[layerData.id];
        throw new Error('"type" specified in layer spec doesn`t exist');
    }

    if (layer) {
      const eventName = (layerData.type === 'wms' ||
      layerData.type === 'tileLayer') ? 'tileload' : 'load';
      layer.on(eventName, () => {
        delete this.layersLoading[layerData.id];
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

    this.layersLoading[layer.id] = true;
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
        delete this.layersLoading[layer.id];
        const layerElement = this._map.getPane('tilePane').lastChild;
        if (zIndex) {
          layerElement.style.zIndex = zIndex;
        }
        layerElement.id = layer.id;
      });
      newLayer.addTo(this._map);
      this._mapLayers[layer.id] = newLayer;
    } else {
      delete this.layersLoading[layer.id];
      this.rejectLayersLoading = true;
      throw new Error('"type" specified in layer spec doesn`t exist');
    }
  }

  _addCartoLayer(layerSpec, opts) {
    const layer = Object.assign({}, layerSpec.layerConfig, {
      id: layerSpec.id,
      category: layerSpec.category
    });
    const options = opts;

    if (this._mapRequests[layer.category]) {
      if (this._mapRequests[layer.category].readyState !== 4) {
        this._mapRequests[layer.category].abort();
        delete this._mapRequests[layer.category];
        delete this.layersLoading[layer.id];
      }
    }

    switch (layer.category) {
      case 'mask' : {
        const body = getWaterSql(layer, options);

        this.layersLoading[layer.id] = true;
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', `https://${layer.account}.carto.com/api/v1/map`);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify(body));

        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
              const data = JSON.parse(xmlhttp.responseText);
              // we can switch off the layer while it is loading
              const tileUrl = `https://${layer.account}.carto.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;

              this._mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this._map).setZIndex(999);

              this._mapLayers[layer.id].on('load', () => {
                delete this.layersLoading[layer.id];
              });
              this._mapLayers[layer.id].on('tileerror', () => {
                delete this.layersLoading[layer.id];
                this.rejectLayersLoading = true;
              });
            } else {
              delete this.layersLoading[layer.id];
              this.rejectLayersLoading = true;
            }
          }
        };

        this._mapRequests[layer.category] = xmlhttp;

        break;
      }

      case 'water': {
        const body = getWaterSql(layer, options);

        this.layersLoading[layer.id] = true;
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', `https://${layer.account}.carto.com/api/v1/map`);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify(body));

        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
              const data = JSON.parse(xmlhttp.responseText);

              const tileUrl = `https://${layer.account}.carto.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;

              this._mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this._map).setZIndex(998);

              this._mapLayers[layer.id].on('load', () => {
                delete this.layersLoading[layer.id];
              });
              this._mapLayers[layer.id].on('tileerror', () => {
                delete this.layersLoading[layer.id];
                this.rejectLayersLoading = true;
              });
            } else {
              delete this.layersLoading[layer.id];
              this.rejectLayersLoading = true;
            }
          }
        };

        this._mapRequests[layer.category] = xmlhttp;

        break;
      }

      case 'food': {
        const body = getFoodSql(layer, options);

        this.layersLoading[layer.id] = true;
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', body.url);
        xmlhttp.send();

        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
              const data = JSON.parse(xmlhttp.responseText);
              const geojson = data.rows[0].data.features || [];
              this._mapLayers[layer.id] = new BubbleClusterLayer(
                geojson, layer
              ).addTo(this._map);

              delete this.layersLoading[layer.id];
            } else {
              delete this.layersLoading[layer.id];
              this.rejectLayersLoading = true;
            }
          }
        };

        this._mapRequests[layer.category] = xmlhttp;
        break;
      }

      default:
        throw new Error('"category" specified in layer spec doesn`t exist');
    }
  }
}
