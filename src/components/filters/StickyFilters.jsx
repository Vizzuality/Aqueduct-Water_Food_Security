import React from 'react';
import { Link } from 'react-router';
import { SegmentedUi, Icon, CustomSelect } from 'aqueduct-components';
import { scopeOptions, cropOptions, waterOptions, foodOptions, yearOptions, dataTypeOptions } from 'constants/filters';
import ShareModal from 'containers/modal/ShareModal';
import CountrySelect from 'containers/countries/CountrySelect';

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

  toggleShareModal() {
    this.props.toggleModal(true, {
      children: ShareModal
    });
  }

  render() {
    return (
      <div className="c-sticky-filters">
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
                <button type="button" className="-white -with-icon btn-share" onClick={this.toggleShareModal}>
                  <Icon className="-medium" name="icon-share" />
                  Share
                </button>
              </div>
            </div>
          </div>
        }
        {this.props.withScope && this.props.filters.scope === 'country' &&
          <div className="country-filters">
            <div>
              <span className="title">Select a country</span>
              <CountrySelect
                className="-gray"
                value={this.props.filters.country !== 'null' ? this.props.filters.country : null}
                onValueChange={selected => this.updateFilters(selected && selected.value, 'country')}
              />
            </div>
            <div>
              <span className="title">Compare With</span>
              <CountrySelect
                className={`-gray ${this.props.filters.country ? '' : '-disabled'}`}
                placeholder="Country name..."
                value={this.state.countryToCompare}
                onValueChange={selected => this.setState({ countryToCompare: selected.value })}
              />
            </div>
            <div>
              <Link
                className={`c-btn -filters ${this.state.countryToCompare ? '' : '-disabled'}`}
                to={`/compare?countries=${this.props.filters.country},${this.state.countryToCompare}`}
              >
                Compare
              </Link>
            </div>
          </div>
        }
        <div className="global-filters">
          <div>
            <span className="title">Crops</span>
            <CustomSelect
              search
              className="-gray"
              options={cropOptions}
              value={this.props.filters.crop}
              onValueChange={selected => selected && this.updateFilters(selected.value, 'crop')}
            />
          </div>
          <div>
            <span className="title">Water Risk</span>
            <CustomSelect
              className="-gray"
              options={waterOptions}
              value={this.props.filters.water}
              onValueChange={selected => selected && this.updateFilters(selected.value, 'water')}
            />
          </div>
          <div>
            <span className="title">Food security</span>
            <CustomSelect
              className="-gray"
              options={foodOptions}
              value={this.props.filters.food}
              onValueChange={selected => selected && this.updateFilters(selected.value, 'food')}
            />
          </div>
          <div>
            <span className="title">Timeframe</span>
            <CustomSelect
              className="-gray"
              options={yearOptions}
              value={yearOptions.find(i => i.value === this.props.filters.year).value}
              onValueChange={(selected) => {
                selected && selected.value === 'baseline' && this.updateFilters(
                  'absolute', 'data_type');
                selected && this.updateFilters(selected.value, 'year');
              }}
            />
            {this.props.filters.period_value !== 'baseline' &&
              <CustomSelect
                className="-gray"
                options={dataTypeOptions.map(option => Object.assign({}, option, { value: option.value }))}
                value={this.props.filters.data_type}
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
  setFilters: React.PropTypes.func,
  filters: React.PropTypes.object,
  withScope: React.PropTypes.bool,
  toggleModal: React.PropTypes.func
};

export default StickyFilters;
