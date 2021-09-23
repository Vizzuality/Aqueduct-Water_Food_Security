import { createSelector } from 'reselect';

// constants
import {
  BASELINE_WATER_INDICATORS,
  PROJECTED_WATER_INDICATORS_ABSOLUTE,
  PROJECTED_WATER_INDICATORS_CHANGE,
  PROJECTED_WATER_INDICATORS_IDS,
  NONE_OPTION_WATER_INDICATORS,
  ALLOWED_PROJECTED_WATER_INDICATORS,
} from 'constants/water-indicators';
import { YEAR_OPTIONS } from 'constants/filters';

// states
const getYear = state => state.filters.year;
const getType = state => state.filters.type;
const getIndicator = state => state.filters.indicator;

export const getWaterOptions = createSelector(
  [getYear, getType],
  (_year, _type) => {
    let waterIndicators = [];

    if (_year === 'baseline') waterIndicators = BASELINE_WATER_INDICATORS;

    if (_year !== 'baseline') {
      waterIndicators = _type === 'absolute'
        ? PROJECTED_WATER_INDICATORS_ABSOLUTE : PROJECTED_WATER_INDICATORS_CHANGE;
    }

    return [...waterIndicators, ...NONE_OPTION_WATER_INDICATORS].map(_waterIndicator => ({
      ..._waterIndicator,
      label: _waterIndicator.name,
      category: 'water'
    }));
  }
);

export const getTimelineOptions = createSelector(
  [getIndicator],
  (_indicator) => {
    const isProjected = ALLOWED_PROJECTED_WATER_INDICATORS.includes(_indicator);

    return isProjected ? YEAR_OPTIONS : YEAR_OPTIONS.map(_yearOption => ({
      ..._yearOption,
      disabled: true
    }));
  }
);

export default { getWaterOptions };
