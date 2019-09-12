import template from 'lodash/template';
import { concatenation } from 'layer-manager/dist/layer-manager';
import axios from 'axios';

// services
import { fetchQuery } from 'services/query';

// utils
import { reduceParams, reduceSqlParams } from 'utils/layers/params-parser';
import { getMarkerLayer } from 'utils/layers/markers/bubble-layer';

// constants
import { CROP_OPTIONS } from 'constants/crops';
import { ZOOM_DISPLAYS_TOP } from './constants';

export const getBuckets = (layer = {}) => {
  const { layerConfig, legendConfig, sqlParams } = layer;
  const { account } = layerConfig;
  const url = `https://${account}.carto.com/api/v2/sql`;
  const sqlQuery = concatenation(legendConfig.sql_query, sqlParams);

  return fetchQuery(url, { q: sqlQuery });
};

export const generateCartoCSS = (cartocss, params) => {
  const cartoCssTemplate = template(cartocss, { interpolate: /{{([\s\S]+?)}}/g });
  const { bucket, color } = params;

  return cartoCssTemplate({ bucket, color });
};

export const updateCartoCSS = async (layer = {}, options = {}) => {
  const { layerConfig } = layer;
  const data = await getBuckets(layer, options);
  const { bucket } = ((data || [])[0] || {});
  const cartocssTemplate = layerConfig.body.layers[0].options.cartocss;
  const { color } = CROP_OPTIONS.find(c => c.value === options.crop);

  if (!bucket) return ({ ...layer });

  const cartocss = generateCartoCSS(cartocssTemplate, { bucket, color });

  return ({
    ...layer,
    layerConfig: {
      ...layer.layerConfig,
      body: {
        ...layer.layerConfig.body,
        layers: [{
          ...layer.layerConfig.body.layers[0],
          options: {
            ...layer.layerConfig.body.layers[0].options,
            cartocss
          }
        }]
      }
    }
  });
};

export const getMarkersByZoom = (layer, _markers, zoom) => {
  let markers = _markers;
  const { options } = layer;
  const { sort, topSize, dataManipulator } = options || {};
  if (!markers.length) return [];

  const defaultSortFunction = (a, b) => {
    const valueA = Math.abs(+a.properties.value);
    const valueB = Math.abs(+b.properties.value);

    if (valueA < valueB) return sort === 'desc' ? 1 : -1;
    if (valueA > valueB) return sort === 'desc' ? -1 : 1;
    return 0;
  };

  if (ZOOM_DISPLAYS_TOP.includes(zoom)) {
    if (dataManipulator) return dataManipulator(markers);

    const sortedMarkers = markers.sort(defaultSortFunction);
    if (topSize && markers.length >= topSize) markers = sortedMarkers.slice(0, topSize);
  }

  return markers;
};


export const prepareMarkerLayer = async (_layer = {}, _params = {}, _zoom) => {
  const { layerConfig } = _layer;
  const {
    params_config: paramsConfig,
    sql_config: sqlConfig
  } = layerConfig;

  let params = _params;

  // changes baseline for 2010
  if (_params.year === 'baseline') {
    params = {
      ..._params,
      year: 2010
    };
  }

  const layer = {
    ..._layer,
    ...paramsConfig && { params: reduceParams(paramsConfig, params) },
    ...sqlConfig && { sqlParams: reduceSqlParams(sqlConfig, params) }
  };
  const { sqlParams } = layer;

  const layerUrl = concatenation(layerConfig.body.url, sqlParams);

  const geojson = await axios.get(layerUrl, {
    transformResponse: [].concat(
      axios.defaults.transformResponse,
      (data => ((data.rows || [])[0] || {}).data)
    )
  })
    .then((response) => {
      const { status, statusText, data } = response;
      if (status >= 300) throw new Error(statusText);
      return data;
    })
    .catch((error) => { console.error(error.message); });

  const markers = getMarkersByZoom(layer, geojson.features, _zoom);

  if (params.country) {
    const countryMaker = markers.filter(_marker => _marker.properties.iso === params.country);

    return getMarkerLayer(countryMaker, _layer);
  }

  return getMarkerLayer(markers, _layer);
};

export default {
  updateCartoCSS,
  prepareMarkerLayer
};
