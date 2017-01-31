import React from 'react';
import CountrySelect from 'containers/countries/CountrySelect';
import ShareModal from 'containers/modal/ShareModal';

// Components
import CompareList from 'components/compare/CompareList';
import Filters from 'components/filters/Filters';
import Icon from 'components/ui/Icon';
import { Link } from 'react-router';

export default class ComparePageDesktop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: 2
    };

    // bindings
    this.toggleShareModal = this.toggleShareModal.bind(this);
  }

  componentWillMount() {
    this.props.updateCompareUrl();
  }

  getCountrySelects() {
    const items = [];
    for (let i = 0; i < this.state.items; i += 1) {
      const text = i === 0 ? 'Selected country' : 'Compare with...';
      items.push(
        <div className="small-6 columns compare-country-wrapper" key={i}>
          <span className="compare-filters-text">{text}</span>
          <CountrySelect
            className="-fixed"
            value={this.props.compare.countries[i] || null}
            onValueChange={(selected) => {
              selected && this.props.setCompareCountry({ index: i, iso: selected.value });
            }}
          />
        </div>
      );
    }
    return items;
  }

  componentWillUnmount() {
    this.props.emptyCompareCountries();
  }

  toggleShareModal() {
    this.props.toggleModal(true, {
      children: ShareModal
    });
  }

  render() {
    return (
      <div className="l-comparepage l-fullheight">
        <div className="compare-header">
          <Link to="/" className="back-link">Back</Link>
          <button onClick={this.toggleShareModal} className="share-btn" type="button"><Icon name="icon-share" className="medium" />Share</button>
        </div>
        <div className="compare-filters">
          <div className="compare-filters-section -highlighted">
            <div className="row expanded collapse">{this.getCountrySelects()}</div>
          </div>
          <div className="compare-filters-section -collapsed">
            <Filters className="-compare" filters={this.props.filters} setFilters={this.props.setFilters} />
          </div>
        </div>
        <CompareList
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

ComparePageDesktop.propTypes = {
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
