import { IRRIGATION_OPTIONS } from 'aqueduct-components';
import capitalize from 'lodash/capitalize';

// constants
import { SCOPE_OPTIONS, FOOD_OPTIONS } from 'constants/filters';
import { CROP_OPTIONS } from 'constants/crops';
import {
  BASELINE_WATER_INDICATORS,
  PROJECTED_WATER_INDICATORS_ABSOLUTE,
  PROJECTED_WATER_INDICATORS_CHANGE
} from 'constants/water-indicators';

export const getDictionary = (filters = {}, countries = []) => {
  const { country: _iso, scope: _scope, year, type } = filters;
  let waterIndicators = [];

  if (year === 'baseline') waterIndicators = BASELINE_WATER_INDICATORS;

  if (year !== 'baseline') {
    waterIndicators = type === 'absolute'
      ? PROJECTED_WATER_INDICATORS_ABSOLUTE : PROJECTED_WATER_INDICATORS_CHANGE;
  }

  return {
    crop(crop) {
      return (crop !== 'all') ? CROP_OPTIONS.find(v => v.value === crop).label : '';
    },
    country(iso) {
      if (!iso || _scope !== 'country') return '';

      const countryName = countries.find(c => c.id === iso).name;
      // be careful with names ending in 's'
      return `${countryName}'s`;
    },
    irrigation(irrigation) {
      if (irrigation === 'all') {
        return IRRIGATION_OPTIONS.filter(v => v.value !== 'all').map(v => v.label).join(' & ');
      }

      return IRRIGATION_OPTIONS.find(v => v.value === irrigation).label;
    },
    scope(scope) {
      return !_iso || scope !== 'country' ? SCOPE_OPTIONS.find(v => v.value === 'global').label : '';
    },
    indicator(indicator) {
      return indicator !== 'none' ? waterIndicators.find(v => v.value === indicator).name : '';
    }
  };
};

