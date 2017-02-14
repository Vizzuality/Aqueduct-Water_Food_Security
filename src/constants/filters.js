import filter from 'lodash/filter';
import layerSpec from 'utils/layers/layer_spec.json';

export const SET_FILTERS = 'SET_FILTERS';

// Filter values
export const foodOptions = filter(layerSpec, { category: 'food' }).map((layer) => {
  return {
    label: layer.name,
    value: layer.id
  };
});

// Add 'none' option
foodOptions.push({
  label: 'None',
  value: 'none'
});

export const waterOptions = filter(layerSpec, { category: 'water' }).map((layer) => {
  return {
    label: layer.name,
    value: layer.id
  };
});

// Add 'none' option
waterOptions.push({
  label: 'None',
  value: 'none'
});


export const scopeOptions = [
  { value: 'global', label: 'Global' },
  { value: 'country', label: 'Country' }
];

export const yearOptions = [
  { value: 'baseline', label: 'Baseline' },
  { value: '2020', label: '2020' },
  { value: '2030', label: '2030' },
  { value: '2040', label: '2040' }
];

export const cropOptions = [
  { value: 'all', label: 'All crops' },
  { value: 'banana', label: 'Banana' },
  { value: 'barley', label: 'Barley' },
  { value: 'bean', label: 'Bean' },
  { value: 'cassava', label: 'Cassava' },
  { value: 'cereals_other', label: 'Other cereals' },
  { value: 'chickpea', label: 'Chickpea' },
  { value: 'cowpea', label: 'Cowpea' },
  { value: 'groundnut', label: 'Groundnut' },
  { value: 'lentil', label: 'Lentil' },
  { value: 'maize', label: 'Maize' },
  { value: 'millet_pearl', label: 'Pearl millet' },
  { value: 'millet_small', label: 'Small millet' },
  { value: 'pigeonpea', label: 'Pigeonpea' },
  { value: 'plantain', label: 'Plantain' },
  { value: 'potato', label: 'Potato' },
  { value: 'pulses_other', label: 'Other pulses' },
  { value: 'rice', label: 'Rice' },
  { value: 'sorghum', label: 'Sorghum' },
  { value: 'soybean', label: 'Soybean' },
  { value: 'sweet_potato', label: 'Sweet potato' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'yam', label: 'Yam' }
];

export const irrigationOptions = [
  { value: 'irrigated', label: 'Irrigated' },
  { value: 'rainfed', label: 'Rainfed' }
];

export const changeFromBaselineOptions = [
  { label: 'Absolute value', value: false },
  { label: 'Change from baseline', value: true }
];
