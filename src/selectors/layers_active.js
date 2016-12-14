import { createSelector } from 'reselect';
import { widgetsFilter } from 'utils/filters/filters';

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
    }
  });
  return widgetList;
};

// Export the selector
export default createSelector(
  datasets,
  filters,
  getActiveLayers
);
