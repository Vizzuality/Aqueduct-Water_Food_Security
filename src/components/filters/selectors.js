import { createSelector } from 'reselect';

// constants
import {
  BASELINE_WATER_INDICATORS,
  PROJECTED_WATER_INDICATORS_ABSOLUTE,
  PROJECTED_WATER_INDICATORS_CHANGE,
  PROJECTED_WATER_INDICATORS_IDS,
  NONE_OPTION_WATER_INDICATORS,
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
    const isProjected = [
      '1a1d4f61-f1b3-4c1a-bfb5-9d0444ecdd56',
      '64f65bd0-6dc5-4ce8-9421-a8e0a1eab40c',
      '935f9a49-a45a-4362-b9f7-7a8e22df5146',
      '9d47a284-c196-4e33-a3c8-058823ccaa2f',
      'd8439b5e-c7f0-4021-9347-f1e68ef8122e',
      'd93b26f3-be45-4fc5-8336-4f03ae6347dd'
    ].includes(_indicator);

    return isProjected ? YEAR_OPTIONS : YEAR_OPTIONS.map(_yearOption => ({
      ..._yearOption,
      disabled: true
    }));
  }
);

export default { getWaterOptions };
