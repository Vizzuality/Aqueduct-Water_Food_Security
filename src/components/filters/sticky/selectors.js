import { createSelector } from 'reselect';
// constants
import {
  ALLOWED_PROJECTED_WATER_INDICATORS,
} from 'constants/water-indicators';

// states
const getIndicator = state => state.filters.indicator;

export const isTimeFrameDisabled = createSelector(
  [getIndicator],
  (_indicator) => {
    const isProjected = ALLOWED_PROJECTED_WATER_INDICATORS.includes(_indicator);

    return !isProjected;
  }
);

export default { isTimeFrameDisabled };
