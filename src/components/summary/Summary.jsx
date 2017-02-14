import React from 'react';
import { getWidgetSql } from 'utils/filters/filters';
import { Spinner } from 'aqueduct-components';
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
  }

  componentWillMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.filters.country !== this.props.filters.country) || (nextProps.countries.length !== this.props.countries.length)) {
      const country = nextProps.countries.length ? nextProps.countries.find(c => c.id === nextProps.filters.country).name : '';
      this.setState({ country });
    }

    this.getData();
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
    const config = getWidgetSql({ sqlConfig, paramsConfig: [], data: { url } }, this.props.filters);

    this.setState({ loading: true });

    fetch(new Request(config.data.url))
    .then((response) => {
      if (response.ok) return response.json();
      this.setState({ loading: false });
      throw new Error(response.statusText);
    })
    .then((data) => {
      this.setState({
        loading: false,
        yield: `${format('.3s')(data.rows[0].value)} ton`,
        area: `${format('.3s')(data.rows[1].value)} ha`
      });
    });
  }

  render() {
    return (
      <div className="c-summary">
        <span className="summary-title">{this.state.country}</span>
        <div className="summary-content">
          <Spinner isLoading={this.state.loading} />
          <dl className="summary-list">
            <dt>Yield</dt>
            <dd>{this.state.yield}</dd>
            <dt>Area</dt>
            <dd>{this.state.area}</dd>
          </dl>
        </div>
      </div>
    );
  }
}

SummaryCountry.propTypes = {
  filters: React.PropTypes.object,
  countries: React.PropTypes.array
};
