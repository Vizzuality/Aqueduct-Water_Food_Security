import React from 'react';
import { dispatch } from 'main';
import { browserHistory } from 'react-router';

// Components
import {
  APP_DEFINITIONS,
  CROP_OPTIONS,
  IRRIGATION_OPTIONS,
  DATA_TYPE_OPTIONS,
  YEAR_OPTIONS,
  CheckboxGroup,
  SegmentedUi,
  Accordion,
  Icon,
  Timeline,
  RadioGroup,
  CustomSelect,
  InfoModal,
  toggleModal
} from 'aqueduct-components';

// Filter options
import {
  WATER_OPTIONS,
  FOOD_OPTIONS,
  SCOPE_OPTIONS
} from 'constants/filters';

import CountrySelect from 'containers/countries/CountrySelect';

export default class Filters extends React.Component {
  static openModal(slug) {
    dispatch(toggleModal(true, {
      children: InfoModal,
      childrenProps: {
        info: APP_DEFINITIONS[slug]
      }
    }));
  }

  constructor(props) {
    super(props);

    // State
    this.state = {};

    // Bindings
    this.updateFilters = this.updateFilters.bind(this);
  }

  onSelectCountryToCompare(selected) {
    const countriesParam = `countries=${this.props.filters.country},${selected.value}`;
    browserHistory.push(`/compare?${countriesParam}`);
  }

  updateFilters(value, field) {
    const newFilter = {
      [field]: value
    };

    this.props.setFilters(newFilter);
  }

  render() {
    const timeline = (
      <div className="c-filters-item">
        {/* Year */}
        <div className="filter-item-header">
          <span className="title">Timeframe</span>
          <button
            className="icon-container"
            onClick={() => Filters.openModal('timeframe')}
          >
            <Icon
              name="icon-question"
              className="title-icon"
            />
          </button>
        </div>

        <Timeline
          items={YEAR_OPTIONS}
          selected={YEAR_OPTIONS.find(i => i.value === this.props.filters.year)}
          onChange={(selected) => {
            selected && selected.value === 'baseline' && this.updateFilters('absolute', 'type');
            selected && this.updateFilters(selected.value, 'year');
          }}
        />

        {this.props.filters.year !== 'baseline' &&
          <RadioGroup
            className="-filters -inline"
            items={DATA_TYPE_OPTIONS}
            name="type"
            defaultValue={this.props.filters.type}
            onChange={selected => this.updateFilters(selected.value, 'type')}
          />
        }
      </div>
    );

    const columnClassName = 'small-12 medium-4 columns';

    return (
      <div className={`c-filters ${this.props.className ? this.props.className : ''}`}>
        {/* Scope */}
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
        <Accordion
          className="-filters"
          opened
          contentPosition="top"
          toggleIcon={
            <Icon
              name="icon-arrow-up-2"
              className="filters-collapse-btn"
            />
          }
        >
          <div>
            {this.props.withScope && this.props.filters.scope === 'country' &&
              <div className="filters-section -separator">
                <div className="row expanded collapse align-justify align-bottom">
                  <div className="small-12 medium-4 columns">
                    <div className="c-filters-item">
                      {/* Country */}
                      <div className="filter-item-header">
                        <span className="title">Select a Country</span>
                      </div>
                      <CountrySelect
                        value={this.props.filters.country !== 'null' ? this.props.filters.country : null}
                        onValueChange={selected => this.updateFilters(selected && selected.value, 'country')}
                      />
                    </div>
                  </div>
                  <div className="small-12 medium-4 columns">
                    <div className="c-filters-item">
                      {/* Country to compare with */}
                      <CountrySelect
                        className={this.props.filters.country ? '-country-compare' : '-disabled'}
                        placeholder="Compare with..."
                        onValueChange={selected => this.onSelectCountryToCompare(selected)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            }
            <div className="filters-section">
              <div className="row expanded collapse">
                <div className={columnClassName}>
                  {/* Crops */}
                  <div className="c-filters-item">
                    <div className="filter-item-header">
                      <span className="title">Crops</span>
                      <button
                        className="icon-container"
                        onClick={() => Filters.openModal('crops')}
                      >
                        <Icon
                          name="icon-question"
                          className="title-icon"
                        />
                      </button>
                    </div>

                    <CustomSelect
                      search
                      options={CROP_OPTIONS.sort((c1, c2) => {
                        return c1.label > c2.label ? 1 : -1;
                      })}
                      value={this.props.filters.crop}
                      onValueChange={selected => selected && this.updateFilters(selected.value, 'crop')}
                    />

                    <CheckboxGroup
                      items={IRRIGATION_OPTIONS}
                      onChange={selected => this.updateFilters(selected, 'irrigation')}
                      selected={this.props.filters.irrigation}
                      className="-inline"
                    />
                  </div>
                </div>

                <div className={columnClassName}>
                  {/* Water */}
                  <div className="c-filters-item">
                    <div className="filter-item-header">
                      <span className="title">Water Risk</span>
                      <button
                        className="icon-container"
                        onClick={() => Filters.openModal('water-risk')}
                      >
                        <Icon
                          name="icon-question"
                          className="title-icon"
                        />
                      </button>
                    </div>

                    <CustomSelect
                      options={WATER_OPTIONS}
                      value={this.props.filters.indicator}
                      onValueChange={selected => selected && this.updateFilters(selected.value, 'indicator')}
                    />
                  </div>
                </div>
                <div className={columnClassName}>
                  {/* Food */}
                  <div className="c-filters-item">
                    <div className="filter-item-header">
                      <span className="title">Food security</span>
                      <button
                        className="icon-container"
                        onClick={() => Filters.openModal('food-security')}
                      >
                        <Icon
                          name="icon-question"
                          className="title-icon"
                        />
                      </button>
                    </div>

                    <CustomSelect
                      options={FOOD_OPTIONS}
                      value={this.props.filters.food}
                      onValueChange={selected => selected && this.updateFilters(selected.value, 'food')}
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
  setFilters: React.PropTypes.func,
  filters: React.PropTypes.object,
  withScope: React.PropTypes.bool,
  className: React.PropTypes.string
};
