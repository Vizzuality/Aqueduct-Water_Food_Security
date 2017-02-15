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
  let isWater;
  let isFood;
  let isMask;
  let isAll;
  let currentLayer;
  _datasets.list.forEach((dataset) => {
    if (dataset.layer.length) {
      isWater = (dataset.id === _filters.water);
      isFood = (_filters.scope === 'global' && dataset.id === _filters.food);
      isMask = (_filters.scope === 'country' && _filters.country && dataset.id === 'e844accd-9e65-414b-84e7-efc5bd65aa17');
      isAll = (_filters.water === 'none' && dataset.id === 'b7bf012f-4b8b-4478-b5c9-6af3075ca1e4');


      if (isWater && _filters.changeFromBaseline) {
        currentLayer = dataset.layer.find((l) => {
          return l.attributes.layerConfig.fromBaseline;
        });
      } else {
        currentLayer = dataset.layer.find((l) => {
          return l.attributes.default;
        });
      }

      const metadata = dataset.metadata.length ? dataset.metadata[0].attributes : null;
      layer = {
        name: dataset.name,
        subtitle: dataset.subtitle,
        metadata,
        ...currentLayer.attributes
      };

      if (isWater || isFood || isMask || isAll) {
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
