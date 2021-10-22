import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  IRRIGATION_OPTIONS,
  SegmentedUi,
  Accordion,
  Icon,
  Timeline,
  RadioGroup,
  CustomSelect,
  InfoModal,
  ThresholdSlider
} from 'aqueduct-components';

// components
import CountrySelect from 'components/country-select';
import TooltipIcon from 'components/ui/TooltipIcon';

// constants
import { APP_DEFINITIONS } from 'constants/definitions';
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
  EQUIVALENCE_WATER_INDICATORS_PROJECTED,
  ID_LOOKUP,
  WATER_INDICATORS,
  ALLOWED_WATER_INDICATOR_KEYS_BY_SCOPE
} from 'constants/water-indicators';

// utils
import { logEvent } from 'utils/analytics';

class Filters extends PureComponent {
  constructor(props) {
    super(props);

    // State
    this.state = {
      threshold: 0
    };

    // Bindings
    this.updateFilters = this.updateFilters.bind(this);
  }

  getIndicatorKey(indicator) {
    const {
      filters
    } = this.props

    const indicatorKey = ID_LOOKUP[indicator || filters.indicator]
    if (!(ALLOWED_WATER_INDICATOR_KEYS_BY_SCOPE[filters.scope] || []).includes(indicatorKey)) return undefined

    return indicatorKey
  }

  getIndicator(indicator) {
    const indicatorKey = this.getIndicatorKey(indicator)
    return indicatorKey ? WATER_INDICATORS[indicatorKey] : undefined
  }

  onSelectCountryToCompare(selected) {
    const {
      filters: { country },
      router
    } = this.props;

    router.push(`/compare?countries=${country},${selected.value}`);
  }

  openModal(slug) {
    const { toggleModal } = this.props;
    const { props, ...info } = APP_DEFINITIONS[slug] || {}

    toggleModal(true, {
      children: InfoModal,
      childrenProps: {
        info,
        ...props
      }
    });
  }

