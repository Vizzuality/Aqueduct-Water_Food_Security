import React from 'react';
import CountrySelect from 'containers/countries/CountrySelect';
import WidgetList from 'components/widgets/WidgetList';
import Map from 'components/map/Map';

export default class CompareItem extends React.Component {

  getEmptyPlaceholder() {
    return <p>Choose a country first</p>;
  }

  render() {
    let countrySelected = null;
    const mapConfig = {
      zoom: 3,
      zoomControl: false,
      latLng: {
        lat: 0,
        lng: 0
      }
    };
    if (this.props.country) {
      countrySelected = this.props.countries.list.find(c => c.id === this.props.country);
      mapConfig.fitOn = countrySelected.geometry;
    }
    return (
      <div className="c-compareitem">
        <section className="compareitem-filters">
          <CountrySelect
            defaultValue={this.props.country || null}
            onValueChange={(selected) => {
              selected && this.props.setCompareCountry({ index: this.props.index, iso: selected.value });
            }}
          />
        </section>
        <section className="compareitem-map">
          {this.props.country ? <Map mapConfig={mapConfig} /> : this.getEmptyPlaceholder()}
        </section>
        <section className="compareitem-widgets">
          <WidgetList datasets={this.props.datasets} datasetsActive={this.props.datasets} />
        </section>
      </div>
    );
  }
}

CompareItem.propTypes = {
  countries: React.PropTypes.object,
  country: React.PropTypes.string,
  setCompareCountry: React.PropTypes.func,
  index: React.PropTypes.number,
  datasets: React.PropTypes.object
};
