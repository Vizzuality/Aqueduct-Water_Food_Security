import React from 'react';
import isEqual from 'lodash/isEqual';
import { cropOptions, irrigationOptions, scopeOptions, waterOptions } from 'constants/filters';

const dictionary = {
  crop(crop) {
    return (crop !== 'all') ? cropOptions.find(v => v.value === crop).label : '';
  },
  country(scope, iso) {
    if (!iso || scope === 'global') return '';

    const countryName = this.props.countries.find(c => c.id === iso).name;
    // be careful with names ending in 's'
    return `${countryName}'s`;
  },
  irrigation(irrigation) {
    if (!irrigation.length) {
      return irrigationOptions.map(r => r.label).join(' & ');
    }

    return irrigation.map((val) => {
      return irrigationOptions.find(v => v.value === val).label;
    }).join(' & ');
  },
  scope(scope, iso) {
    return !iso || scope === 'global' ? scopeOptions.find(v => v.value === 'global').label : '';
  },
  water(water) {
    return water !== 'none' ? waterOptions.find(v => v.value === water).label : '';
  }
};

export default class DynamicHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.filters, this.props)) {
      this.setState({
        filters: nextProps.filters
      }, this.getDynamicText);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextState, this.state);
  }

  getDynamicText() {
    const { filters } = this.state;

    const water = dictionary.water(filters.water);
    const scope = dictionary.scope(filters.scope, filters.country);
    const irrigation = dictionary.irrigation(filters.irrigation);
    const crop = dictionary.crop(filters.crop);
    const country = dictionary.country.call(this, filters.scope, filters.country);

    const text = `${scope} ${country} ${water} ${irrigation} ${crop} Producing Areas`;

    this.setState({
      text
    });
  }

  render() {
    return (
      <div className="c-dynamic-map-header">
        {this.state.text &&
          <p>{this.state.text}</p>
        }
      </div>
    );
  }

}

DynamicHeader.propTypes = {
  countries: React.PropTypes.array,
  filters: React.PropTypes.object
};
