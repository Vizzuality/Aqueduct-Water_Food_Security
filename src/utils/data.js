import deburr from 'lodash/deburr';
import toUpper from 'lodash/toUpper';
import isNil from 'lodash/isNil';
import { ExportToCsv } from 'export-to-csv';

export const deburrUpper = string =>
  toUpper(deburr(string));

export const downloadCSV = ({ data = [], headers, replaceNull = true, ...options } = {}) => {
  const csvExporter = new ExportToCsv({
    ...options,
    headers: headers || (data[0] && Object.keys(data[0]) || [])
  });
  csvExporter.generateCsv(replaceNull ? data.map(d => Object.entries(d).reduce((acc, [k, v]) => ({ ...acc, [k]: isNil(v) ? '' : v }), {})) : data);
};

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = () => resolve(btoa(reader.result));
  reader.onerror = error => reject(error);
});

export default { deburrUpper };
