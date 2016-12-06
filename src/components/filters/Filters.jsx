import React from 'react';
// Components
import CheckboxGroup from 'components/ui/CheckboxGroup';
import SegmentedUi from 'components/ui/SegmentedUi';
import CountrySelect from 'containers/countries/CountrySelect';
import { SimpleSelect } from 'react-selectize';
import { Link } from 'react-router';
// Options
import { predictionOptions, waterOptions, foodOptions, scopeOptions, baselineOptions, cropOptions, irrigationOptions } from 'constants/filters';

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
        <div className="collapsed-wrapper">
          <SegmentedUi
            className="-tabs"
            items={scopeOptions}
            selected={this.props.filters.scope}
            onChange={selected => this.updateFilters(selected.value, 'scope')}
          />
        </div>
        {this.props.filters.scope === 'country' &&
          <div className="row collapse-borders section -lead">
            <div className="small-4 columns">
              {/* Country */}
              <CountrySelect
                onValueChange={selected => this.updateFilters(selected && selected.value, 'country')}
                defaultValue={this.props.filters.country !== 'null' ? this.props.filters.country : null}
              />
            </div>
            <div className="small-8 columns">
              {/* Compare */}
              <Link className="filters-btn" to={`/compare?countries=${this.props.filters.country}`}>Compare countries</Link>
            </div>
          </div>
        }
        <div className="section">
          <div className="row collapse-borders wrapper">
            <div className="small-4 columns">
              {/* Baseline */}
              <SimpleSelect
                hideResetButton
                options={baselineOptions}
                defaultValue={baselineOptions.find(i => i.value === this.props.filters.baseline)}
                onValueChange={selected => selected && this.updateFilters(selected.value, 'baseline')}
              />
            </div>
            <div className="small-8 columns">
              {/* Prediction */}
              <SegmentedUi
                className="-btn"
                items={predictionOptions}
                selected={this.props.filters.prediction}
                onChange={selected => this.updateFilters(selected.value, 'prediction')}
              />
            </div>
          </div>
          <div className="row collapse-borders wrapper">
            <div className="small-4 columns">
              {/* Crops */}
              <span className="react-selectize-title">Crops</span>
              <SimpleSelect
                hideResetButton
                options={cropOptions}
                defaultValue={cropOptions.find(i => i.value === this.props.filters.crop)}
                onValueChange={selected => selected && this.updateFilters(selected.value, 'crop')}
              />
            </div>
            <div className="small-4 columns">
              {/* Water */}
              <span className="react-selectize-title">Water</span>
              <SimpleSelect
                hideResetButton
                options={waterOptions}
                defaultValue={waterOptions.find(i => i.value === this.props.filters.water)}
                onValueChange={selected => selected && this.updateFilters(selected.value, 'water')}
              />
            </div>
            <div className="small-4 columns">
              {/* Food */}
              <span className="react-selectize-title">Food</span>
              <SimpleSelect
                hideResetButton
                options={foodOptions}
                defaultValue={foodOptions.find(i => i.value === this.props.filters.food)}
                onValueChange={selected => selected && this.updateFilters(selected.value, 'food')}
              />
            </div>
          </div>
          <div className="row collapse-borders">
            <div className="small-12 columns">
              <CheckboxGroup
                items={irrigationOptions}
                onChange={selected => this.updateFilters(selected, 'irrigation')}
                selected={this.props.filters.irrigation}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  setFilters: React.PropTypes.func,
  filters: React.PropTypes.object
};
