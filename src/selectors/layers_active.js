import { createSelector } from 'reselect';
import layerSpec from 'utils/layers/layer_spec.json';

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
      isCrop = (_filters.indicator === 'none' && dataset.id === 'b7bf012f-4b8b-4478-b5c9-6af3075ca1e4');

      if (isWater) {
        currentLayer = dataset.layer.find((l) => {
          if (_filters.year !== 'baseline' && _filters.type === 'change_from_baseline') {
            return l.attributes.layerConfig.fromBaseline;
          }

          if (_filters.year !== 'baseline' && l.attributes.layerConfig.absolute) {
            return l.attributes.layerConfig.absolute;
          }

          if (_filters.year === 'baseline' && l.attributes.default) {
            return l.attributes.default;
          }
        });

        currentLayer = currentLayer || dataset.layer.find(l => l.attributes.default);
      }

      if (isCrop) {
        currentLayer = dataset.layer.find((l) => {
          return _filters.crop !== 'all' ?
            l.attributes.legendConfig.sqlQuery : l.attributes.default;
        });
      }

      if (isFood || isMask) {
        currentLayer = dataset.layer.find((l) => {
          return l.attributes.default;
        });
      }


      const metadata = (dataset.metadata && dataset.metadata.length) ? dataset.metadata[0].attributes : null;

      if (currentLayer && (isWater || isFood || isMask || isCrop)) {
        const layerSpecAttrs = layerSpec.find(l => l.id === dataset.id) || {};

        layer = {
          ...currentLayer.attributes,
          id: currentLayer.id,
          name: layerSpecAttrs.name,
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
