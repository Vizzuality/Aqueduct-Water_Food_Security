import { createSelector } from 'reselect';

// Get the layers and filters from state
const layers = state => state.layers;
const filters = state => state.filters;

// Create a function to compare the current active datatasets and the current layersIds
const getActiveLayers = (_layers, _filters) => {
  // TODO: filter _layers using _filters
  return {
    list: _layers.list
  };
};

// Export the selector
export default createSelector(
  layers,
  filters,
  getActiveLayers
);
