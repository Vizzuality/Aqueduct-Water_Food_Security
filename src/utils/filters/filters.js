function substitution(string, params) {
  let str;
  let key;
  params.forEach((param) => {
    key = Object.keys(param)[0];
    str = string.replace(new RegExp(`{{${key}}}`, 'g'), param[key]);
  });
  return str;
}

export function widgetsFilter(widget, { crop, country }) {
  // TODO: uncomment when using real api data
  // const _crop = crop === 'all' ? 'all_crops' : 'one_crop';
  // const _country = country ? 'country' : 'global';
  //
  // return widget.tags && widget.tags.includes(_crop) && widget.tags.includes(_country);
  return true;
}

// LAYER FUNCTIONS
export function waterConverter(filters, paramsConfig, sqlConfig) {
  console.info(filters, paramsConfig, sqlConfig);
}


export function foodConverter(string, filters, paramsConfig, sqlConfig) {
  // Dictionary
  const yearOptions = {
    baseline: '2005',
    2020: '2020',
    2030: '2030',
    2040: '2040',
    2050: '2050'
  };

  // Merge filters && paramsConfig
  const keysArr = Object.keys(paramsConfig);
  const params = keysArr.map((key) => {
    switch (key) {
      case 'year':
        return { [key]: yearOptions[filters[key]] };
      default:
        return { [key]: filters[key] };
    }
  });

  // return the string with the keys substituted
  return substitution(string, params);
}

export function getWaterColumn({ year, scenario }) {
  // Dictionary
  const yearOptions = {
    baseline: '00',
    2020: '20',
    2030: '30',
    2040: '40',
    2050: '50'
  };
  const scenarioOptions = {
    optimistic: 24,
    business: 28,
    pesimistic: 38
  };

  const _indicator = 'ws'; // 'ws'=>'Water riks layer', 'sv'=> 'Ground layer'
  const _year = yearOptions[year];
  const _dataType = 'c';
  const _sufix = 'r';
  const _scenario = scenarioOptions[scenario];

  return `${_indicator}${_year}${_scenario}${_dataType}${_sufix}`;
}
