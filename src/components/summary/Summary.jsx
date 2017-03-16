import React from 'react';
import { getObjectConversion } from 'utils/filters/filters';
import { Spinner } from 'aqueduct-components';
import { isEqual } from 'lodash';
import { format } from 'd3-format';

export default class SummaryCountry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      country: '',
      loading: false,
      yield: '',
      area: ''
    };
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentWillMount() {
    const country = this.props.countries.length ? this.props.countries.find(c => c.id === this.props.filters.country).name : '';
    this.setState({ country }, this.getData);
  }

  componentWillReceiveProps(nextProps) {
    if (isEqual(nextProps.filters, this.props.filters)) return;

    const country = nextProps.countries.length ? nextProps.countries.find(c => c.id === nextProps.filters.country).name : '';
    this.setState({ country }, this.getData);
  }

  getData() {
    const sqlConfig = [
      {
        key: 'and',
        keyParams: [
          { key: 'iso' },
          { key: 'year' },
          { key: 'commodity' }
        ]
      }
    ];

    const url = `https://wri-01.carto.com/api/v2/sql?q=
      SELECT impactparameter AS name, sum(value) AS value
      FROM combined01_prepared WHERE impactparameter in ('Area', 'Yield')
      {{and}} group by impactparameter`;

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
      if (data.rows[0] === undefined) return;

      this._mounted && this.setState({
        loading: false,
        yield: `${format('.3s')(data.rows[0].value)} tons/ha`,
        area: `${format('.3s')(data.rows[1].value)} ha`
      });
    });
  }

  render() {
    return (
      <div className="c-summary">
        <div className="summary-content">
          <span className="summary-title">{`${this.state.country} summary`}</span>
          <Spinner isLoading={this.state.loading} className="-transparent" />
          <ul className="summary-list">
            <li>
              <span className="title">Yield</span>
              <span className="amount">{this.state.yield}</span>
            </li>
            <li>
              <span className="title">Area</span>
              <span className="amount">{this.state.area}</span>
            </li>
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
