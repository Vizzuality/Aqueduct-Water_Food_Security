import React from 'react';

// Components
import Sidebar from 'components/ui/Sidebar';
import Map from 'components/map/Map';
import Filters from 'components/filters/Filters';
import WidgetList from 'components/widgets/WidgetList';
import Legend from 'components/legend/Legend';

class MapPage extends React.Component {

  componentWillMount() {
    this.props.updateMapUrl();
  }

  render() {
    const mapConfig = Object.assign({}, this.props.mapConfig, { scrollWheelZoom: true });
    if (this.props.filters.country) {
      // Obtain country geom
      mapConfig.fitOn = this.props.countries.list.find(c => c.id === this.props.filters.country);
    }

    return (
      <div className="l-map -fullscreen">

        {/* Sidebar */}
        <Sidebar>
          {/* Filters */}
          <div className="l-filters">
            <Filters className="-sidebar" filters={this.props.filters} setFilters={this.props.setFilters} withScope />
          </div>
          {/* Widget List */}
          <div className="l-sidebar-content">
            {/* <WidgetList filters={this.props.filters} widgetsActive={this.props.widgetsActive} /> */}
          </div>
        </Sidebar>

        {/* Map */}
        <Map mapConfig={mapConfig} filters={this.props.filters} layersActive={this.props.layersActive} setMapParams={this.props.setMapParams} />
        <Legend className="-map" layers={this.props.layersActive} />
      </div>
    );
  }
}

MapPage.propTypes = {
  mapConfig: React.PropTypes.object,
  filters: React.PropTypes.object,
  countries: React.PropTypes.object,
  layersActive: React.PropTypes.array,
  widgetsActive: React.PropTypes.array,
  // Actions
  setMapParams: React.PropTypes.func,
  updateMapUrl: React.PropTypes.func,
  setFilters: React.PropTypes.func
};

export default MapPage;
