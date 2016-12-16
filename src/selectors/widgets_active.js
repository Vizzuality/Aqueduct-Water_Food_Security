import { createSelector } from 'reselect';
import { widgetsFilter } from 'utils/filters/filters';

// Get the datasets and filters from state
const datasets = state => state.datasets;
const filters = state => state.filters;


// Create a function to compare the current active datatasets and the current datasetsIds
const getActiveWidgets = (_datasets, _filters) => {
  // TODO: filter _datasets using _filters
  const widgetList = [];
  let widget;
  _datasets.list.forEach((dataset) => {
    if (dataset.widget.length) {
      widget = dataset.widget[0].attributes;
      // Vega type widget doesn't have 'type' property
      if (!Object.prototype.hasOwnProperty.call(widget.widgetConfig, 'type') && widgetsFilter(widget, _filters, dataset.tags)) {
        widgetList.push(widget);
      }
    }
  });
  return widgetList;
};

// Export the selector
export default createSelector(
  datasets,
  filters,
  getActiveWidgets
);
