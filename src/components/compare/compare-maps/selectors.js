import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

// constants
import { MAP_OPTIONS } from 'components/map/constants';

// utils
import { getBounds } from 'utils/map';
import { reduceParams, reduceSqlParams } from 'utils/layers/params-parser';

// selectors
import { getActiveLayers } from 'components/map/selectors';

// states
const getCompareCountries = state => state.compare.countries;
const getCountries = state => state.countries.list;
const getFilters = state => state.filters;

export const getCompareConfig = createSelector(
  [getCompareCountries, getCountries, getFilters, getActiveLayers],
  (_compareCountries, _countries, _filters, _activeLayer) => {
    console.log(_activeLayer)
    if (isEmpty(_compareCountries) || !_countries.length || !_activeLayer.length) {
      return [
        {},
        {}
      ];
    }

    return _compareCountries.map((_compareCountry) => {
      const countryData = _countries.find(_country => _country.id === _compareCountry) || {};
      const { irrigation, crop, ...restFilters } = _filters;
      const updatedFilters = {
        ...restFilters,
        ...irrigation !== 'all' && { irrigation },
        ...crop !== 'all' && { crop },
        iso: _compareCountry,
        country: _compareCountry,
        countryName: countryData.name
      };

      return ({
        country: _compareCountry,
        mapConfig: {
          ...MAP_OPTIONS,
          bounds: {
            ...MAP_OPTIONS.bounds,
            bbox: getBounds(countryData)
          }
        },
        activeLayer: _activeLayer.length ? [{
          ..._activeLayer[0],
          ..._activeLayer[0].layerConfig.params_config
            && { params: reduceParams(_activeLayer[0].layerConfig.params_config, updatedFilters) },
          ..._activeLayer[0].layerConfig.sql_config
            && { sqlParams: reduceSqlParams(_activeLayer[0].layerConfig.sql_config, updatedFilters) }
        }] : []
      });
    });
  }
);

export default { getCompareConfig };
