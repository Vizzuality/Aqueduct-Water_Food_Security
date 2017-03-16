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

// this will be used once new format is implemented
export const PeriodTypes = [
  { value: 'month', label: 'Month' },
  { value: 'quarter', label: 'Quarter' },
  { value: 'year', label: 'Year' }
];

export const yearOptions = [
  { value: 'baseline', label: 'Baseline' },
  { value: '2020', label: '2020' },
  { value: '2030', label: '2030' },
  { value: '2040', label: '2040' }
];

export const cropOptions = [
  { value: 'all', label: 'All crops' },
  { value: 'all pulses', label: 'Other pulses' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'lentils', label: 'Lentils' },
  { value: 'cowpeas', label: 'Cowpeas' },
  { value: 'barley', label: 'Barley' },
  { value: 'beans', label: 'Beans' },
  { value: 'potato', label: 'Potato' },
  { value: 'sorghum', label: 'Sorghum' },
  { value: 'pigeonpeas', label: 'Pigeonpeas' },
  { value: 'sweet potato', label: 'Sweet potato' },
  { value: 'soybean', label: 'Soybean' },
  { value: 'all cereals', label: 'Other cereals' },
  { value: 'cassava', label: 'Cassava' },
  { value: 'rice', label: 'Rice' },
  { value: 'groundnut', label: 'Groundnut' },
  { value: 'chickpeas', label: 'Chickpeas' },
  { value: 'plantain', label: 'Plantain' },
  { value: 'banana', label: 'Banana' },
  { value: 'millet', label: 'Millet' },
  { value: 'maize', label: 'Maize' },
  { value: 'yams', label: 'Yams' }
];

export const irrigationOptions = [
  { value: 'irrigated', label: 'Irrigated' },
  { value: 'rainfed', label: 'Rainfed' }
];

export const dataTypeOptions = [
  { label: 'Absolute value', value: 'absolute' },
  { label: 'Change from baseline', value: 'change_from_baseline' }
];
