import React from 'react';
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
          { key: 'year' }
        ]
      },
      {
        key: 'and1',
        keyParams: [
          { key: 'iso' },
          { key: 'year' },
          { key: 'commodity' }
        ]
      }
    ];

    const url = `https://wri-01.carto.com/api/v2/sql?q=
      with chstress as (SELECT iso, values from aqueduct_water_stress_country_ranking_bau where type = 'all' {{and}})
      SELECT impactparameter AS name, sum(value) AS value
      FROM combined01_prepared WHERE impactparameter in ('Area', 'Yield','Share Pop. at risk of hunger') and scenario = 'SSP2-MIRO'
      {{and1}} group by impactparameter union all select 'Water risk score' as name, values as value from chstress
    `;

    const widgetConfig = Object.assign({}, {
      sqlConfig,
      paramsConfig: [],
      data: { url }
    });

    const widgetConfigParsed = getObjectConversion(widgetConfig, this.props.filters, 'widget');

    this.setState({ loading: true });

    fetch(new Request(widgetConfigParsed.data.url))
      .then((response) => {
        if (response.ok) return response.json();
        this._mounted && this.setState({ loading: false });
        throw new Error(response.statusText);
      })
      .then((data) => {
        const yieldData = (data.rows[0]) ? format('.3s')(data.rows[0].value) : '-';
        const areaData = (data.rows[1]) ? format('.3s')(data.rows[1].value) : '-';
        const popRiskHungerData = (data.rows[2]) ? format('.2f')(data.rows[2].value) : '-';
        const score = (data.rows[3]) ? data.rows[3].value : '-';

        this._mounted && this.setState({
          score,
          fields: [{
            title: 'Water risk score',
            value: score
          }, {
            title: 'Yield',
            value: `${yieldData} tons/ha`
          }, {
            title: 'Area',
            value: `${areaData} ha`
          }, {
            title: 'Pop. at risk of hunger',
            value: `${popRiskHungerData}%`
          }],
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
  filters: React.PropTypes.object,
  countries: React.PropTypes.array
};
