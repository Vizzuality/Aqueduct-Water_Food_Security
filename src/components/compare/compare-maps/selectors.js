import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

// constants
import { MAP_OPTIONS, BASEMAPS } from 'components/map/constants';

// utils
import { getBounds } from 'utils/map';

// states
const getCompareCountries = state => state.compare.countries;
const getCountries = state => state.countries.list;
const getFilters = state => state.filters;
const getBasemap = state => state.map.basemap;

export const getCompareConfig = createSelector(
  [getCompareCountries, getCountries, getFilters, getBasemap],
  (_compareCountries, _countries, _filters, _basemap) => {
    if (isEmpty(_compareCountries) || !_countries.length) return [{}, {}];

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
          basemap: {
            url: BASEMAPS[_basemap].value,
            options: BASEMAPS[_basemap].options
          }
        },
        bounds: { bbox: getBounds(countryData) },
        filters: updatedFilters,
        layers: []
      });
    });
  }
);

export default { getCompareConfig };
