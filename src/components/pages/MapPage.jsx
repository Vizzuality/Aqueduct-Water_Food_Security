import React from 'react';

// Components
import Sidebar from 'components/ui/Sidebar';
import Map from 'components/map/Map';
import Filters from 'components/filters/Filters';
import WidgetList from 'containers/widgets/WidgetList';

class MapPage extends React.Component {

  componentWillMount() {
    this.props.updateMapUrl();
  }

  render() {
    const mapConfig = Object.assign({}, this.props.mapConfig);
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
            <WidgetList />
          </div>
        </Sidebar>

        {/* Map */}
        <Map mapConfig={mapConfig} setMapParams={this.props.setMapParams} />
      </div>
    );
  }
}

MapPage.propTypes = {
  mapConfig: React.PropTypes.object,
  setMapParams: React.PropTypes.func,
  updateMapUrl: React.PropTypes.func,
  filters: React.PropTypes.object,
  countries: React.PropTypes.object,
  setFilters: React.PropTypes.func
};

export default MapPage;
