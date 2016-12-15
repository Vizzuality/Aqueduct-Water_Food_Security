import React from 'react';
import WidgetList from 'components/widgets/WidgetList';
import Map from 'components/map/Map';
import Icon from 'components/ui/Icon';

export default class CompareItem extends React.Component {

  getEmptyPlaceholder() {
    return (
      <div className="country-placeholder">
        <div>
          <Icon className="-huge country-placeholder-icon" name="icon-country_illustration" />
          <p className="country-placeholder-text">Choose a country first</p>
        </div>
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
          <WidgetList filters={this.props.filters} loading={this.props.loading} widgetsActive={this.props.widgetsActive} />
        </section>
      </div>
    );
  }
}

CompareItem.propTypes = {
  countryList: React.PropTypes.array,
  country: React.PropTypes.string,
  loading: React.PropTypes.bool,
  widgetsActive: React.PropTypes.array,
  filters: React.PropTypes.object
};
