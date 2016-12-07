import React from 'react';
import WidgetList from 'components/widgets/WidgetList';
import Map from 'components/map/Map';
import Icon from 'components/ui/Icon';

export default class CompareItem extends React.Component {

  getEmptyPlaceholder() {
    return (
      <div className="country-placeholder">
        <Icon name="icon-country-empty" />
        <p>Choose a country first</p>
      </div>
    );
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
      countrySelected = this.props.countryList.find(c => c.id === this.props.country);
      mapConfig.fitOn = countrySelected;
    }
    return (
      <div className="c-compareitem">
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
  countryList: React.PropTypes.array,
  country: React.PropTypes.string,
  datasets: React.PropTypes.object
};
