export const setMapLocation = locationParams => ({
  type: 'SET_MAP_LOCATION',
  payload: locationParams
});

export const setLayerParametrization = layerParametrization => ({
  type: 'SET_LAYER_PARAMETRIZATION',
  payload: layerParametrization
});

export default {
  setMapLocation,
  setLayerParametrization
};
