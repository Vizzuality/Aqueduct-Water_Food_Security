import { createSelector } from 'reselect';

// Get the datasets and filters from state
const datasets = state => state.datasets;
const filters = state => state.filters;

// Create a function to compare the current active datatasets and the current datasetsIds
const getActiveLayers = (_datasets, _filters) => {
  const layerList = [];
  let layer;
  _datasets.list.forEach((dataset) => {
    if (dataset.layer.length) {
      layer = dataset.layer[0].attributes;
      // if (dataset.id === _filters.water || dataset.id === _filters.food) {
      if (dataset.id === _filters.water) {
        layerList.push(layer);
      }
    }
  });
  console.log(layerList);
  return layerList;
};

// Export the selector
export default createSelector(
  datasets,
  filters,
  getActiveLayers
);
