import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

// constants
import { MAP_OPTIONS } from 'components/map/constants';

// utils
import { getBounds } from 'utils/map';

// states
const getCompareCountries = state => state.compare.countries;
const getCountries = state => state.countries.list;
const getFilters = state => state.filters;

export const getCompareConfig = createSelector(
  [getCompareCountries, getCountries, getFilters],
  (_compareCountries, _countries, _filters) => {
    if (isEmpty(_compareCountries) || !_countries.length) return new Array(2);

    console.log(_compareCountries)

    return _compareCountries.map((_compareCountry) => {
      const countryData = _countries.find(_country => _country.id === _compareCountry) || {};

      return ({
        country: _compareCountry,
        mapConfig: {
          ...MAP_OPTIONS,
          bounds: {
            ...MAP_OPTIONS.bounds,
            bbox: getBounds(countryData)
          }
        },
        filters: {
          ..._filters,
          country: _compareCountry,
          countryName: countryData.name
        }
      });
    });
  }
);

export default { getCompareConfig };
