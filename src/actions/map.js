export const setMapLocation = locationParams => ({
  type: 'SET_MAP_LOCATION',
  payload: locationParams
});

export const setBasemap = basemap => ({
  type: 'SET_BASEMAP',
  payload: basemap
});

export const setLayerParametrization = params => ({
  type: 'SET_PARAMETRIZATION',
  payload: params
});

export default {
  setMapLocation,
  setBasemap,
  setLayerParametrization
};
