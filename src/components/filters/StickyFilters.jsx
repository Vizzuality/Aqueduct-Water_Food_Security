import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  CROP_OPTIONS,
  DATA_TYPE_OPTIONS,
  YEAR_OPTIONS,
  SegmentedUi,
  CustomSelect
} from 'aqueduct-components';
import CountrySelect from 'containers/countries/CountrySelect';
import { SCOPE_OPTIONS, WATER_OPTIONS, FOOD_OPTIONS } from 'constants/filters';

class StickyFilters extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      countryToCompare: null
    };
  }

  updateFilters(value, field) {
    const newFilter = {
      [field]: value
    };

    this.props.setFilters(newFilter);
  }

  render() {
    const stickyFilterClass = classnames('c-sticky-filters', {
      [this.props.className]: this.props.className
    });
    const compareCountryClass = classnames('-gray', {
      '-disabled': !this.props.countriesCompare[0]
    });

    return (
      <div className={stickyFilterClass}>
        {this.props.withScope &&
          <div className="filters-lead">
            <div className="row expanded collapse">
              <div className="small-12 column">
                <SegmentedUi
                  className="-tabs"
                  items={SCOPE_OPTIONS}
                  selected={this.props.filters.scope}
                  onChange={selected => this.updateFilters(selected.value, 'scope')}
                />
              </div>
            </div>
          </div>
        }
        {/* COMPARE COUNTRY SELECTORS */}
        {this.props.filters.scope === 'country' &&
          this.props.countriesCompare.length > 0 &&
            <div className="country-filters">
              <div className="small-6 columns">
                <div className="compare-country-wrapper">
                  <span className="compare-filters-text">Select a country</span>
                  <CountrySelect
                    className="-gray"
                    value={this.props.countriesCompare[0] || null}
                    onValueChange={(selected) => {
                      selected && this.props.setCompareCountry({ index: 0, iso: selected.value });
                    }}
                  />
                </div>
              </div>
              <div className="small-6 columns">
                <div className="compare-country-wrapper">
                  <span className="compare-filters-text">Compare with</span>
                  <CountrySelect
                    className={compareCountryClass}
                    placeholder="Country name..."
                    value={this.props.countriesCompare[1] || null}
                    onValueChange={(selected) => {
                      selected && this.props.setCompareCountry({ index: 1, iso: selected.value });
                    }}
                  />
                </div>
              </div>
            </div>
        }
        <div className="global-filters">
          <div>
            <span className="title">Crops</span>
            <CustomSelect
              search
              className="-gray"
              options={CROP_OPTIONS}
              value={this.props.filters.crop}
              onValueChange={selected => selected && this.updateFilters(selected.value, 'crop')}
            />
          </div>
          <div>
            <span className="title">Water Risk</span>
            <CustomSelect
              className="-gray"
              options={WATER_OPTIONS}
              value={this.props.filters.indicator}
              onValueChange={selected => selected && this.updateFilters(selected.value, 'indicator')}
            />
          </div>
          <div>
            <span className="title">Food security</span>
            <CustomSelect
              className="-gray"
              options={FOOD_OPTIONS}
              value={this.props.filters.food}
              onValueChange={selected => selected && this.updateFilters(selected.value, 'food')}
            />
          </div>
          <div>
            <span className="title">Timeframe</span>
            <CustomSelect
              className="-gray"
              options={YEAR_OPTIONS}
              value={YEAR_OPTIONS.find(i => i.value === this.props.filters.year).value}
              onValueChange={(selected) => {
                selected && selected.value === 'baseline' && this.updateFilters(
                  'absolute', 'type');
                selected && this.updateFilters(selected.value, 'year');
              }}
            />
            {this.props.filters.period_value !== 'baseline' &&
              <CustomSelect
                className="-gray"
                options={DATA_TYPE_OPTIONS.map(option => Object.assign({}, option, { value: option.value }))}
                value={this.props.filters.type}
                onValueChange={selected => this.updateFilters(selected.value, 'change_from_baseline')}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

StickyFilters.propTypes = {
  className: PropTypes.string,
  countriesCompare: PropTypes.array,
  setCompareCountry: PropTypes.func,
  setFilters: PropTypes.func,
  filters: PropTypes.object,
  withScope: PropTypes.bool
};

StickyFilters.defaultProps = {
  countriesCompare: []
};

export default StickyFilters;
