import React from 'react';
import ShareModal from 'containers/modal/ShareModal';

// Components
import { Link } from 'react-router';
import { SegmentedUi } from 'aqueduct-components';
import CompareListMobile from 'components/compare/CompareListMobile';
import MobileFilters from 'components/filters/MobileFilters';
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
    const items = [];
    let props;
    let title = 'Select country';
    for (let i = 0; i < this.state.items; i += 1) {
      props = {
        value: this.props.compare.countries[i] || null,
        onValueChange: (selected) => {
          selected && this.props.setCompareCountry({ index: i, iso: selected.value });
        }
      };
      if (i > 0) {
        props.placeholder = 'Compare with...';
        title = 'Compare with...';
      }
      items.push(
        <div className="c-select" key={i}>
          <span className="title">{title}</span>
          <CountrySelect {...props} />
        </div>
      );
    }
    return items;
  }

  getCountries() {
    return this.props.compare.countries.map((item, index) => {
      const country = this.props.countries.list.find(c => c.id === item);
      return { label: country ? country.name : '', value: String(index) };
    });
  }

  toggleShareModal() {
    this.props.toggleModal(true, {
      children: ShareModal
    });
  }

  render() {
    const headingContent = (
      <div>
        {this.getCountrySelects()}
        <Link className="c-btn -primary -dark -fluid" to="/">Back</Link>
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
  compare: React.PropTypes.object,
  loading: React.PropTypes.bool,
  countries: React.PropTypes.object,
  filters: React.PropTypes.object,
  setFilters: React.PropTypes.func,
  updateCompareUrl: React.PropTypes.func,
  setCompareCountry: React.PropTypes.func,
  emptyCompareCountries: React.PropTypes.func,
  toggleModal: React.PropTypes.func,
  widgetsActive: React.PropTypes.array,
  layersActive: React.PropTypes.array
};
