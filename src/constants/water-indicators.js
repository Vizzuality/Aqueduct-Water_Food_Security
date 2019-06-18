export const BASELINE_WATER_INDICATORS = [
  {
    name: 'Water Stress',
    value: '1a1d4f61-f1b3-4c1a-bfb5-9d0444ecdd56',
    warning: 'not-rainfed-relevant',
    timeline: true
  },
  {
    name: 'Baseline Water Depletion',
    value: '1f918367-a7b7-44b2-a1eb-4e288969563f',
    warning: 'not-rainfed-relevant'
  },
  {
    name: 'Groundwater Table Decline',
    value: '2b180d04-237e-4ed9-b7a7-a643751f0ff0',
    warning: 'not-rainfed-relevant'
  },
  {
    name: 'Interannual Variability',
    value: '45501a04-43ed-4026-8fa1-694ed709e08a'
  },
  {
    name: 'Seasonal Variability',
    value: '64f65bd0-6dc5-4ce8-9421-a8e0a1eab40c',
    timeline: true
  },
  {
    name: 'Drought Risk',
    value: '57124c97-e121-4673-9b24-3a3c9e342477',
    warning: 'not-rainfed-relevant'
  },
  {
    name: 'Riverine Flood Risk',
    value: '5c8093ce-025e-47a7-a6c8-060e4a061a73',
    warning: 'not-rainfed-relevant'
  },
  {
    name: 'Coastal Flood Risk',
    value: '658feec8-d3c3-48aa-accf-caaddcdb9a32',
    warning: 'not-rainfed-relevant'
  },
  {
    name: 'Untreated Collected Wastewater',
    value: 'a1da2419-1271-4db1-b3b4-0bf16632436c',
    warning: 'not-rainfed-relevant'
  },
  {
    name: 'Coastal Eutrophication Potential',
    value: 'ff9b7610-01d7-452f-81ae-18080e0d9e50',
    warning: 'not-rainfed-relevant'
  },
  {
    name: 'Unimproved/no Drinking Wwater',
    value: 'e2702e54-1cb0-445e-b01a-439802a1eb48',
    warning: 'not-rainfed-relevant'
  },
  {
    name: 'Unimproved/no Sanitation',
    value: '6ad0e01e-ebc2-4747-988c-2e82902b6214',
    warning: 'not-rainfed-relevant'
  },
  {
    name: 'RepRisk Index',
    value: 'bada4f7f-792b-4b58-b7c0-453414b9e0cf',
    warning: 'not-rainfed-relevant'
  }
];

export const PROJECTED_WATER_INDICATORS_ABSOLUTE = [
  {
    name: 'Water Stress',
    value: '935f9a49-a45a-4362-b9f7-7a8e22df5146',
    warning: 'not-rainfed-relevant',
    timeline: true
  },
  {
    name: 'Seasonal Variability',
    value: '9d47a284-c196-4e33-a3c8-058823ccaa2f',
    timeline: true
  }
];

export const PROJECTED_WATER_INDICATORS_CHANGE = [
  {
    name: 'Water Stress',
    value: 'd8439b5e-c7f0-4021-9347-f1e68ef8122e',
    warning: 'not-rainfed-relevant',
    timeline: true
  },
  {
    name: 'Seasonal Variability',
    value: 'd93b26f3-be45-4fc5-8336-4f03ae6347dd',
    timeline: true
  }
];

export const NONE_OPTION_WATER_INDICATORS = [{
  name: 'None',
  value: 'none'
}];

export const BASELINE_WATER_INDICATORS_IDS = BASELINE_WATER_INDICATORS
  .map(_waterIndicator => _waterIndicator.value);

export const PROJECTED_WATER_INDICATORS_IDS = [...PROJECTED_WATER_INDICATORS_ABSOLUTE, ...PROJECTED_WATER_INDICATORS_CHANGE]
  .map(_waterIndicator => _waterIndicator.value);

export const EQUIVALENCE_WATER_INDICATORS = {
  // water stress - baseline / projected
  '1a1d4f61-f1b3-4c1a-bfb5-9d0444ecdd56': '935f9a49-a45a-4362-b9f7-7a8e22df5146',
  '935f9a49-a45a-4362-b9f7-7a8e22df5146': '1a1d4f61-f1b3-4c1a-bfb5-9d0444ecdd56',
  // seasonal variability - baseline / projected
  '64f65bd0-6dc5-4ce8-9421-a8e0a1eab40c': '9d47a284-c196-4e33-a3c8-058823ccaa2f',
  '9d47a284-c196-4e33-a3c8-058823ccaa2f': '64f65bd0-6dc5-4ce8-9421-a8e0a1eab40c'
};

export const EQUIVALENCE_WATER_INDICATORS_PROJECTED = {
  // water stress  - absolute / change from baseline
  '935f9a49-a45a-4362-b9f7-7a8e22df5146': 'd8439b5e-c7f0-4021-9347-f1e68ef8122e',
  'd8439b5e-c7f0-4021-9347-f1e68ef8122e': '935f9a49-a45a-4362-b9f7-7a8e22df5146',
  // seasonal variability - absolute / change from baseline
  '9d47a284-c196-4e33-a3c8-058823ccaa2f': 'd93b26f3-be45-4fc5-8336-4f03ae6347dd',
  'd93b26f3-be45-4fc5-8336-4f03ae6347dd': '9d47a284-c196-4e33-a3c8-058823ccaa2f'
};


export const DEFAULT_BASELINE_WATER_INDICATOR = '1a1d4f61-f1b3-4c1a-bfb5-9d0444ecdd56';
export const DEFAULT_PROJECTED_WATER_INDICATOR = '935f9a49-a45a-4362-b9f7-7a8e22df5146';

export default {
  BASELINE_WATER_INDICATORS,
  PROJECTED_WATER_INDICATORS_ABSOLUTE,
  PROJECTED_WATER_INDICATORS_CHANGE,
  NONE_OPTION_WATER_INDICATORS,
  BASELINE_WATER_INDICATORS_IDS,
  PROJECTED_WATER_INDICATORS_IDS,
  EQUIVALENCE_WATER_INDICATORS,
  DEFAULT_BASELINE_WATER_INDICATOR,
  DEFAULT_PROJECTED_WATER_INDICATOR
};
