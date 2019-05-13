import { formatDate } from 'utils/dates';
import { deburrUpper } from 'utils/data';
import moment from 'moment';

export const reduceParams = (layerConfigParams = {}, appParams = {}) => {
  if (!layerConfigParams) return null;
  return layerConfigParams.reduce((obj, param) => {
    const { format, key, interval, count } = param;
    let paramValue = param.default || appParams[key];
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
