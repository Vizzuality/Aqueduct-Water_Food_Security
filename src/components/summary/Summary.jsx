import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { format } from 'd3-format';
import { Spinner, getObjectConversion, capitalizeFirstLetter } from 'aqueduct-components';

export default class SummaryCountry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      country: '',
      loading: false,
      fields: []
    };
    this._mounted = false;
  }

  componentWillMount() {
    const country = this.props.countries.length ? this.props.countries.find(c => c.id === this.props.filters.country).name : '';
    this.setState({ country }, () => {
      this.getData(this.props);
    });
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (isEqual(nextProps.filters, this.props.filters) && nextProps.countries.length === this.props.countries.length) return;

    const country = nextProps.countries.length ? nextProps.countries.find(c => c.id === nextProps.filters.country).name : '';
    this.setState({ country }, this.getData);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getData(props) {
    const sqlConfig = [
      {
        key: 'and',
        keyParams: [
          { key: 'iso' },
          { key: 'year', dictionary: 'widget-2010' }
        ]
      },
      {
        key: 'and1',
        keyParams: [
          { key: 'iso' },
          { key: 'year', dictionary: 'food' },
          { key: 'commodity' }
        ]
      },
      {
        key: 'and2',
        keyParams: [
          { key: 'iso' },
          { key: 'year', dictionary: 'food' }
        ]
      }
    ];
    const { crop } = this.props.filters;

    const impactParameter = (crop !== 'all') ? `('Area', 'Yield')` : `('Area')`;

    const url = `https://wri-rw.carto.com/api/v2/sql?q=
      with chstress as (SELECT iso, values from aqueduct_water_stress_country_ranking_bau where type = 'all' {{and}})

      SELECT impactparameter AS name, sum(value) AS value
      FROM combined01_prepared WHERE impactparameter in ${impactParameter} and scenario = 'SSP2-MIRO'
      {{and1}} group by impactparameter

      UNION ALL

      SELECT impactparameter AS name, sum(value) AS value
      FROM combined01_prepared WHERE impactparameter in ('Share Pop. at risk of hunger') and scenario = 'SSP2-MIRO'
      {{and2}} group by impactparameter

      UNION ALL

      SELECT 'Water risk score' as name, values as value FROM chstress
    `;

    const widgetConfig = Object.assign({}, {
      sqlConfig,
      paramsConfig: [],
      data: { url }
    });

    const widgetConfigParsed = getObjectConversion(
      widgetConfig,
      this.props.filters,
      'widget-2010',
      widgetConfig.paramsConfig,
      widgetConfig.sqlConfig
    );

    this.setState({ loading: true });

    fetch(new Request(widgetConfigParsed.data.url))
      .then((response) => {
        if (response.ok) return response.json();
        this._mounted && this.setState({ loading: false });
        throw new Error(response.statusText);
      })
      .then((data) => {
        const areaData = data.rows.find(r => r.name === 'Area');
        const popRiskHungerData = data.rows.find(r => r.name === 'Share Pop. at risk of hunger');
        const score = data.rows.find(r => r.name === 'Water risk score');

        const fields = [{
          title: 'Water risk score',
          value: (score) ? score.value : '-'
        }, {
          title: 'Area',
          value: `${(areaData) ? format('.3s')(areaData.value) : '-'} ha`
        }, {
          title: 'Pop. at risk of hunger',
          value: `${(popRiskHungerData) ? format('.2f')(popRiskHungerData.value) : '-'} %`
        }];

        // Adds Yield field if there is a crop selected
        if(crop !== 'all') {
          const yieldData = (data.rows[0]) ? format('.3s')(data.rows[0].value) : '-';
          fields.splice(1, 0, {
            title: 'Yield',
            value: `${yieldData} tons/ha`
          });
        }

        this._mounted && this.setState({
          score,
          fields,
          loading: false
        });
      });
  }

  getTitle() {
    let { crop } = this.props.filters;
    const { country } = this.state;
    crop = (crop !== 'all') ? `(${capitalizeFirstLetter(crop)})` : '';
    return `${country} summary ${crop}`;
  }

  render() {
    return (
      <div className="c-summary">
        <div className="summary-content">
          <span className="summary-title">{this.getTitle()}</span>
          <Spinner isLoading={this.state.loading} className="-transparent" />
          <ul className="summary-list">
            {!!this.state.fields && this.state.fields.map((f, i) => {
              return (
                <li key={i}>
                  <span className="title">{f.title}</span>
                  <span className="amount">{f.value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

SummaryCountry.propTypes = {
  filters: PropTypes.object,
  countries: PropTypes.array
};
