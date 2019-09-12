import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import { format } from 'd3-format';
import { Spinner, capitalizeFirstLetter } from 'aqueduct-components';

// utils
import { getObjectConversion } from 'utils/filters';

// constants
import { SQL_CONFIG, URL } from './constants';

class Summary extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      fields: []
    };

    this._mounted = false;
  }

  componentWillMount() {
    this.getData();
  }

  componentDidMount() {
    this._mounted = true;
  }

  // componentWillReceiveProps(nextProps) {
  //   const { filters } = this.props;
  //   const { filters: nextFilters } = nextProps;
  //   const filtersChanged = !isEqual(nextFilters, filters);

  //   if (filtersChanged) this.getData();
  // }

  componentDidUpdate(prevProps) {
    const { filters } = this.props;
    const { filters: prevFilters } = prevProps;
    const filtersChanged = !isEqual(prevFilters, filters);

    if (filtersChanged) this.getData();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getData() {
    const { filters } = this.props;
    const { crop } = filters;

    const widgetConfig = Object.assign({}, {
      sqlConfig: SQL_CONFIG,
      paramsConfig: [],
      data: { url: URL }
    });

    const widgetConfigParsed = getObjectConversion(
      widgetConfig,
      filters,
      'widget-2010',
      widgetConfig.paramsConfig,
      widgetConfig.sqlConfig
    );

    this.setState({ loading: true });

    fetch(new Request(widgetConfigParsed.data.url))
      .then((response) => {
        if (response.ok) return response.json();
        if (this._mounted) this.setState({ loading: false });
        throw new Error(response.statusText);
      })
      .then((data) => {
        const areaData = data.rows.find(r => r.name === 'Area');
        const popRiskHungerData = data.rows.find(r => r.name === 'Share Pop. at risk of hunger');

        const fields = [{
          title: 'Area',
          value: `${(areaData) ? format('.3s')(areaData.value) : '-'} ha`
        }, {
          title: 'Pop. at risk of hunger',
          value: `${(popRiskHungerData) ? format('.2f')(popRiskHungerData.value) : '-'} %`
        }];

        // Adds Yield field if there is a crop selected
        if (crop !== 'all') {
          const IAWSSData = data.rows.find(r => r.name === 'Irrigated Area Water Stress Score');
          fields.push({
            title: 'Irrigated Area Water Stress Score',
            label: IAWSSData && IAWSSData.label ? `${capitalizeFirstLetter(IAWSSData.label)}:` : null,
            value: `${(IAWSSData) ? format('.2f')(IAWSSData.value) : '-'}`,
          });

          const RADSRSData = data.rows.find(r => r.name === 'Rainfed Area Drought Severity Risk Score');
          fields.push({
            title: 'Rainfed Area Drought Severity Risk Score',
            label: RADSRSData && RADSRSData.label ? `${capitalizeFirstLetter(RADSRSData.label)}:` : null,
            value: `${(RADSRSData) ? format('.2f')(RADSRSData.value) : '-'}`
          });

          const yieldData = data.rows.find(r => r.name === 'Yield');
          fields.splice(1, 0, {
            title: 'Yield',
            value: `${(yieldData) ? format('.3s')(yieldData.value) : '-'} tons/ha`
          });
        }

        if (this._mounted) {
          this.setState({
            fields,
            loading: false
          });
        }
      });
  }

  getTitle() {
    const {
      filters: { crop },
      countryName
    } = this.props;
    const _crop = (crop && crop !== 'all') ? `(${capitalizeFirstLetter(crop)})` : '';
    return `${countryName} summary ${_crop}`;
  }

  render() {
    const { loading, fields } = this.state;

    return (
      <div className="c-summary">
        <div className="summary-content">
          <span className="summary-title">{this.getTitle()}</span>
          <Spinner isLoading={loading} className="-transparent" />
          <ul className="summary-list">
            {!!fields && fields.map(_field => (
              <li key={`${_field.value}`}>
                <span className="title">{_field.title}</span>
                <span className="amount">{_field.label} {_field.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Summary.propTypes = {
  filters: PropTypes.object.isRequired,
  countryName: PropTypes.string.isRequired
};


export default Summary;
