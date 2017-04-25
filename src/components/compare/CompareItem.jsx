import React from 'react';
import WidgetList from 'components/widgets/WidgetList';
import { Map, Icon } from 'aqueduct-components';
import LegendMobile from 'components/legend/LegendMobile';
import DynamicHeader from 'components/map/DynamicHeader';
import Summary from 'components/summary/Summary';
import LayerManager from 'utils/layers/LayerManager';

export default class CompareItem extends React.Component {

  render() {
    const emptyPlaceholder = (
      <div className="country-placeholder">
        <div>
          <Icon className="-huge country-placeholder-icon" name="icon-country" />
          <p className="country-placeholder-text">Choose a country first</p>
        </div>
      </div>
    );

    let countrySelected = null;
    const mapConfig = {
      zoom: 3,
      latLng: {
        lat: 0,
        lng: 0
      }
    };
    if (this.props.country) {
      countrySelected = this.props.countryList.find(c => c.id === this.props.country);
      mapConfig.bounds = countrySelected;
    }
    const showMap = (!this.props.context || (this.props.context && this.props.context === 'map'));
    const showWidgets = this.props.country && (!this.props.context || (this.props.context && this.props.context === 'data'));
    const map = (
      <div>
        <LegendMobile
          filters={this.props.filters}
          layers={this.props.layersActive}
        />
        <Map
          filters={this.props.filters}
          mapConfig={mapConfig}
          layersActive={this.props.layersActive}
          LayerManager={LayerManager}
        />
        {this.props.countryList.length &&
          <DynamicHeader
            countries={this.props.countryList}
            filters={this.props.filters}
          />}
      </div>
    );

    return (
      <div className="c-compareitem">
        {showMap &&
          <section className="compareitem-map">
            {this.props.country ? map : emptyPlaceholder}
          </section>
        }
        {showWidgets &&
          <section className="compareitem-widgets">
            <Summary filters={this.props.filters} countries={this.props.countryList} />
            <WidgetList filters={this.props.filters} loading={this.props.loading} widgetsActive={this.props.widgetsActive} />
          </section>
        }
      </div>
    );
  }
}

CompareItem.propTypes = {
  context: React.PropTypes.string,
  countryList: React.PropTypes.array,
  country: React.PropTypes.string,
  loading: React.PropTypes.bool,
  widgetsActive: React.PropTypes.array,
  filters: React.PropTypes.object,
  layersActive: React.PropTypes.array
};
