export const CROP_COLOR_DICTIONARY = {
  cereals: '#C71585',
  pulses_leguminous: '#0000FF',
  roots_tubers: '#A52A2A',
  fruit_nuts: '#FFA500',
  oilseed_crops: '#6B8E23',
  sugar_crops: '#FFDAB9',
  fibres: '#E6E6FA',
  stimulants: '#8B4513',
  vegetables: '#008000',
  other_crops: '#2F4F4F',
  wheat: '#4B0082',
  rice: '#800080',
  maize: '#C71585',
  barley: '#DB7093',
  'pearl millet': '#FF1493',
  'small millet': '#FF69B4',
  sorghum: '#FFB6C1',
  'other cereals': '#FFC0CB',
  bean: '#00008B',
  chickpea: '#0000CD',
  cowpea: '#0000FF',
  pigeonpea: '#1E90FF',
  lentil: '#00BFFF',
  'other pulses': '#87CEFA',
  potato: '#800000',
  'sweet potato': '#8B0000',
  yams: '#A52A2A',
  cassava: '#B22222',
  'other roots': '#DC143C',
  banana: '#FFD700',
  plantain: '#FFA500',
  'tropical fruit': '#FF8C00',
  'temperate fruit': '#FF6347',
  soybean: '#006400',
  groundnut: '#228B22',
  coconut: '#6B8E23',
  oilpalm: '#556B2F',
  sunflower: '#808000',
  rapessed: '#2E8B57',
  sesameseed: '#3CB371',
  'other oil crops': '#8FBC8F',
  sugarcane: '#FFDAB9',
  sugarbeet: '#FFE4B5',
  cotton: '#E6E6FA',
  'other fibre crops': '#FFF0F5',
  'arabica coffee': '#A0522D',
  'robusta coffee': '#8B4513',
  cocoa: '#D2691E',
  tea: '#CD853F',
  tobacco: '#DAA520',
  'rest of crops': '#2F4F4F'
};

export const CROP_OPTIONS = [
  { value: 'all', label: 'All crops' },
  { value: 'arabica coffee', label: 'Arabica coffee', color: CROP_COLOR_DICTIONARY['arabica coffee'] },
  { value: 'banana', label: 'Banana', color: CROP_COLOR_DICTIONARY.banana },
  { value: 'barley', label: 'Barley', color: CROP_COLOR_DICTIONARY.barley },
  { value: 'bean', label: 'Bean', color: CROP_COLOR_DICTIONARY.bean },
  { value: 'cassava', label: 'Cassava', color: CROP_COLOR_DICTIONARY.cassava },
  { value: 'chickpea', label: 'Chickpea', color: CROP_COLOR_DICTIONARY.chickpea },
  { value: 'cocoa', label: 'Cocoa', color: CROP_COLOR_DICTIONARY.cocoa },
  { value: 'coconut', label: 'Coconut', color: CROP_COLOR_DICTIONARY.coconut },
  { value: 'cotton', label: 'Cotton', color: CROP_COLOR_DICTIONARY.cotton },
  { value: 'cowpea', label: 'Cowpea', color: CROP_COLOR_DICTIONARY.cowpea },
  { value: 'groundnut', label: 'Groundnut', color: CROP_COLOR_DICTIONARY.groundnut },
  { value: 'lentil', label: 'Lentil', color: CROP_COLOR_DICTIONARY.lentil },
  { value: 'maize', label: 'Maize', color: CROP_COLOR_DICTIONARY.maize },
  { value: 'oilpalm', label: 'Oilpalm', color: CROP_COLOR_DICTIONARY.oilpalm },
  { value: 'other cereals', label: 'Other cereals', color: CROP_COLOR_DICTIONARY['other cereals'] },
  { value: 'other fibre crops', label: 'Other fibres', color: CROP_COLOR_DICTIONARY['other fibre crops'] },
  { value: 'other pulses', label: 'Other pulses', color: CROP_COLOR_DICTIONARY['other pulses'] },
  { value: 'other roots', label: 'Other roots', color: CROP_COLOR_DICTIONARY['other roots'] },
  { value: 'other oil crops', label: 'Other oil crops', color: CROP_COLOR_DICTIONARY['other oil crops'] },
  { value: 'potato', label: 'Potato', color: CROP_COLOR_DICTIONARY.potato },
  { value: 'pearl millet', label: 'Pearl millet', color: CROP_COLOR_DICTIONARY['pearl millet'] },
  { value: 'pigeonpea', label: 'Pigeonpea', color: CROP_COLOR_DICTIONARY.pigeonpea },
  { value: 'plantain', label: 'Plantain', color: CROP_COLOR_DICTIONARY.plantain },
  { value: 'rapeseed', label: 'Rapeseed', color: CROP_COLOR_DICTIONARY.rapeseed },
  { value: 'rice', label: 'Rice', color: CROP_COLOR_DICTIONARY.rice },
  { value: 'rest of crops', label: 'Rest of crops', color: CROP_COLOR_DICTIONARY['rest of crops'] },
  { value: 'robusta coffee', label: 'Robusta coffee', color: CROP_COLOR_DICTIONARY['robusta coffee'] },
  { value: 'sesameseed', label: 'Sesameseed', color: CROP_COLOR_DICTIONARY.sesameseed },
  { value: 'small millet', label: 'Small millet', color: CROP_COLOR_DICTIONARY['small millet'] },
  { value: 'sorghum', label: 'Sorghum', color: CROP_COLOR_DICTIONARY.sorghum },
  { value: 'soybean', label: 'Soybean', color: CROP_COLOR_DICTIONARY.soybean },
  { value: 'sugarbeet', label: 'Sugarbeet', color: CROP_COLOR_DICTIONARY.sugarbeet },
  { value: 'sugarcane', label: 'Sugarcane', color: CROP_COLOR_DICTIONARY.sugarcane },
  { value: 'sunflower', label: 'Sunflower', color: CROP_COLOR_DICTIONARY.sunflower },
  { value: 'sweet potato', label: 'Sweet potato', color: CROP_COLOR_DICTIONARY['sweet potato'] },
  { value: 'tea', label: 'Tea', color: CROP_COLOR_DICTIONARY.tea },
  { value: 'temperate fruit', label: 'Temperate fruit', color: CROP_COLOR_DICTIONARY['temperate fruit'] },
  { value: 'tobacco', label: 'Tobacco', color: CROP_COLOR_DICTIONARY.tobacco },
  { value: 'tropical fruit', label: 'Tropical fruit', color: CROP_COLOR_DICTIONARY['tropical fruit'] },
  { value: 'vegetables', label: 'Vegetables', color: CROP_COLOR_DICTIONARY.vegetables },
  { value: 'wheat', label: 'Wheat', color: CROP_COLOR_DICTIONARY.wheat },
  { value: 'yams', label: 'Yams', color: CROP_COLOR_DICTIONARY.yams }
];

export default {
  CROP_OPTIONS,
  CROP_COLOR_DICTIONARY
};
