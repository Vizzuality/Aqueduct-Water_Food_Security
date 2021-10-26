import { formatDate } from 'utils/dates';
import { deburrUpper } from 'utils/data';
import { ID_LOOKUP, WATER_INDICATORS } from 'constants/water-indicators';
import moment from 'moment';

export const transformParamsForScope = (scope, params = {}) => {
  let result = { ...params }
  if (scope === 'supply_chain') {
    const indicatorKey = ID_LOOKUP[params.indicator]
    if (!indicatorKey) return result
    
    const indicator = WATER_INDICATORS[indicatorKey]
    if (!indicator) return result
    
    return {
      ...result,
      indicator: `${indicatorKey}_cat`,
      label: `${indicatorKey}_label`,
      value: `${indicatorKey}_raw`,
      threshold: indicator.toRaw(params.threshold)
    }
  }
  return result
}

export const reduceParams = (layerConfigParams = {}, appParams = {}) => {
  if (!layerConfigParams) return null;
  const currentParams = transformParamsForScope(appParams.scope, appParams)
  return layerConfigParams.reduce((obj, param) => {
    const { format, key, interval, count } = param;
    let paramValue = param.default || currentParams[key];
    const isDate = deburrUpper(param.key).includes('DATE');
    if (isDate && !paramValue) {
      let date = formatDate(new Date());
      if (interval && count) date = moment(date).subtract(count, interval);
      paramValue = moment(date).format(format || 'YYYY-MM-DD');
    }

    const newObj = {
      ...obj,
      [key]: paramValue,
      ...(key === 'endDate' &&
        param.url && { latestUrl: param.url })
    };
    return newObj;
  }, {});
};

export const reduceSqlParams = (layerConfigParams = {}, appParams = {}) => {
  if (!layerConfigParams) return null;
  return layerConfigParams.reduce((obj, param) => {
    const newObj = {
      ...obj,
      [param.key]: param.key_params.reduce((subObj, item) => {
        const keyValues = {
          ...subObj,
          ...(appParams[item.key]) && {[item.key]: appParams[item.key] }
        };
        return keyValues;
      }, {})
    };
    return newObj;
  }, {});
};

export default {
  reduceParams,
  reduceSqlParams
};
