import { substitution, concatenation } from 'utils/utils';

export function widgetsFilter(widget, { scope, crop, country }, datasetTags) {
  const _crop = crop === 'all' ? 'all_crops' : 'one_crop';
  const _country = scope === 'country' && country ? 'country' : 'global';

  return datasetTags && datasetTags.includes(_crop) && datasetTags.includes(_country);
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
              value: (!filters[p.key] || filters[p.key].length === 0 || filters[p.key].length === 2) ? null : filters[p.key]
            };
          }
          case 'iso': {
            return {
              key: p.key,
              value: (filters.country) ? filters.country : null
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
        return {
          key: p.key,
          value: filters[p.key]
        };
      })
    };
  });

  return Object.assign({}, layer.body, {
    url: getConversion(layer.body.url, params, sqlParams)
  });
}

function getWaterColumn({ water, year }, sufix) {
  const layers = {
    '6c49ae6c-2c73-46ac-93ab-d4ed1b05d44e': {
      indicator: 'ws',
      dataType: 't'
    },
    '345cfef3-ee8a-46bc-9bb9-164c406dfd2c': {
      indicator: 'ws',
      dataType: 'u'
    },
    'd9785282-2140-463f-a82d-f7296687055a': {
      indicator: 'ws',
      dataType: 't'
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

export function getWidgetSql(widgetConfig, filters) {
  const newConfig = Object.assign({}, widgetConfig);
  const { data } = newConfig;

  // Dictionary
  const yearOptions = {
    baseline: 2010,
    2020: 2020,
    2030: 2030,
    2040: 2040,
    2050: 2050
  };

  // paramsConfig transform
  const paramsConfig = widgetConfig.paramsConfig.map((param) => {
    switch (param.key) {
      case 'water_column':
        return {
          key: param.key,
          value: getWaterColumn(filters, param.sufix)
        };
      case 'irrigation':
        return {
          key: param.key,
          // We can't have a irrigation different from 1, in this case we don't need to add anything
          value: (!filters[param.key] || filters[param.key].length === 0 || filters[param.key].length === 2) ? null : filters[param.key]
        };
      case 'iso':
        return {
          key: param.key,
          value: (filters.country) ? filters.country : null
        };
      default:
        return {
          key: param.key,
          value: param.key === 'year' ? yearOptions[filters[param.key]] : filters[param.key]
        };
    }
  });

  // sqlConfig transform
  const sqlConfig = widgetConfig.sqlConfig.map((param) => {
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
          default:
            return {
              key: p.key,
              value: filters[p.key]
            };
        }
      })
    };
  });

  // sql query substitution
  data.forEach((item) => {
    if (item.url) {
      item.url = substitution(item.url, paramsConfig);
      item.url = concatenation(item.url, sqlConfig);
    }
    if (item.value) {
      Object.keys(item.value).forEach((key) => {
        item.value[key] = substitution(item.value[key], paramsConfig);
        item.value[key] = concatenation(item.value[key], sqlConfig);
      });
    }
  });

  return newConfig;
}

function getConversion(string, params, sqlParams) {
  let str = string;
  str = substitution(str, params);
  str = concatenation(str, sqlParams);

  return str;
}
