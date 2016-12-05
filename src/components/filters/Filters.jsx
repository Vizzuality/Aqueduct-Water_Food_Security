import React from 'react';

import RadioGroup from 'components/ui/RadioGroup';
import SegmentedUi from 'components/ui/SegmentedUi';
import CountrySelect from 'containers/countries/CountrySelect';
import { predictionOptions, waterOptions, foodOptions, scopeOptions } from 'constants/filters';

export default class Filters extends React.Component {

  constructor(props) {
    super(props);

    // Bindings
    this.updateFilters = this.updateFilters.bind(this);
  }

  updateFilters(value, field) {
    const newFilter = {
      [field]: value
    };
    this.props.setFilters(newFilter);
  }

  render() {
    return (
      <div className="c-filters">
        <SegmentedUi
          items={scopeOptions}
          selected={this.props.filters.scope}
          onChange={selected => this.updateFilters(selected.value, 'scope')}
        />
        <div className="row">
          <div className="small-4">
            {this.props.filters.scope === 'country' &&
              <CountrySelect
                onValueChange={selected => this.updateFilters(selected.value, 'country')}
              />
            }
          </div>
          <div className="small-8">
            <SegmentedUi
              items={predictionOptions}
              selected={this.props.filters.prediction}
              onChange={selected => this.updateFilters(selected.value, 'prediction')}
            />
          </div>
        </div>
        <div className="row">
          <div className="small-4">
            {/* Food */}
            <RadioGroup
              title="Food"
              name="Food"
              items={foodOptions}
              selected={this.props.filters.food}
              onChange={selected => this.updateFilters(selected.value, 'food')}
            />
          </div>
          <div className="small-4">
            {/* Water */}
            <RadioGroup
              title="Water"
              name="Water"
              selected={this.props.filters.water}
              items={waterOptions}
              onChange={selected => this.updateFilters(selected.value, 'water')}
            />
          </div>
          <div className="small-4" />
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  setFilters: React.PropTypes.func,
  filters: React.PropTypes.object
};
