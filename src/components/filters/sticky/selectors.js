import { createSelector } from 'reselect';

// states
const getIndicator = state => state.filters.indicator;

export const isTimeFrameDisabled = createSelector(
  [getIndicator],
  (_indicator) => {
    const isProjected = [
      '1a1d4f61-f1b3-4c1a-bfb5-9d0444ecdd56',
      '64f65bd0-6dc5-4ce8-9421-a8e0a1eab40c',
      '935f9a49-a45a-4362-b9f7-7a8e22df5146',
      '9d47a284-c196-4e33-a3c8-058823ccaa2f',
      'd8439b5e-c7f0-4021-9347-f1e68ef8122e',
      'd93b26f3-be45-4fc5-8336-4f03ae6347dd',
    ].includes(_indicator);

    return !isProjected;
  }
);

export default { isTimeFrameDisabled };
