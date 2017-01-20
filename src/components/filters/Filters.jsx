import React from 'react';
// Components
import CheckboxGroup from 'components/ui/CheckboxGroup';
import SegmentedUi from 'components/ui/SegmentedUi';
import Accordion from 'components/ui/Accordion';
import CountrySelect from 'containers/countries/CountrySelect';
import Icon from 'components/ui/Icon';
import Timeline from 'components/ui/Timeline';
import { SimpleSelect } from 'react-selectize';
import { Link } from 'react-router';
// Options
import { waterOptions, foodOptions, scopeOptions, yearOptions, cropOptions, irrigationOptions } from 'constants/filters';

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
    const timeline = (
      <div className="filter-item">
        {/* Year */}
        <div className="c-select">
          <span className="title">Timeframe <Icon name="icon-question" className="title-icon" /></span>
          <Timeline
            items={yearOptions}
            selected={yearOptions.find(i => i.value === this.props.filters.year)}
            onChange={selected => selected && this.updateFilters(selected.value, 'year')}
          />
        </div>
      </div>
    );

    const columnClassName = this.props.compare ? 'small-2 columns' : 'small-4 columns';

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
                <div className="row expanded collapse filters-group">
                  <div className="small-4 columns">
                    <div className="filter-item">
                      {/* Country */}
                      <CountrySelect
                        onValueChange={selected => this.updateFilters(selected && selected.value, 'country')}
                        defaultValue={this.props.filters.country !== 'null' ? this.props.filters.country : null}
                      />
                    </div>
                  </div>
                  <div className="small-8 columns">
                    <div className="filter-item">
                      {/* Compare */}
                      <Link className="filters-btn" to={this.props.filters.country ? `/compare?countries=${this.props.filters.country}` : '/compare'}>
                        Compare country
                      </Link>
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
                      <span className="title">Crops <Icon name="icon-question" className="title-icon" /></span>
                      <SimpleSelect
                        hideResetButton
                        options={cropOptions}
                        defaultValue={cropOptions.find(i => i.value === this.props.filters.crop)}
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
                      <span className="title">Water Risk <Icon name="icon-question" className="title-icon" /></span>
                      <SimpleSelect
                        hideResetButton
                        options={waterOptions}
                        defaultValue={waterOptions.find(i => i.value === this.props.filters.water)}
                        onValueChange={selected => selected && this.updateFilters(selected.value, 'water')}
                      />
                    </div>
                  </div>
                </div>
                <div className={columnClassName}>
                  {/* Food */}
                  <div className="filter-item">
                    <div className="c-select">
                      <span className="title">Country Data <Icon name="icon-question" className="title-icon" /></span>
                      <SimpleSelect
                        hideResetButton
                        options={foodOptions}
                        defaultValue={foodOptions.find(i => i.value === this.props.filters.food)}
                        onValueChange={selected => selected && this.updateFilters(selected.value, 'food')}
                        className={this.props.filters.scope === 'country' ? '-disabled' : ''}
                      />
                    </div>
                  </div>
                </div>
                {this.props.compare &&
                  <div className="small-6 columns">
                    {timeline}
                  </div>
                }
              </div>
            </div>
            {this.props.compare ||
              <div className="filters-section">
                <div className="row expanded collapse filters-group">
                  <div className="small-12 columns">
                    {timeline}
                  </div>
                </div>
              </div>
            }
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
  compare: React.PropTypes.bool
};
