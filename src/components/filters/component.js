import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  APP_DEFINITIONS,
  IRRIGATION_OPTIONS,
  SegmentedUi,
  Accordion,
  Icon,
  Timeline,
  RadioGroup,
  CustomSelect,
  InfoModal
} from 'aqueduct-components';

// components
import CountrySelect from 'components/country-select';

// constants
import {
  FOOD_OPTIONS,
  SCOPE_OPTIONS,
  DATA_TYPE_OPTIONS,
} from 'constants/filters';
import { CROP_OPTIONS } from 'constants/crops';
import {
  EQUIVALENCE_WATER_INDICATORS,
  DEFAULT_BASELINE_WATER_INDICATOR,
  DEFAULT_PROJECTED_WATER_INDICATOR,
  EQUIVALENCE_WATER_INDICATORS_PROJECTED
} from 'constants/water-indicators';

class Filters extends PureComponent {
  constructor(props) {
    super(props);

    // State
    this.state = {};

    // Bindings
    this.updateFilters = this.updateFilters.bind(this);
  }

  onSelectCountryToCompare(selected) {
    const {
      filters: { country },
      router
    } = this.props;
    const countriesParam = `countries=${country},${selected.value}`;

    router.push(`/compare?countries=${country},${selected.value}`);
  }

  openModal(slug) {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children: InfoModal,
      childrenProps: {
        info: APP_DEFINITIONS[slug]
      }
    });
  }

  handleWaterRiskIndicator(selected) {
    const {
      filters: { food },
      waterOptions
    } = this.props;

    if (selected) {
      this.updateFilters(selected.value, 'indicator');
      if (selected.value === 'none') this.updateFilters('baseline', 'year');
    }

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

  handleTimeframe(selected) {
    const {
      filters: {
        indicator,
        year: currentYear
      }
    } = this.props;

    if (selected && selected.value === 'baseline') this.updateFilters('absolute', 'type');
    if (selected) {
      const { value } = selected;
      this.updateFilters(value, 'year');

      if (currentYear === 'baseline' && value !== 'baseline') {
        if (EQUIVALENCE_WATER_INDICATORS[indicator]) {
          this.updateFilters(EQUIVALENCE_WATER_INDICATORS[indicator], 'indicator');
        } else {
          this.updateFilters(DEFAULT_PROJECTED_WATER_INDICATOR, 'indicator');
        }
      }
      if (currentYear !== 'baseline' && value === 'baseline') {
        if (EQUIVALENCE_WATER_INDICATORS[indicator]) {
          this.updateFilters(EQUIVALENCE_WATER_INDICATORS[indicator], 'indicator');
        } else {
          this.updateFilters(DEFAULT_BASELINE_WATER_INDICATOR, 'indicator');
        }
      }
    }
  }

  updateFilters(value, field) {
    const { setFilters } = this.props;
    const newFilter = {
      [field]: value,
      ...(field === 'scope' && value === 'global') && {
        iso: null,
        country: null,
        countryName: null
      }
    };

    setFilters(newFilter);
  }

  handleType(type) {
    const { filters: { indicator } } = this.props;
    this.updateFilters(type, 'type');

    if (EQUIVALENCE_WATER_INDICATORS_PROJECTED[indicator]) this.updateFilters(EQUIVALENCE_WATER_INDICATORS_PROJECTED[indicator], 'indicator');
  }

  render() {
    const {
      waterOptions,
      yearOptions,
      filters,
      className,
      withScope
    } = this.props;
    const disablesTimeline = !filters.indicator || filters.indicator === 'none';
    const componentClass = classnames('c-filters', { [className]: !!className });
    const timeline = (
      <div className="c-filters-item">
        {/* Year */}
        <div className="filter-item-header">
          <span className="title">Timeframe</span>
          <button
            type="button"
            className="icon-container"
            onClick={() => this.openModal('timeframe')}
          >
            <Icon
              name="icon-question"
              className="title-icon"
            />
          </button>
        </div>

        <Timeline
          items={yearOptions}
          selected={yearOptions.find(i => i.value === filters.year)}
          disabled={disablesTimeline}
          onChange={(selected) => { this.handleTimeframe(selected); }}
        />

        {filters.year !== 'baseline'
          && (
            <RadioGroup
              className="-filters -inline"
              items={DATA_TYPE_OPTIONS}
              name="type"
              selected={filters.type}
              onChange={({ value }) => { this.handleType(value); }}
            />
          )}
      </div>
    );

    return (
      <div className={componentClass}>
        <a
          href="/"
          style={{
            color: '#FFF',
            position: 'absolute',
            right: 20,
            bottom: 19
          }}
        >
          Reset filters
        </a>

        {/* Scope */}
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
          )}
        <Accordion
          className="-filters"
          opened
          contentPosition="top"
          toggleIcon={(
            <Icon
              name="icon-arrow-up-2"
              className="filters-collapse-btn"
            />
          )}
        >
          <div>
            {withScope && filters.scope === 'country'
              && (
                <div className="filters-section -separator">
                  <div className="row expanded collapse align-justify align-bottom">
                    <div className="small-12 medium-4 columns">
                      <div className="c-filters-item">
                        {/* Country */}
                        <div className="filter-item-header">
                          <span className="title">Select a Country</span>
                        </div>
                        <CountrySelect
                          value={filters.country !== 'null' ? filters.country : null}
                          onValueChange={(selected) => {
                            this.updateFilters(selected && selected.value, 'country');
                            this.updateFilters(selected && selected.label, 'countryName');
                            this.updateFilters(selected && selected.value, 'iso');
                          }}
                        />
                      </div>
                    </div>
                    <div className="small-12 medium-4 columns">
                      <div className="c-filters-item">
                        {/* Country to compare with */}
                        <CountrySelect
                          className={filters.country ? '-country-compare' : '-disabled'}
                          placeholder="Compare with..."
                          onValueChange={selected => this.onSelectCountryToCompare(selected)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            <div className="filters-section">
              <div className="row expanded collapse">
                <div className="small-12 medium-4 columns">
                  {/* Crops */}
                  <div className="c-filters-item">
                    <div className="filter-item-header">
                      <span className="title">Crops</span>
                      <button
                        type="button"
                        className="icon-container"
                        onClick={() => this.openModal('crops')}
                      >
                        <Icon
                          name="icon-question"
                          className="title-icon"
                        />
                      </button>
                    </div>

                    <CustomSelect
                      search
                      options={CROP_OPTIONS.sort((c1, c2) => c1.label > c2.label ? 1 : -1)}
                      value={filters.crop}
                      onValueChange={selected => selected && this.updateFilters(selected.value, 'crop')}
                    />

                    <RadioGroup
                      name="irrigation"
                      items={IRRIGATION_OPTIONS}
                      onChange={selected => this.updateFilters(selected.value, 'irrigation')}
                      selected={filters.irrigation}
                      className="-inline"
                    />
                  </div>
                </div>

                <div className="small-12 medium-4 columns">
                  {/* Water */}
                  <div className="c-filters-item">
                    <div className="filter-item-header">
                      <span className="title">Water Risk</span>
                      <button
                        type="button"
                        className="icon-container"
                        onClick={() => this.openModal('water-risk')}
                      >
                        <Icon
                          name="icon-question"
                          className="title-icon"
                        />
                      </button>
                    </div>

                    <CustomSelect
                      options={waterOptions}
                      value={filters.indicator}
                      onValueChange={(selected) => { this.handleWaterRiskIndicator(selected); }}
                    />
                  </div>
                </div>
                <div className="small-12 medium-4 columns">
                  {/* Food */}
                  <div className="c-filters-item">
                    <div className="filter-item-header">
                      <span className="title">Food Security</span>
                      <button
                        type="button"
                        className="icon-container"
                        onClick={() => this.openModal('food-security')}
                      >
                        <Icon
                          name="icon-question"
                          className="title-icon"
                        />
                      </button>
                    </div>

                    <CustomSelect
                      options={FOOD_OPTIONS}
                      value={filters.food}
                      onValueChange={(selected) => {
                        if (selected) this.updateFilters(selected.value, 'food');

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
                </div>
              </div>
            </div>
            <div className="filters-section">
              <div className="row expanded collapse">
                <div className="small-12 columns">
                  {timeline}
                </div>
              </div>
            </div>
          </div>
        </Accordion>
      </div>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  withScope: PropTypes.bool,
  className: PropTypes.string,
  waterOptions: PropTypes.array.isRequired,
  yearOptions: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

Filters.defaultProps = {
  withScope: false,
  className: null
};

export default Filters;
