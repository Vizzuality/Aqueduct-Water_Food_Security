import React from 'react';
import PropTypes from 'prop-types';
import { dispatch } from 'main';
import ShareModal from 'containers/modal/ShareModal';

// Components
import CompareList from 'components/compare/CompareList';
import Filters from 'components/filters/Filters';
import CountrySelect from 'containers/countries/CountrySelect';
import StickyFilters from 'components/filters/StickyFilters';
import { Icon, toggleModal, Sticky } from 'aqueduct-components';
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
  componentDidMount() {
    this.setStickyFilterPosition();
  }

  componentDidUpdate() {
    this.setStickyFilterPosition();
  }

  componentWillUnmount() {
    this.props.emptyCompareCountries();
  }

  onSticky(isSticky) {
    this.setState({
      showStickyFilters: isSticky
    });
  }

  setStickyFilterPosition() {
    const elemHeight = this.filtersElem.getBoundingClientRect().height;
    const stickyFilterTopPosition = this.filtersElem.offsetTop + elemHeight;

    if (this.state.stickyFilterTopPosition === stickyFilterTopPosition) return;

    this.setState({
      stickyFilterTopPosition
    });
  }

  getCountrySelects() {
    const items = [];
    for (let i = 0; i < this.state.items; i += 1) {
      const text = i === 0 ? 'Selected country' : 'Compare with...';
      items.push(
        <div className="small-6 columns" key={i}>
          <div className="compare-country-wrapper">
            <span className="compare-filters-text">{text}</span>
            <CountrySelect
              className="-fixed"
              value={this.props.compare.countries[i] || null}
              onValueChange={(selected) => {
                selected && this.props.setCompareCountry({ index: i, iso: selected.value });
              }}
            />
          </div>
        </div>
      );
    }
    return items;
  }

  toggleShareModal() {
    dispatch(toggleModal(true, {
      children: ShareModal
    }));
  }

  render() {
    return (
      <div className="l-comparepage l-fullheight">
        <div className="compare-header">
          <Link to="/" className="back-link">Back</Link>
          <button onClick={this.toggleShareModal} className="share-btn" type="button"><Icon name="icon-share" className="medium" />Share</button>
        </div>
        <div className="compare-filters" ref={(elem) => { this.filtersElem = elem; }}>
          <div className="compare-filters-section -highlighted">
            <div className="row expanded collapse">{this.getCountrySelects()}</div>
          </div>
          <div className="compare-filters-wrapper">
            <div className="compare-filters-section -collapsed">
              <Filters
                className="-compare"
                filters={this.props.filters}
                setFilters={this.props.setFilters}
              />
            </div>
          </div>
        </div>

        {/* Sticky Filters */}
        <Sticky
          className="-full-width"
          topLimit={this.state.stickyFilterTopPosition}
          onStick={(isSticky) => { this.onSticky(isSticky); }}
        >
          {this.state.showStickyFilters &&
            <StickyFilters
              countriesCompare={this.props.compare.countries}
              filters={this.props.filters}
              setFilters={this.props.setFilters}
              setCompareCountry={this.props.setCompareCountry}
            />
          }
        </Sticky>

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
