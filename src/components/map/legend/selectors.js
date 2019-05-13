import { createSelector } from 'reselect';
import orderBy from 'lodash/orderBy';

// selectors
import { getActiveLayers, getFoodLayers } from 'components/map/selectors';

// states
const getDatasets = state => state.datasets.list;

export const getLayers = createSelector(
  [getDatasets, getActiveLayers, getFoodLayers],
  (_datasets, _layers, _foodLayers) => {
    const layers = [..._foodLayers, ...orderBy(_layers.filter(_layer => _layer.category !== 'mask'), ['category'], ['desc'])];

    return layers.map((_layer) => {
      let dataset = null;

      _datasets.forEach((_dataset) => {
        if (dataset) return;
        if ((_dataset.layer || []).find(_l => _l.id === _layer.id)) dataset = _dataset;
      });


      if (dataset.metadata && dataset.metadata[0]) {
        return ({
          ..._layer,
          metadata: dataset.metadata.reduce((accumulator, currentValue) => ({
            ...accumulator,
            ...currentValue,
            info: {
              ...currentValue.info,
              sources: currentValue.info.sources.map(_source => ({
                sourceName: _source['source-name'],
                sourceUrl: _source['source-url']
              }))
            }
          }), {})
        });
      }

      return ({ ..._layer });
    });
  }
);

export default { getLayers };