  handleWaterRiskIndicator(selected) {
    const {
      filters: { food },
      waterOptions
    } = this.props;
    const indicator = this.getIndicator(selected.value)

    if (selected && indicator) {
      this.updateFilters(selected.value, 'indicator');
      this.updateFilters(indicator.defaultValue, 'threshold');
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
      withScope,
      setLayerParametrization,
      resetFilters
    } = this.props;
    const disablesTimeline = !filters.indicator || filters.indicator === 'none';
    const componentClass = classnames('c-filters', { [className]: !!className });
    const indicator = this.getIndicator()

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
          onChange={(selected) => {
            this.handleTimeframe(selected);
            logEvent('[AQ-Food] Map', 'select timeframe', selected.label);
          }}
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

    const waterRiskIndicatorSelect = (
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
          value={this.getIndicatorKey() ? filters.indicator : 'none'}
          onValueChange={(selected) => {
            this.handleWaterRiskIndicator(selected);
            setLayerParametrization({ opacity: 1 });
            if (selected.value) logEvent('[AQ-Food] Map', 'select water risk indicator', selected.label);
          }}
        />
      </div>
    )

    return (
      <div className={componentClass}>
        <button
          type="button"
          style={{
            color: '#FFF',
            position: 'absolute',
            right: 20,
            bottom: 19
          }}
          onClick={() => { resetFilters(); }}
        >
          Reset filters
        </button>

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
          {/* UNCOMMENT IF WE WANT HEADER */}
          {/* {withScope && filters.scope === 'supply_chain' && (
            <div className="filters-section">
              <h2>Supply Chain</h2>
              <p>
                Highlight basins exceeding desired condition threshold{' '}
                <button
                  type="button"
                  className="icon-container"
                  onClick={() => this.openModal('desired-condition-thresholds')}
                >
                  <Icon
                    name="icon-question"
                    className="-info -primary"
                  />
                </button>
              </p>
            </div>
          )} */}
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
                            logEvent('[AQ-Food] Map', 'select country', selected.label);
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
                          onValueChange={(selected) => {
                            this.onSelectCountryToCompare(selected);

                            if (selected) logEvent('[AQ-Food] Map', 'select country to compare', selected.label);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            <div className="filters-section">
              <div className="row expanded collapse">
                <div className={classnames("small-12", "columns", "medium-4")}>
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
                      onValueChange={(selected) => {
                        if (selected) {
                          this.updateFilters(selected.value, 'crop');
                          logEvent('[AQ-Food] Map', 'select crop', selected.label);
                        }
                      }}
                    />

                    <RadioGroup
                      name="irrigation"
                      items={IRRIGATION_OPTIONS}
                      onChange={(selected) => {
                        this.updateFilters(selected.value, 'irrigation');
                        if (selected.value) logEvent('[AQ-Food] Map', 'select irrigation', selected.label);
                      }}
                      selected={filters.irrigation}
                      className="-inline"
                    />
                  </div>
                </div>

                {filters.scope !== 'supply_chain' && (
                  <React.Fragment>
                    <div className="small-12 medium-4 columns">
                      {/* Water */}
                      {waterRiskIndicatorSelect}
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
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
            {filters.scope === 'supply_chain' && (
              <div className="filters-section" style={{ paddingRight: 24 }}>
                <div className="row expanded collapse">
                  <div className="small-12 medium-4 columns">
                    {waterRiskIndicatorSelect}
                  </div>
                </div>
              </div>
            )}
            {filters.scope === 'supply_chain' && indicator && (
              <div className="filters-section">
                <div className="c-filters-item">
                  <div className="filter-item-header" style={{ marginBottom: 60 }}>
                    <div className="title">
                      <div>
                        <p>
                          <strong>{indicator.name} Desired Condition </strong>{' '}
                          <TooltipIcon handleClick={() => this.openModal('desired-condition-thresholds')} />
                          {/* <span className="title-icon">
                            <Icon name="icon-question" handleClick={() => this.openModal('desired-condition-thresholds')} />
                          </span> */}
                        </p>
                        <p style={{ fontSize: 16 }}>(Adjust slider to set a desired condition threshold)</p>
                      </div>
                    </div>
                  </div>
                  <ThresholdSlider
                    threshold={parseFloat(filters.threshold) || 0}
                    onChange={threshold => this.updateFilters(threshold, 'threshold')}
                    values={indicator.rangeValues}
                    defaultValue={indicator.defaultValue}
                    unit={indicator.unit}
                    ranges={indicator.items}
                  />
                </div>
              </div>
              // <div className="filters-section" style={{ paddingRight: 24 }}>
              //   <div className="row expanded collapse">
              //     <div
              //       className="small-12 medium-12 columns"
              //       style={{
              //         marginBottom: 48,
              //         display: 'flex',
              //         alignItems: 'start',
              //       }}
              //     >
              //       <div>
              //         <h4>
              //           {indicator.name} Desired Condition
              //         </h4>
              //         <p>(Adjust slider to set a desired condition threshold)</p>
              //       </div>
              //       <button
              //         style={{ marginLeft: 8 }}
              //         type="button"
              //         className="icon-container"
              //         onClick={() => this.openModal('desired-condition-thresholds')}
              //       >
              //         <Icon
              //           name="icon-question"
              //           className="-info -primary"
              //         />
              //       </button>
              //     </div>
              //     <div className="small-12 medium-12 columns">
              //       <ThresholdSlider
              //         threshold={parseFloat(filters.threshold) || 0}
              //         onChange={threshold => this.updateFilters(threshold, 'threshold')}
              //         values={indicator.rangeValues}
              //         defaultValue={indicator.defaultValue}
              //         unit={indicator.unit}
              //         ranges={indicator.items}
              //       />
              //     </div>
              //   </div>
              // </div>
            )}
            {filters.scope !== 'supply_chain' && (
              <div className="filters-section">
                <div className="row expanded collapse">
                  <div className="small-12 columns">
                    {timeline}
                  </div>
                </div>
              </div>
            )}
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
  toggleModal: PropTypes.func.isRequired,
  setLayerParametrization: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired
};

Filters.defaultProps = {
  withScope: false,
  className: null
};

export default Filters;
