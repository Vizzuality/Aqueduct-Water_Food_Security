import { createSelector } from 'reselect';

// constants
import {
  BASELINE_WATER_INDICATORS,
  PROJECTED_WATER_INDICATORS,
  NONE_OPTION_WATER_INDICATORS
} from 'constants/water-indicators';

// states
const getYear = state => state.filters.year;

export const getWaterOptions = createSelector(
  [getYear],
  (_year) => {
    const waterIndicators = _year === 'baseline' ? BASELINE_WATER_INDICATORS : PROJECTED_WATER_INDICATORS;

    return [...waterIndicators, ...NONE_OPTION_WATER_INDICATORS].map(_waterIndicator => ({
      ..._waterIndicator,
      label: _waterIndicator.name,
      category: 'water'
    }));
  }
);

export default { getWaterOptions };
