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

const cropColorDictionary = {
  cereals: '#d95997',
  leguminous: '#1230a5',
  roots_and_tubers: '#32866d',
  fruit_and_nuts: '#ffe01b',
  oilseed_crops: '#6e23bd'
};

export const cropOptions = [
  { value: 'all', label: 'All crops' },
  { value: 'all pulses', label: 'Other pulses', color: cropColorDictionary.leguminous },
  { value: 'wheat', label: 'Wheat', color: cropColorDictionary.cereals },
  { value: 'lentils', label: 'Lentils', color: cropColorDictionary.leguminous },
  { value: 'cowpeas', label: 'Cowpeas', color: cropColorDictionary.leguminous },
  { value: 'barley', label: 'Barley', color: cropColorDictionary.cereals },
  { value: 'beans', label: 'Beans', color: cropColorDictionary.leguminous },
  { value: 'potato', label: 'Potato', color: cropColorDictionary.roots_and_tubers },
  { value: 'sorghum', label: 'Sorghum', color: cropColorDictionary.cereals },
  { value: 'pigeonpeas', label: 'Pigeonpeas', color: cropColorDictionary.leguminous },
  { value: 'sweet potato', label: 'Sweet potato', color: cropColorDictionary.roots_and_tubers },
  { value: 'soybean', label: 'Soybean', color: cropColorDictionary.oilseed_crops },
  { value: 'all cereals', label: 'Other cereals', color: cropColorDictionary.cereals },
  { value: 'cassava', label: 'Cassava', color: cropColorDictionary.roots_and_tubers },
  { value: 'rice', label: 'Rice', color: cropColorDictionary.cereals },
  { value: 'groundnut', label: 'Groundnut', color: cropColorDictionary.leguminous },
  { value: 'chickpeas', label: 'Chickpeas', color: cropColorDictionary.leguminous },
  { value: 'plantain', label: 'Plantain', color: cropColorDictionary.fruit_and_nuts },
  { value: 'banana', label: 'Banana', color: cropColorDictionary.fruit_and_nuts },
  { value: 'millet', label: 'Millet', color: cropColorDictionary.cereals },
  { value: 'maize', label: 'Maize', color: cropColorDictionary.cereals },
  { value: 'yams', label: 'Yams', color: cropColorDictionary.roots_and_tubers }
];

export const irrigationOptions = [
  { value: 'irrigated', label: 'Irrigated' },
  { value: 'rainfed', label: 'Rainfed' }
];

export const dataTypeOptions = [
  { label: 'Absolute value', value: 'absolute' },
  { label: 'Change from baseline', value: 'change_from_baseline' }
];