export const getMapHeaderTemplate = (filters = {}) => {
  const { scope: scopeF, crop, year, type, indicator, food, irrigation, countryName } = filters;
  let waterIndicators = [];

  if (year === 'baseline') {
    waterIndicators = BASELINE_WATER_INDICATORS;
  } else if (year !== 'baseline' && type === 'absolute') {
    waterIndicators = PROJECTED_WATER_INDICATORS_ABSOLUTE;
  } else {
    waterIndicators = PROJECTED_WATER_INDICATORS_CHANGE;
  }

  const scope = (scopeF === 'country' && !countryName) ? 'global' : scopeF;
  const existsIndicator = indicator !== 'none';
  const existsFood = food !== 'none';
  const typeString = type === 'change_from_baseline' ? 'Change in' : capitalize(type);
  const foodDatasetName = existsFood
    ? (FOOD_OPTIONS.find(f => f.value === food) || {}).label : null;
  const waterDatasetName = existsIndicator
    ? (waterIndicators.find(w => w.value === indicator) || {}).name : null;
  const cropName = crop !== 'all' ? (CROP_OPTIONS.find(cr => cr.value === crop) || {}).label : null;
  const irrigationString = irrigation === 'all' ? IRRIGATION_OPTIONS.filter(irr => irr.value !== 'all').map(irr => capitalize(irr.label)).join(' & ') : capitalize(irrigation);
  const isWaterStress = !!PROJECTED_WATER_INDICATORS_CHANGE.find(w => w.value === indicator);
  const isSeasonalVariability = !!PROJECTED_WATER_INDICATORS_ABSOLUTE
    .find(w => w.value === indicator);

  if (scope === 'supply_chain') {
    return `Supply chain`
  }

  // Global, all crops, baseline
  if (scope === 'global' && crop === 'all' && year === 'baseline') {
    // only "irrigated" or "rainfed" is selected
    if (!existsIndicator && !existsFood) {
      return `Global ${irrigationString} Crop Producing Areas`;
    }

    // water dataset selected
    if (existsIndicator && !existsFood) {
      return `Global Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas`;
    }

    // food and water datasets are selected
    if (existsFood && existsIndicator) {
      return `Global Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas & ${foodDatasetName}`;
    }

    // food dataset is selected
    if (existsFood && !existsIndicator) {
      return `Global ${irrigationString} Crop Producing Areas & ${foodDatasetName}`;
    }

    // "all crops" is selected
    return 'Global Irrigated & Rainfed Crop Producing Areas';
  }

  // Global, one crop, baseline
  if (scope === 'global' && crop !== 'all' && year === 'baseline') {
    // only "irrigated" or "rainfed" is selected
    if (!existsIndicator && !existsFood) {
      return `Global ${irrigationString} ${cropName} Producing Areas`;
    }

    // water dataset selected
    if (existsIndicator && !existsFood) {
      return `Global Risk of ${waterDatasetName} in ${irrigationString} ${cropName} Producing Areas`;
    }

    // food and water datasets are selected
    if (existsFood && existsIndicator) {
      return `Global Risk of ${waterDatasetName} in ${irrigationString} ${cropName} Producing Areas & ${foodDatasetName}`;
    }

    // food dataset is selected
    if (existsFood && !existsIndicator) {
      return `Global ${irrigationString} ${cropName} Producing Areas & ${foodDatasetName}`;
    }

    return `Global Irrigated & Rainfed ${cropName} Producing Areas`;
  }

  // Global, all crops, [change in] future year
  if (scope === 'global' && crop === 'all' && year !== 'baseline') {
    // only "irrigated" or "rainfed" is selected
    if (!existsIndicator && !existsFood) {
      return `Global ${irrigationString} Crop Producing Areas`;
    }

    // water risk indicators of water stress or seasonal variability are selected
    if ((isWaterStress || isSeasonalVariability) && !existsFood) {
      return `Projected ${typeString} Global Risk of ${waterDatasetName} in ${year} in ${irrigationString} Crop Producing Areas`;
    }

    // water risk indicators of water stress or seasonal variability
    // and a food security dataset is selected
    if ((isWaterStress || isSeasonalVariability) && existsFood) {
      return `Projected ${typeString} Global Risk of ${waterDatasetName} in ${year} in ${irrigationString}
        Crop Producing Areas & ${year} ${foodDatasetName}`;
    }

    // food security dataset is selected and indicator (not water stress or seasonal variability)
    if (existsIndicator && (!isWaterStress && !isSeasonalVariability) && existsFood) {
      return `Global Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas &
        Projected ${year} ${foodDatasetName}`;
    }

    // food security dataset are selected but no water risk indicator
    if (existsFood && !existsIndicator) {
      return `Global ${irrigationString} Crop Producing Areas & Projected ${year} ${foodDatasetName}`;
    }

    // only “all crops” is selected
    return 'Global Irrigated & Rainfed Crop Producing Areas';
  }

  // Global, one crops, [change in] future year
  if (scope === 'global' && crop !== 'all' && year !== 'baseline') {
    // only "irrigated" or "rainfed" is selected
    if (!existsIndicator && !existsFood) {
      return `Global ${irrigationString} ${cropName} Producing Areas`;
    }

    // water risk indicators of water stress or seasonal variability are selected
    if ((isWaterStress || isSeasonalVariability) && !existsFood) {
      return `Projected ${typeString} Global Risk of ${waterDatasetName} in ${year} in ${irrigationString} ${cropName} Producing Areas`;
    }

    // water risk indicators of water stress or seasonal variability
    // and a food security dataset is selected
    if ((isWaterStress || isSeasonalVariability) && existsFood) {
      return `Projected ${typeString} Global Risk of ${waterDatasetName} in ${year} in ${irrigationString}
      ${cropName} Producing Areas & ${year} ${foodDatasetName}`;
    }

    // food security dataset are selected but no water risk indicator
    if (existsFood && !existsIndicator) {
      return `Global ${irrigationString} ${cropName} Producing Areas & Projected ${year} ${foodDatasetName}`;
    }

    // only “all crops” is selected
    return `Global Irrigated & Rainfed ${cropName} Producing Areas`;
  }

  // Country, all crops, baseline
  if (scope === 'country' && crop === 'all' && year === 'baseline' && countryName) {
    // only "irrigated" or "rainfed" is selected
    if (!existsIndicator && !existsFood) {
      return `${irrigationString} Crop Producing Areas in ${countryName}`;
    }

    // any water dataset selected
    if (existsIndicator && !existsFood) {
      return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas in ${countryName}`;
    }

    // food and water datasets are selected
    if (existsFood && existsIndicator) {
      return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas & ${foodDatasetName} in ${countryName}`;
    }

    // food dataset is selected
    if (existsFood && !existsIndicator) {
      return `${irrigationString} Crop Producing Areas & ${foodDatasetName} in ${countryName}`;
    }

    return `Irrigated & Rainfed Crop Producing Areas in ${countryName}`;
  }

  // Country, one crop, baseline
  if (scope === 'country' && crop !== 'all' && year === 'baseline' && countryName) {
    // only "irrigated" or "rainfed" is selected
    if (!existsIndicator && !existsFood) {
      return `${irrigationString} ${cropName} Producing Areas in ${countryName}`;
    }

    // water dataset selected
    if (existsIndicator && !existsFood) {
      return `Risk of ${waterDatasetName} in ${irrigationString} ${cropName} Producing Areas in ${countryName}`;
    }

    // food and water datasets are selected
    if (existsFood && existsIndicator) {
      return `Risk of ${waterDatasetName} in ${irrigationString} ${cropName} Producing Areas & ${foodDatasetName} in ${countryName}`;
    }

    // food dataset is selected
    if (existsFood && !existsIndicator) {
      return `${irrigationString} ${cropName} Producing Areas & ${foodDatasetName} in ${countryName}`;
    }

    // food security dataset is selected and indicator (not water stress or seasonal variability)
    if (existsIndicator && (!isWaterStress && !isSeasonalVariability) && existsFood) {
      return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas &
        Projected ${year} ${foodDatasetName}`;
    }

    // only “all crops” is selected
    return `Irrigated & Rainfed ${cropName} Producing Areas in ${countryName}`;
  }

  // Country, all crops, [change in] future year
  if (scope === 'country' && crop === 'all' && year !== 'baseline' && countryName) {
    // only "irrigated" or "rainfed" is selected
    if (!existsIndicator && !existsFood) {
      return `${irrigationString} Crop Producing Areas in ${countryName}`;
    }

    // water risk indicators of water stress or seasonal variability are selected
    if ((isWaterStress || isSeasonalVariability) && !existsFood) {
      return `Projected ${typeString} Risk of ${waterDatasetName} in ${year} in ${irrigationString} Crop Producing Areas in ${countryName}`;
    }

    // any other water risk indicator (not water stress nor seasonal variability)
    if (existsIndicator && (!isWaterStress && !isSeasonalVariability) && !existsFood) {
      return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas in ${countryName}`;
    }

    // water stress or seasonal variability selected and food selected
    if ((isWaterStress || isSeasonalVariability) && existsFood) {
      return `Projected ${typeString} Risk of ${waterDatasetName} in ${year} in ${irrigationString} Crop Producing Areas
        & ${year} ${foodDatasetName} in ${countryName}`;
    }

    // food security dataset is selected and indicator (not water stress or seasonal variability)
    if (existsIndicator && (!isWaterStress && !isSeasonalVariability) && existsFood) {
      return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas &
        Projected ${year} ${foodDatasetName} in ${countryName}`;
    }

    // food security dataset is selected but no water risk indicator
    if (existsFood && !existsIndicator) {
      return `${irrigationString} Crop Producing Areas & Projected ${year} ${foodDatasetName} in ${countryName}`;
    }

    // only “all crops” is selected
    return `Irrigated & Rainfed Crop Producing Areas in ${countryName}`;
  }

  // Country, all crops, [change in] future year
  if (scope === 'country' && crop !== 'all' && year !== 'baseline' && countryName) {
    // only "irrigated" or "rainfed" is selected
    if (!existsIndicator && !existsFood) {
      return `${irrigationString} ${cropName} Producing Areas in ${countryName}`;
    }

    // water stress or seasonal variability selected (not food dataset)
    if ((isWaterStress || isSeasonalVariability) && !existsFood) {
      return `Projected ${typeString} Risk of ${waterDatasetName} in ${year} in ${irrigationString} ${cropName}
        Producing Areas in ${countryName}`;
    }

    // water risk indicators of water stress or seasonal variability
    // and a food security dataset is selected
    if ((isWaterStress || isSeasonalVariability) && existsFood) {
      return `Projected ${typeString} Risk of ${waterDatasetName} in ${year} in ${irrigationString} ${cropName}
        Producing Areas & ${year} ${foodDatasetName} in ${countryName}`;
    }

    // food security dataset is selected and indicator (not water stress or seasonal variability)
    if (existsIndicator && (!isWaterStress && !isSeasonalVariability) && existsFood) {
      return `Risk of ${waterDatasetName} in ${irrigationString} Crop Producing Areas &
        Projected ${year} ${foodDatasetName}`;
    }

    // food security dataset are selected but no water risk indicator
    if (existsFood && !existsIndicator) {
      return `${irrigationString} ${cropName} Producing Areas & Projected ${year} ${foodDatasetName} in ${countryName}`;
    }

    // only crop is selected
    return `Irrigated & Rainfed ${cropName} Producing Areas in ${countryName}`;
  }

  return null;
};

export default {
  getDictionary,
  getMapHeaderTemplate
};
