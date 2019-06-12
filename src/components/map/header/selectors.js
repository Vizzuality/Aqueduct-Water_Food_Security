import { createSelector } from 'reselect';
import { IRRIGATION_OPTIONS } from 'aqueduct-components';

// constants
import { SCOPE_OPTIONS } from 'constants/filters';
import { CROP_OPTIONS } from 'constants/crops';
import {
  BASELINE_WATER_INDICATORS,
  PROJECTED_WATER_INDICATORS
} from 'constants/water-indicators';

// states
const getCountries = state => state.countries.list;
const getFilters = state => state.filters;

export const getDictionary = createSelector(
  [getCountries, getFilters],
  (_countries, _filters) => {
    const { country: _iso, scope: _scope, year } = _filters;
    const waterIndicators = year === 'baseline' ? BASELINE_WATER_INDICATORS : PROJECTED_WATER_INDICATORS;

    return {
      crop(crop) {
        return (crop !== 'all') ? CROP_OPTIONS.find(v => v.value === crop).label : '';
      },
      country(iso) {
        if (!iso || _scope !== 'country') return '';

        const countryName = _countries.find(c => c.id === iso).name;
        // be careful with names ending in 's'
        return `${countryName}'s`;
      },
      irrigation(irrigation) {
        if (irrigation === 'all') {
          return IRRIGATION_OPTIONS.filter(v => v.value !== 'all').map(v => v.label).join(' & ');
        }

        return IRRIGATION_OPTIONS.find(v => v.value === irrigation).label;
      },
      scope(scope) {
        return !_iso || scope !== 'country' ? SCOPE_OPTIONS.find(v => v.value === 'global').label : '';
      },
      indicator(indicator) {
        return indicator !== 'none' ? (waterIndicators.find(v => v.value === indicator) || {}).name : '';
      }
    };
  }
);

export default { getDictionary };
