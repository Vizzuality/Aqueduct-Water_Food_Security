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
      { key: 'crop' }
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
    with a as (SELECT * FROM crops_risk_rankings
               WHERE irrigation='irrigated' AND indicator='water_stress' {{and}} and value is not null
               ORDER BY iso asc),
         b as (SELECT *
               FROM crops_risk_rankings
               WHERE irrigation='rainfed' AND indicator='drought_risk' {{and}} and value is not null
               ORDER BY iso asc)


    SELECT 'Area' as name, sum(area) as value, null as label
    FROM crops_risk_stats
    WHERE indicator='water_stress' {{and1}}

    UNION ALL

    SELECT 'Yield' as name, sum(prod)/sum(area) as value, null as label
    FROM crops_risk_stats
    WHERE indicator='water_stress' {{and1}}

    UNION ALL

    SELECT impactparameter AS name, sum(value) AS value, null as label
    FROM combined01_prepared_new
    WHERE impactparameter in ('Share Pop. at risk of hunger') and scenario = 'SSP2-MIRO' {{and2}}
    GROUP BY impactparameter

    UNION ALL

    SELECT 'Irrigated Area Water Stress Score' as name, value as value, label
    FROM a

  UNION ALL

    SELECT 'Rainfed Area Drought Severity Risk Score' as name, value as value, label
    FROM b
`;

export default {
  SQL_CONFIG,
  URL
};
