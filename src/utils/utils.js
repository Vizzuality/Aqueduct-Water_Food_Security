import compact from 'lodash/compact';

export function substitution(string, params) {
  // Params should have this format => [{key:'xxx', value:'xxx'},{key:'xxx', value:'xxx'}]
  // Keys to search should be in this format {{key}}
  let str = string;
  params.forEach((param) => {
    str = str.replace(new RegExp(`{{${param.key}}}`, 'g'), param.value);
  });
  return str;
}

export function concatenation(string, params) {
  // Params should have this format => [{key:'xxx', key_params:[{key:'xxx', value:'xxx'},{key:'xxx', value:'xxx'}]}]
  // Keys to search should be in this format {{key}}
  let str = string;
  let sql;
  params.forEach((param) => {
    sql = `WHERE ${compact(param.key_params.map((p) => {
      if (p.value) {
        return `${p.key} = '${p.value}'`;
      }
      return null;
    })).join(' AND ')}`;
    str = str.replace(new RegExp(`{{${param.key}}}`, 'g'), sql);
  });
  return str;
}
