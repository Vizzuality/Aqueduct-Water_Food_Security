import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  SegmentedUi,
  CustomSelect
} from 'aqueduct-components';
import CountrySelect from 'components/country-select';

// constants
import {
  SCOPE_OPTIONS,
  FOOD_OPTIONS,
  YEAR_OPTIONS,
  DATA_TYPE_OPTIONS
} from 'constants/filters';
import { CROP_OPTIONS } from 'constants/crops';

// utils
import { logEvent } from 'utils/analytics';

class StickyFilters extends PureComponent {
  updateFilters(value, field) {
    const { setFilters } = this.props;
    const newFilter = { [field]: value };

    setFilters(newFilter);
  }

  handleWaterRiskIndicator(selected) {
    const {
      filters: { food },
      waterOptions
    } = this.props;

    if (selected) this.updateFilters(selected.value, 'indicator');

    if (
      selected
      && (
        (selected.value !== 'none' && !waterOptions.find(w => w.value === selected.value).timeline)
        || (selected.value === 'none' && !FOOD_OPTIONS.find(w => w.value === food).timeline)
      )
    ) {
      this.updateFilters('absolute', 'type');
    }
  }

  render() {
    const {
      className,
      countriesCompare,
      waterOptions,
      isTimeFrameDisabled,
      filters,
      withScope,
      setCompareCountry
    } = this.props;
    const stickyFilterClass = classnames('c-sticky-filters', { [className]: className });
    const compareCountryClass = classnames('-gray', { '-disabled': !countriesCompare[0] });

    return (
      <div className={stickyFilterClass}>
        {withScope
          && (
            <div className="filters-lead">
              <div className="row expanded collapse">
                <div className="small-12 column">
                  <SegmentedUi
                    className="-tabs"
                    items={SCOPE_OPTIONS}
                    selected={filters.scope}
                    onChange={selected => this.updateFilters(selected.value, 'scope')}
                  />
                </div>
              </div>
            </div>
          )
        }
        {/* COMPARE COUNTRY SELECTORS */}
        {filters.scope === 'country'
          && countriesCompare.length > 0
            && (
              <div className="country-filters">
                <div className="small-6 columns">
                  <div className="compare-country-wrapper">
                    <span className="compare-filters-text">Select a country</span>
                    <CountrySelect
                      className="-gray"
                      value={countriesCompare[0] || null}
                      onValueChange={(selected) => {
                        if (selected) {
                          setCompareCountry({ index: 0, iso: selected.value });
                          logEvent('[AQ-Food] Compare', 'user sets left country', selected.label);
                        }
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
                      value={countriesCompare[1] || null}
                      onValueChange={(selected) => {
                        if (selected) {
                          setCompareCountry({ index: 1, iso: selected.value });
                          logEvent('[AQ-Food] Compare', 'user sets right country', selected.label);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )
        }
        <div className="global-filters">
          <div>
            <span className="title">Crops</span>
            <CustomSelect
              search
              className="-gray"
              options={CROP_OPTIONS}
              value={filters.crop}
              onValueChange={(selected) => {
                if (selected) {
                  this.updateFilters(selected.value, 'crop');
                  logEvent('[AQ-Food] Map', 'select crop', selected.label);
                }
              }}
            />
          </div>
          <div title="This filter is temporarily unavailable.">
            <span className="title">Water Risk</span>
            <CustomSelect
              className="-gray"
              options={waterOptions}
              value={filters.indicator}
              onValueChange={(selected) => {
                this.handleWaterRiskIndicator(selected);
                if (selected.value) logEvent('[AQ-Food] Map', 'select water risk indicator', selected.label);
              }}
            />
          </div>
          <div>
            <span className="title">Food Security</span>
            <CustomSelect
              className="-gray"
              options={FOOD_OPTIONS}
              value={filters.food}
              onValueChange={(selected) => {
                if (selected) {
                  this.updateFilters(selected.value, 'food');
                  logEvent('[AQ-Food] Map', 'select food security', selected.label);
                }

                if (
                  selected
                  && filters.indicator === 'none'
                  && !FOOD_OPTIONS.find(w => w.value === selected.value).timeline
                ) {
                  this.updateFilters('absolute', 'type');
                  this.updateFilters('baseline', 'year');
                }
              }}
            />
          </div>
          <div>
            <span className="title">Timeframe</span>
            <CustomSelect
              className="-gray"
              options={YEAR_OPTIONS}
              value={YEAR_OPTIONS.find(i => i.value === filters.year).value}
              disabled={isTimeFrameDisabled}
              onValueChange={(selected) => {
                if (selected && selected.value === 'baseline') this.updateFilters('absolute', 'type');
                if (selected) {
                  this.updateFilters(selected.value, 'year');
                  logEvent('[AQ-Food] Map', 'select timeframe', selected.label);
                }
              }}
            />
            {filters.period_value !== 'baseline'
              && (
                <CustomSelect
                  className="-gray"
                  options={DATA_TYPE_OPTIONS}
                  value={filters.type}
                  onValueChange={(selected) => {
                    this.updateFilters(selected.value, 'change_from_baseline');
                    logEvent('[AQ-Food] Map', 'select timeframe', selected.label);
                  }}
                />
              )}
          </div>
        </div>
      </div>
    );
  }
}

StickyFilters.propTypes = {
  className: PropTypes.string,
  withScope: PropTypes.bool,
  isTimeFrameDisabled: PropTypes.bool.isRequired,
  countriesCompare: PropTypes.array,
  waterOptions: PropTypes.array.isRequired,
  setCompareCountry: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

StickyFilters.defaultProps = {
  className: null,
  countriesCompare: [],
  withScope: false
};

export default StickyFilters;
