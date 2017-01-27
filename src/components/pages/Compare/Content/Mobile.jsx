import React from 'react';
import CountrySelect from 'containers/countries/CountrySelect';
import ShareModal from 'containers/modal/ShareModal';

// Components
import CompareListMobile from 'components/compare/CompareListMobile';
import MobileFilters from 'components/filters/MobileFilters';
// import MobileSwipe from 'components/ui/MobileSwipe';

export default class ComparePageMobile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: 2,
      active: 0
    };

    // bindings
    this.toggleShareModal = this.toggleShareModal.bind(this);
    this.onSwipeItem = this.onSwipeItem.bind(this);
  }

  componentWillMount() {
    this.props.updateCompareUrl();
  }

  onSwipeItem(index) {
    this.setState(Object.assign({}, this.state, { active: index }));
  }

  getCountrySelects() {
    const items = [];
    for (let i = 0; i < this.state.items; i += 1) {
      items.push(
        <CountrySelect
          key={i}
          value={this.props.compare.countries[i] || null}
          onValueChange={(selected) => {
            selected && this.props.setCompareCountry({ index: i, iso: selected.value });
          }}
        />
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
      <div className="l-comparepage -mobile-fullscreen">
        <div className="compare-filters">
          <MobileFilters className="-compare" filters={this.props.filters} setFilters={this.props.setFilters}>
            {
              // <MobileSwipe items={this.getCountrySelects()} onChange={this.onSwipeItem} />
            }
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
