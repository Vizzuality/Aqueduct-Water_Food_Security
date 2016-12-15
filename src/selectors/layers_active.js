import find from 'lodash/find';
import { createSelector } from 'reselect';
import layerSpec from 'utils/layers/layer_spec.json';

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
      if (dataset.id === _filters.water || dataset.id === _filters.food) {
        layerList.push(Object.assign({}, {
          category: find(layerSpec, { id: dataset.id }).category
        }, layer));
      }
    }
  });
  return layerList;
};

// Export the selector
export default createSelector(
  datasets,
  filters,
  getActiveLayers
);
