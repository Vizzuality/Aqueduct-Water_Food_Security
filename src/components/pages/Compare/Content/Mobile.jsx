import React from 'react';
import PropTypes from 'prop-types';
import { dispatch } from 'main';
import ShareModal from 'containers/modal/ShareModal';

// Components
import { Link } from 'react-router';
import { SegmentedUi, toggleModal } from 'aqueduct-components';
import CompareListMobile from 'components/compare/CompareListMobile';
import MobileFilters from 'components/filters/mobile';
import CountrySelect from 'containers/countries/CountrySelect';

export default class ComparePageMobile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: 2,
      active: 0
    };

    // bindings
    this.toggleShareModal = this.toggleShareModal.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);
  }

  componentWillMount() {
    this.props.updateCompareUrl();
  }

  componentWillUnmount() {
    this.props.emptyCompareCountries();
  }

  onChangeTab(item) {
    this.setState({ active: +item.value });
  }

  getCountrySelects() {
    const items = [{
      title: 'Select country',
      placeholder: 'Select country'
    }, {
      title: 'Compare with...',
      placeholder: 'Compare with...'
    }];

    return (
      <div className="c-filters">
        <div className="filters-section -highlighted">
          {items.map((item, i) => {
            const props = {
              value: this.props.compare.countries[i] || null,
              placeholder: items.placeholder,
              onValueChange: (selected) => {
                selected && this.props.setCompareCountry({ index: i, iso: selected.value });
              }
            };
            return (
              <div key={i} className="c-filters-item">
                {/* Country */}
                <div className="filter-item-header">
                  <span className="title">{item.title}</span>
                </div>
                <CountrySelect {...props} />
              </div>
            );
          })}

          <div className="c-filters-item">
            <Link className="c-btn -primary -dark -fluid" to="/">Back</Link>
          </div>
        </div>
      </div>
    );
  }

  getCountries() {
    return this.props.compare.countries.map((item, index) => {
      const country = this.props.countries.list.find(c => c.id === item);
      return { label: country ? country.name : '', value: String(index) };
    });
  }

  toggleShareModal() {
    dispatch(toggleModal(true, {
      children: ShareModal
    }));
  }

  render() {
    const headingContent = (
      <div>
        {this.getCountrySelects()}
      </div>
    );
    return (
      <div className="l-comparepage -mobile-fullscreen">
        <div className="compare-filters">
          <MobileFilters
            className="-compare"
            filters={this.props.filters}
            setFilters={this.props.setFilters}
            headingContent={headingContent}
          >
            <SegmentedUi
              className="-stacked-tabs"
              selected="0"
              items={this.getCountries()}
              onChange={this.onChangeTab}
            />
          </MobileFilters>
        </div>
        <CompareListMobile
          active={this.state.active}
          filters={this.props.filters}
          countryList={this.props.countries.list}
          countries={this.props.compare.countries}
          loading={this.props.loading}
          widgetsActive={this.props.widgetsActive}
          layersActive={this.props.layersActive}
          items={this.state.items}
        />
      </div>
    );
  }
}

ComparePageMobile.propTypes = {
  compare: PropTypes.object,
  loading: PropTypes.bool,
  countries: PropTypes.object,
  filters: PropTypes.object,
  setFilters: PropTypes.func,
  updateCompareUrl: PropTypes.func,
  setCompareCountry: PropTypes.func,
  emptyCompareCountries: PropTypes.func,
  widgetsActive: PropTypes.array,
  layersActive: PropTypes.array
};
