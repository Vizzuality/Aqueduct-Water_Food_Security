import { createSelector } from 'reselect';
import layerSpec from 'utils/layers/layers';

// Get the datasets and filters from state
const datasets = state => state.datasets;
const filters = state => state.filters;

// Create a function to compare the current active datatasets and the current datasetsIds
const getActiveLayers = (_datasets, _filters) => {
  const layerList = [];
  let layer;
  let isWater;
  let isFood;
  let isMask;
  let isCrop;
  let currentLayer;
  _datasets.list.forEach((dataset) => {
    if (dataset.layer && dataset.layer.length) {
      isWater = (dataset.id === _filters.indicator);
      isFood = (dataset.id === _filters.food);
      isMask = (_filters.scope === 'country' && _filters.country && dataset.id === 'e844accd-9e65-414b-84e7-efc5bd65aa17');
      isCrop = (_filters.indicator === 'none' && dataset.id === 'a57a457a-cee7-44a6-af0a-5c27176e0ec0');

      if (isWater) {
        currentLayer = dataset.layer.find((l) => {
          if (_filters.year !== 'baseline' && _filters.type === 'change_from_baseline') {
            return l.layerConfig.fromBaseline;
          }

          if (_filters.year !== 'baseline' && l.layerConfig.absolute) {
            return l.layerConfig.absolute;
          }

          if (_filters.year === 'baseline' && l.default) {
            return l.default;
          }
        });

        currentLayer = currentLayer || dataset.layer.find(l => l.default);
      }

      if (isCrop) {
        currentLayer = dataset.layer.find((l) => {
          return _filters.crop !== 'all' ?
            l.legendConfig.sqlQuery : l.default;
        });
      }

      if (isFood || isMask) {
        currentLayer = dataset.layer.find((l) => {
          return l.default;
        });
      }


      const metadata = (dataset.metadata && dataset.metadata.length) ? dataset.metadata[0] : null;

      if (currentLayer && (isWater || isFood || isMask || isCrop)) {
        const layerSpecAttrs = layerSpec.find(l => l.id === dataset.id) || {};

        layer = {
          ...currentLayer,
          id: currentLayer.id,
          name: layerSpecAttrs.name,
          country: _filters.country,
          category: layerSpecAttrs.category,
          options: layerSpecAttrs.layerOptions,
          metadata
        };

        layerList.push(layer);
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
