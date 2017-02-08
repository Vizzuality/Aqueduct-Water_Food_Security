import { substitution, concatenation } from 'utils/utils';

// Util functions

function getConversion(string, params, sqlParams) {
  let str = string;
  str = substitution(str, params);
  str = concatenation(str, sqlParams);

  return str;
}

function getWaterColumn({ water, year, changeFromBaseline }, sufix, widget) {
  const layers = {
    '6c49ae6c-2c73-46ac-93ab-d4ed1b05d44e': {
      indicator: 'ws',
      dataType: changeFromBaseline && !widget ? 'c' : 't'
    },
    '345cfef3-ee8a-46bc-9bb9-164c406dfd2c': {
      indicator: 'ws',
      dataType: 'u'
    },
    'd9785282-2140-463f-a82d-f7296687055a': {
      indicator: 'ws',
      dataType: changeFromBaseline && !widget ? 'c' : 't'
    },
    none: {
      indicator: 'ws',
      dataType: changeFromBaseline && !widget ? 'c' : 't'
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

  const _indicator = layers[water].indicator;
  const _year = yearOptions[year];
  const _dataType = layers[water].dataType;
  const _scenario = (year === 'baseline') ? '00' : '28';

  return `${_indicator}${_year}${_scenario}${_dataType}${sufix || 'r'}`;
}

// LAYER FUNCTIONS
export function getWaterSql(layer = {}, filters = {}) {
  const yearOptions = {
    baseline: 2010,
    2020: 2020,
    2030: 2030,
    2040: 2040,
    2050: 2050
  };

  // Merge filters && paramsConfig
  const params = layer.paramsConfig.map((param) => {
    switch (param.key) {
      case 'water_column':
        return {
          key: param.key,
          value: getWaterColumn(filters)
        };
      case 'iso': {
        return {
          key: param.key,
          value: (filters.scope === 'country' && filters.country) ? filters.country : null
        };
      }

      default:
        return {
          key: param.key,
          value: filters[param.key]
        };
    }
  });

  // Merge filters && sqlConfig
  const sqlParams = layer.sqlConfig.map((param) => {
    return {
      key: param.key,
      keyParams: param.keyParams.map((p) => {
        switch (p.key) {
          case 'year': {
            return {
              key: p.key,
              value: yearOptions[filters[p.key]]
            };
          }
          case 'crop': {
            return {
              key: p.key,
              value: (filters[p.key] !== 'all') ? filters[p.key] : null
            };
          }
          case 'irrigation': {
            return {
              key: p.key,
              // We can't have a irrigation different from 1, in this case we don't need to add anything
              value: (!filters[p.key] || filters[p.key].length === 0 || filters[p.key].length === 2) ? null : filters[p.key][0]
            };
          }
          case 'iso': {
            return {
              key: p.key,
              value: (filters.scope === 'country' && filters.country) ? filters.country : null
            };
          }

          default:
            return {
              key: p.key,
              value: filters[p.key]
            };
        }
      })
    };
  });

  return Object.assign({}, layer.body, {
    layers: layer.body.layers.map((l) => {
      return Object.assign({}, l, {
        options: Object.assign({}, l.options, {
          user_name: layer.account,
          cartocss: getConversion(l.options.cartocss, params, sqlParams),
          cartocss_version: l.options.cartocssVersion,
          sql: getConversion(l.options.sql, params, sqlParams)
        })
      });
    })
  });
}


export function getFoodSql(layer = {}, filters = {}) {
  // Dictionary
  const yearOptions = {
    baseline: 2005,
    2020: 2020,
    2030: 2030,
    2040: 2040,
    2050: 2050
  };

  const params = layer.paramsConfig.map((param) => {
    switch (param.key) {
      case 'year':
        return {
          key: param.key,
          value: yearOptions[filters[param.key]]
        };
      default:
        return {
          key: param.key,
          value: filters[param.key]
        };
    }
  });

  // Merge filters && sqlConfig
  const sqlParams = layer.sqlConfig.map((param) => {
    return {
      key: param.key,
      keyParams: param.keyParams.map((p) => {
        switch (p.key) {
          case 'year': {
            return {
              key: p.key,
              value: yearOptions[filters[p.key]]
            };
          }
          case 'commodity': {
            return {
              key: `lower(${p.key})`,
              value: (filters.crop !== 'all') ? filters.crop : null
            };
          }
          case 'iso':
            return {
              key: p.key,
              value: (filters.scope === 'country' && filters.country) ? filters.country : null
            };
          default:
            return {
              key: p.key,
              value: filters[p.key]
            };
        }
      })
    };
  });

  return Object.assign({}, layer.body, {
    url: getConversion(layer.body.url, params, sqlParams)
  });
}

// WIDGET FUNCTIONS

export function widgetsFilter(widget, { scope, crop, country }, compare, datasetTags) {
  const _crop = crop === 'all' ? 'all_crops' : 'one_crop';
  const _country = ((scope === 'country' && country) || compare.countries.length) ? 'country' : 'global';
  return datasetTags && datasetTags.includes(_crop) && datasetTags.includes(_country);
}

export function getWidgetSql(widgetConfig, filters) {
  // Dictionary
  const yearOptions = {
    baseline: 2010,
    2020: 2020,
    2030: 2030,
    2040: 2040
  };

  // paramsConfig transform
  const params = widgetConfig.paramsConfig.map((param) => {
    switch (param.key) {
      case 'water_column':
        return {
          key: param.key,
          value: getWaterColumn(filters, param.sufix, true)
        };
      case 'year': {
        return {
          key: param.key,
          value: yearOptions[filters[param.key]]
        };
      }
      case 'irrigation':
        return {
          key: param.key,
          // We can't have a irrigation different from 1, in this case we don't need to add anything
          value: (!filters[param.key] || filters[param.key].length === 0 || filters[param.key].length === 2) ? null : filters[param.key]
        };
      case 'iso':
        return {
          key: param.key,
          value: (filters.scope === 'country' && filters.country) ? filters.country : null
        };
      case 'commodity':
        return {
          key: param.key,
          value: filters.crop
        };
      case 'crops.iso':
        return {
          key: param.key,
          value: (filters.scope === 'country' && filters.country) ? filters.country : null
        };
      default:
        return {
          key: param.key,
          value: filters[param.key]
        };
    }
  });

  // sqlConfig transform
  const sqlParams = widgetConfig.sqlConfig.map((param) => {
    return {
      key: param.key,
      keyParams: param.keyParams.map((p) => {
        switch (p.key) {
          case 'year': {
            return {
              key: p.key,
              value: yearOptions[filters[p.key]]
            };
          }
          case 'commodity': {
            return {
              key: `lower(${p.key})`,
              value: (filters.crop !== 'all') ? filters.crop : null
            };
          }
          case 'iso':
            return {
              key: p.key,
              value: (filters.scope === 'country' && filters.country) ? filters.country : null
            };
          case 'crops.iso':
            return {
              key: p.key,
              value: (filters.scope === 'country' && filters.country) ? filters.country : null
            };
          default:
            return {
              key: p.key,
              value: filters[p.key]
            };
        }
      })
    };
  });
  return Object.assign({}, widgetConfig, {
    data: JSON.parse(getConversion(JSON.stringify(widgetConfig.data), params, sqlParams))
  });
}
