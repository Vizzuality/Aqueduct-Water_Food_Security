export const IDS = {
  bws: {
    baseline: '8074ac9b-9cca-4aaf-a112-26166a8e9c7d',
    projectedAbsolute: '6f339b41-ea2f-4502-a454-d03bb22b540b',
    projectedChange: 'd48cf5e5-8692-4096-a711-4604f9be163c',
    legacy: {
      baseline: '1a1d4f61-f1b3-4c1a-bfb5-9d0444ecdd56',
      projectedAbsolute: '935f9a49-a45a-4362-b9f7-7a8e22df5146',
      projectedChange: 'd8439b5e-c7f0-4021-9347-f1e68ef8122e',
    },
  },
  gtd: {
    baseline: 'b687f3e4-e362-4a8d-9a69-a610710efd6b',
    projectedAbsolute: null,
    projectedChange: null,
    legacy: {
      baseline: '2b180d04-237e-4ed9-b7a7-a643751f0ff0',
      projectedAbsolute: null,
      projectedChange: null,
    }
  },
  iav: {
    baseline: '1c149343-fae5-4c2d-a6d4-60f988866d89',
    projectedAbsolute: null,
    projectedChange: null,
    legacy: {
      baseline: '45501a04-43ed-4026-8fa1-694ed709e08a',
      projectedAbsolute: null,
      projectedChange: null,
    }
  },
  sev: {
    baseline: '0eb346f7-83eb-4919-b032-8bc9957d2c2a',
    projectedAbsolute: '81b95d4d-2814-41b7-a425-49cfc1625f5e',
    projectedChange: '3bcc184d-c7e0-4099-ba5f-b7dbdbd4ac31',
    legacy: {
      baseline: '64f65bd0-6dc5-4ce8-9421-a8e0a1eab40c',
      projectedAbsolute: '9d47a284-c196-4e33-a3c8-058823ccaa2f',
      projectedChange: 'd93b26f3-be45-4fc5-8336-4f03ae6347dd',
    }
  },
  drr: {
    baseline: '7520db69-3cf2-42ba-a0ee-5ee37b3085db',
    projectedAbsolute: null,
    projectedChange: null,
    legacy: {
      baseline: '57124c97-e121-4673-9b24-3a3c9e342477',
      projectedAbsolute: null,
      projectedChange: null,
    }
  },
  cep: {
    baseline: '23662aa6-cb2a-4e46-9be8-4a2d617f26c9',
    projectedAbsolute: null,
    projectedChange: null,
    legacy: {
      baseline: 'ff9b7610-01d7-452f-81ae-18080e0d9e50',
      projectedAbsolute: null,
      projectedChange: null,
    }
  },
  bwd: {
    baseline: '160be93f-8c21-428a-b4c7-214b7ea4232d',
    projectedAbsolute: null,
    projectedChange: null,
    legacy: {
      baseline: '160be93f-8c21-428a-b4c7-214b7ea4232d',
      projectedAbsolute: null,
      projectedChange: null,
    }
  },
  udw: {
    baseline: '11a98f9a-c03c-4757-b144-c2a78757f281',
    projectedAbsolute: null,
    projectedChange: null,
    legacy: {
      baseline: '11a98f9a-c03c-4757-b144-c2a78757f281',
      projectedAbsolute: null,
      projectedChange: null,
    }
  },
  usa: {
    baseline: '3c3d5714-1200-4af1-b7c9-e1e01402319e',
    projectedAbsolute: null,
    projectedChange: null,
    legacy: {
      baseline: '3c3d5714-1200-4af1-b7c9-e1e01402319e',
      projectedAbsolute: null,
      projectedChange: null,
    }
  },
  // Template for when we have to add more indicators/ids
  // indicator_name: {
  //   baseline: null,
  //   projectedAbsolute: null,
  //   projectedChange: null,
  //   legacy: {
  //     baseline: null,
  //     projectedAbsolute: null,
  //     projectedChange: null,
  //   }
  // },
}

export const BASELINE_WATER_INDICATORS = [
  {
    name: 'Water Stress',
    value: IDS.bws.baseline,
    warning: 'not-rainfed-relevant',
    timeline: true
  },
  {
    name: 'Groundwater Table Decline',
    value: IDS.gtd.baseline,
    warning: 'not-rainfed-relevant'
  },
  {
    name: 'Interannual Variability',
    value: IDS.iav.baseline,
  },
  {
    name: 'Seasonal Variability',
    value: IDS.sev.baseline,
    timeline: true
  },
  {
    name: 'Drought Risk',
    value: IDS.drr.baseline,
  },
  {
    name: 'Coastal Eutrophication Potential',
    value: IDS.cep.baseline,
  },
  // {
  //   name: 'Baseline Water Depletion',
  //   value: IDS.bwd.baseline,
  // },
  // {
  //   name: 'Unimproved Access to Drinking Water',
  //   value: IDS.udw.baseline,
  // },
  // {
  //   name: 'Unimproved Access to Sanitation',
  //   value: IDS.usa.baseline,
  // },
];

export const PROJECTED_WATER_INDICATORS_ABSOLUTE = [
  {
    name: 'Water Stress',
    value: IDS.bws.projectedAbsolute,
    warning: 'not-rainfed-relevant',
    timeline: true
  },
  {
    name: 'Seasonal Variability',
    value: IDS.sev.projectedAbsolute,
    timeline: true
  }
];

export const PROJECTED_WATER_INDICATORS_CHANGE = [
  {
    name: 'Water Stress',
    value: IDS.bws.projectedAbsolute,
    warning: 'not-rainfed-relevant',
    timeline: true
  },
  {
    name: 'Seasonal Variability',
    value: IDS.sev.projectedAbsolute,
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
  '': IDS.bws.projectedAbsolute,
  [IDS.bws.projectedAbsolute]: IDS.bws.baseline,
  // seasonal variability - baseline / projected
  [IDS.sev.baseline]: IDS.sev.projectedAbsolute,
  [IDS.sev.projectedAbsolute]: IDS.sev.baseline
};

export const EQUIVALENCE_WATER_INDICATORS_PROJECTED = {
  // water stress  - absolute / change from baseline
  [IDS.bws.projectedAbsolute]: IDS.bws.projectedChange,
  [IDS.bws.projectedChange]: IDS.bws.projectedAbsolute,
  // seasonal variability - absolute / change from baseline
  [IDS.sev.projectedAbsolute]: IDS.sev.projectedChange,
  [IDS.sev.projectedChange]: IDS.sev.projectedAbsolute
};


export const DEFAULT_BASELINE_WATER_INDICATOR = IDS.bws.baseline;
export const DEFAULT_PROJECTED_WATER_INDICATOR = IDS.bws.projectedAbsolute;

export const ALLOWED_PROJECTED_WATER_INDICATORS = [
  IDS.bws.baseline,
  IDS.sev.baseline,
  IDS.bws.projectedAbsolute,
  IDS.sev.projectedAbsolute,
  IDS.bws.projectedChange,
  IDS.sev.projectedChange,
]

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
