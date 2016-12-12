import { createSelector } from 'reselect';

// Get the datasets and filters from state
const datasets = state => state.datasets;
const filters = state => state.filters;


// Create a function to compare the current active datatasets and the current datasetsIds
const getActiveDatasets = (_datasets, _filters) => {
  // TODO: filter _datasets using _filters
  return {
    list: _datasets.list
  };
};

// Export the selector
export default createSelector(
  datasets,
  filters,
  getActiveDatasets
);
