import { createSelector } from 'reselect';

// constants
import {
  BASELINE_WATER_INDICATORS,
  PROJECTED_WATER_INDICATORS_ABSOLUTE,
  PROJECTED_WATER_INDICATORS_CHANGE,
  PROJECTED_WATER_INDICATORS_IDS,
  NONE_OPTION_WATER_INDICATORS,
  ALLOWED_PROJECTED_WATER_INDICATORS,
  SUPPLY_CHAIN_WATER_INDICATORS,
} from 'constants/water-indicators';
import { YEAR_OPTIONS } from 'constants/filters';

// states
const getYear = state => state.filters.year;
const getType = state => state.filters.type;
const getIndicator = state => state.filters.indicator;
const getScope = state => state.filters.scope;

export const getWaterOptions = createSelector(
  [getYear, getType, getScope],
  (_year, _type, _scope) => {
    let waterIndicators = [];

    if (_scope === 'supply_chain') {
      waterIndicators = SUPPLY_CHAIN_WATER_INDICATORS
    } else {
      if (_year === 'baseline') waterIndicators = BASELINE_WATER_INDICATORS;

      if (_year !== 'baseline') {
        waterIndicators = _type === 'absolute'
          ? PROJECTED_WATER_INDICATORS_ABSOLUTE : PROJECTED_WATER_INDICATORS_CHANGE;
      }
    }

    return [...NONE_OPTION_WATER_INDICATORS, ...waterIndicators].map(_waterIndicator => ({
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
