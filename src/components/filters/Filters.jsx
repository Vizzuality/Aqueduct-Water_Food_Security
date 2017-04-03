import React from 'react';


// Components
import InfoModal from 'components/modal/InfoModal';
import AppDefinitions from 'data/app-definitions.json';
import {
  CheckboxGroup,
  SegmentedUi,
  Accordion,
  Icon,
  Timeline,
  RadioGroup,
  CustomSelect
} from 'aqueduct-components';
import { browserHistory } from 'react-router';

// Filter options
import {
  waterOptions,
  foodOptions,
  scopeOptions,
  yearOptions,
  cropOptions,
  irrigationOptions,
  dataTypeOptions
} from 'constants/filters';

import CountrySelect from 'containers/countries/CountrySelect';

export default class Filters extends React.Component {

  constructor(props) {
    super(props);

    // State
    this.state = {};

    // Bindings
    this.updateFilters = this.updateFilters.bind(this);
  }

  updateFilters(value, field) {
    const newFilter = {
      [field]: value
    };

    this.props.setFilters(newFilter);
  }

  openModal(slug) {
    this.props.toggleModal(true, {
      children: InfoModal,
      childrenProps: {
        info: AppDefinitions[slug]
      }
    });
  }

  onSelectCountryToCompare(selected) {
    const countriesParam = `countries=${this.props.filters.country},${selected.value}`;
    browserHistory.push(`/compare?${countriesParam}`);
  }

  render() {
    cropOptions.sort((c1, c2) => {
      return c1.label > c2.label ? 1 : -1;
    });
    const timeline = (
      <div className="filter-item">
        {/* Year */}
        <div className="c-select">
          <div className="select-header">
            <span className="title">Timeframe</span>
            <button
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
            selected={yearOptions.find(i => i.value === this.props.filters.year)}
            onChange={(selected) => {
              selected && selected.value === 'baseline' && this.updateFilters('absolute', 'type');
              selected && this.updateFilters(selected.value, 'year');
            }}
          />
          {this.props.filters.year !== 'baseline' &&
            <RadioGroup
              className="-filters"
              items={dataTypeOptions}
              name="type"
              defaultValue={this.props.filters.type}
              onChange={selected => this.updateFilters(selected.value, 'type')}
            />
          }
        </div>
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
                  items={scopeOptions}
                  selected={this.props.filters.scope}
                  onChange={selected => this.updateFilters(selected.value, 'scope')}
                />
              </div>
            </div>
          </div>
        }
        <Accordion className="-filters" opened contentPosition="top" toggleIcon={<Icon name="icon-arrow-up-2" className="filters-collapse-btn" />}>
          <div>
            {this.props.withScope && this.props.filters.scope === 'country' &&
              <div className="filters-section -highlighted">
                <div className="row expanded collapse filters-group -commodities">
                  <div className="small-12 medium-4 columns">
                    <div className="filter-item">
                      {/* Country */}
                      <span className="title">Select a Country</span>
                      <CountrySelect
                        value={this.props.filters.country !== 'null' ? this.props.filters.country : null}
                        onValueChange={selected => this.updateFilters(selected && selected.value, 'country')}
                      />
                    </div>
                  </div>
                  <div className="small-12 medium-4 columns">
                    <div className="filter-item">
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
              <div className="row expanded collapse filters-group">
                <div className={columnClassName}>
                  {/* Crops */}
                  <div className="filter-item">
                    <div className="c-select">
                      <div className="select-header">
                        <span className="title">Crops</span>
                        <button
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
                        options={cropOptions}
                        value={this.props.filters.crop}
                        onValueChange={selected => selected && this.updateFilters(selected.value, 'crop')}
                      />
                    </div>
                    <CheckboxGroup
                      items={irrigationOptions}
                      onChange={selected => this.updateFilters(selected, 'irrigation')}
                      selected={this.props.filters.irrigation}
                      className="-inline"
                    />
                  </div>
                </div>
                <div className={columnClassName}>
                  {/* Water */}
                  <div className="filter-item">
                    <div className="c-select">
                      <div className="select-header">
                        <span className="title">Water Risk</span>
                        <button
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
                        value={this.props.filters.indicator}
                        onValueChange={selected => selected && this.updateFilters(selected.value, 'indicator')}
                      />
                    </div>
                  </div>
                </div>
                <div className={columnClassName}>
                  {/* Food */}
                  <div className="filter-item">
                    <div className="c-select">
                      <div className="select-header">
                        <span className="title">Food security</span>
                        <button
                          className="icon-container"
                          onClick={() => this.openModal('country-data')}
                        >
                          <Icon
                            name="icon-question"
                            className="title-icon"
                          />
                        </button>
                      </div>
                      <CustomSelect
                        options={foodOptions}
                        value={this.props.filters.food}
                        onValueChange={selected => selected && this.updateFilters(selected.value, 'food')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="filters-section -mobile-spacing">
              <div className="row expanded collapse filters-group">
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
  className: React.PropTypes.string,
  toggleModal: React.PropTypes.func
};
