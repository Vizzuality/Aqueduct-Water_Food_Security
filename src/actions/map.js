export const setMapLocation = locationParams => ({
  type: 'SET_MAP_LOCATION',
  payload: locationParams
});

export const setBasemap = basemap => ({
  type: 'SET_BASEMAP',
  payload: basemap
});

export default {
  setMapLocation,
  setBasemap
};
