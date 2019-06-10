export const SQL_CONFIG = [
  {
    key: 'and',
    key_params: [
      { key: 'iso' },
      { key: 'crop' },
      { key: 'year', dictionary: 'widget-2014' }
    ]
  },
  {
    key: 'and1',
    key_params: [
      { key: 'iso' },
      { key: 'irrigation' },
      { key: 'year', dictionary: 'food' },
      { key: 'commodity' }
    ]
  },
  {
    key: 'and2',
    key_params: [
      { key: 'iso' },
      { key: 'year', dictionary: 'food' }
    ]
  }
];

export const URL = `https://wri-rw.carto.com/api/v2/sql?q=
  with b as(SELECT * FROM water_risk_rankings_v3 WHERE irrigation='irrigated' AND indicator='water_stress' {{and}} and value is not null order by iso asc),
  c as (SELECT * FROM water_risk_rankings_v3 WHERE irrigation='rainfed' AND indicator='drought_stress' {{and}} and value is not null order by iso asc)

  SELECT impactparameter AS name, sum(value) AS value, null as label
  FROM combined01_prepared WHERE impactparameter in ('Area') and scenario = 'SSP2-MIRO'
  {{and1}} group by impactparameter

  UNION ALL

  SELECT impactparameter AS name, avg(value) AS value, null as label
  FROM combined01_prepared WHERE impactparameter in ('Yield') and scenario = 'SSP2-MIRO'
  {{and1}} group by impactparameter

  UNION ALL

  SELECT impactparameter AS name, sum(value) AS value, null as label
  FROM combined01_prepared WHERE impactparameter in ('Share Pop. at risk of hunger') and scenario = 'SSP2-MIRO'
  {{and2}} group by impactparameter

  UNION ALL

  SELECT 'Irrigated Area Water Stress Score' as name, value as value, label from b

  UNION ALL

  SELECT 'Rainfed Area Drought Severity Risk Score' as name, value as value, label from c
`;

export default {
  SQL_CONFIG,
  URL
};
