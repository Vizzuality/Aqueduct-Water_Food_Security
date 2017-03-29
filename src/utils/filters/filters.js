import { substitution, concatenation } from 'utils/utils';

// Util functions
function getConversion(obj, params, sqlParams) {
  const isObject = typeof obj === 'object';
  let str = obj;
  if (isObject) {
    str = JSON.stringify(obj);
  }
  str = substitution(str, params);
  str = concatenation(str, sqlParams);

  return isObject ? JSON.parse(str) : str;
}

function getIndicator({ indicator }) {
  const layers = {
    // Water stress
    '6c49ae6c-2c73-46ac-93ab-d4ed1b05d44e': 'water_stress',
    // Seasonal variability
    'd9785282-2140-463f-a82d-f7296687055a': 'seasonal_variability',
    // none
    none: 'water_stress'
  };

  return layers[indicator] || 'water_stress';
}

// Keep this function by now to add compatibility. REMOVE in the future.
function getWaterColumn({ indicator, year, type }, sufix, widget) {
  const layers = {
    // Water stress
    '6c49ae6c-2c73-46ac-93ab-d4ed1b05d44e': {
      indicator: 'ws',
      dataType: type === 'change_from_baseline' && !widget ? 'c' : 't',
      sufix: type === 'change_from_baseline' && !widget ? 'l' : 'r'
    },
    // Seasonal variability
    'd9785282-2140-463f-a82d-f7296687055a': {
      indicator: 'sv',
      dataType: type === 'change_from_baseline' && !widget ? 'c' : 't',
      sufix: type === 'change_from_baseline' && !widget ? 'l' : 'r'
    },
    none: {
      indicator: 'ws',
      dataType: type === 'change_from_baseline' && !widget ? 'c' : 't',
      sufix: type === 'change_from_baseline' && !widget ? 'l' : 'r'
    }
  };

  // Dictionary
  const yearOptions = {
    baseline: 'bs',
    2020: '20',
    2030: '30',
    2040: '40',
    2050: '50'
  };

  let _indicator = layers[indicator].indicator;
  const _year = yearOptions[year];
  const _dataType = layers[indicator].dataType;
  const _scenario = (year === 'baseline') ? '00' : '28';
  const _sufix = sufix || layers[indicator].sufix;


  /**
   * A bomb has been planted!
   *
   * For Seasonal Variability-based widgets, their table name
   * don't match with its dataset one, that's why we have to changed it
   * manually. This should be REMOVED in the future.
   **/
  if (layers[indicator].indicator === 'sv' && widget === true) {
    _indicator = 'ws';
  }

  return `${_indicator}${_year}${_scenario}${_dataType}${_sufix}`;
}

/**
 * obj is the object to be converted
 * filters
 * category is a string to split some conversions and dictionaries. It can be 'food', 'water', 'widget'
 */
export function getObjectConversion(obj = {}, filters = {}, category) {
  const dictionaries = {
    water: {
      yearOptions: {
        baseline: 'bs',
        2020: 2020,
        2030: 2030,
        2040: 2040,
        2050: 2050
      }
    },
    food: {
      yearOptions: {
        baseline: 2005,
        2020: 2020,
        2030: 2030,
        2040: 2040,
        2050: 2050
      }
    },
    widget: {
      yearOptions: {
        baseline: 2010,
        2020: 2020,
        2030: 2030,
        2040: 2040
      }
    }
  };

  const dictionary = category ? dictionaries[category] : null;

  const conversions = {
    iso: key => ({
      key,
      value: (filters.scope === 'country' && filters.country) ? filters.country : null
    }),
    'crops.iso': key => ({
      key,
      value: (filters.scope === 'country' && filters.country) ? filters.country : null
    }),
    crop: key => ({
      key,
      value: filters.crop !== 'all' ? filters.crop : null
    }),
    type: key => ({
      key,
      value: filters.type || 'absolute'
    }),
    period: key => ({
      key,
      value: filters.period || 'year'
    }),
    period_value: key => ({
      key,
      value: filters.period_value || null
    }),
    year: key => ({
      key,
      value: dictionary ? dictionary.yearOptions[filters[key]] : 'baseline'
    }),
    irrigation: key => ({
      key,
      // We can't have a irrigation different from 1, in this case we don't need to add anything
      value: (!filters[key] || filters[key].length === 0 || filters[key].length === 2) ? null : filters[key]
    }),
    commodity: (key, isSql) => ({
      key: (isSql) ? `lower(${key})` : key,
      value: filters.crop !== 'all' ? filters.crop : null
    }),
    crop_scenario: key => ({
      key,
      value: filters.crop_scenario || 'SSP2-MIRO'
    }),
    indicator: key => ({
      key,
      value: getIndicator(filters) || null
    }),
    model: key => ({
      key,
      value: filters.model || 'bau'
    }),
    // Old params. Keep them to add compatibility with old format
    water_column: (param, isWidget = false) => ({
      key: param.key,
      value: getWaterColumn(filters, param.sufix, isWidget)
    })
  };

  const params = obj.paramsConfig.map((p) => {
    // Remove once water_column is not used anymore
    if (p.key === 'water_column') {
      if (category === 'widget') {
        return conversions[p.key] ? conversions[p.key](p, true) : filters[p.key];
      }

      return conversions[p.key] ? conversions[p.key](p) : filters[p.key];
    }
    return conversions[p.key] ? conversions[p.key](p.key) : filters[p.key];
  });

  const sqlParams = obj.sqlConfig.map((param) => {
    return {
      key: param.key,
      keyParams: param.keyParams.map((p) => {
        return conversions[p.key] ? conversions[p.key](p.key, true) : filters[p.key];
      })
    };
  });

  // Text widgets have a different parse
  if (category === 'widget' && obj.type === 'text') {
    return Object.assign({}, obj, {
      data: JSON.parse(getConversion(JSON.stringify(obj.data), params, sqlParams))
    });
  }

  return getConversion(obj, params, sqlParams);
}

export function widgetsFilter(widget, { scope, crop, country, indicator }, compare, datasetTags) {
  const _crop = crop === 'all' ? 'all_crops' : 'one_crop';
  const _country = ((scope === 'country' && country) || compare.countries.length) ? 'country' : 'global';

  return datasetTags && datasetTags.includes(_crop) && datasetTags.includes(_country);
}
