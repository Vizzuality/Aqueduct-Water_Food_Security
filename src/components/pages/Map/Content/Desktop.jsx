import React from 'react';

// Components
import Sidebar from 'containers/ui/Sidebar';
import Map from 'components/map/Map';
import Filters from 'components/filters/Filters';
import WidgetList from 'components/widgets/WidgetList';
import Legend from 'containers/legend/Legend';
import LayerManager from 'utils/layers/LayerManager';

export default class MapPageDesktop extends React.Component {

  componentWillMount() {
    this.props.updateMapUrl();
  }

  render() {
    const mapConfig = Object.assign({}, this.props.mapConfig, { scrollWheelZoom: true });

    if (this.props.filters.scope === 'country' && this.props.filters.country) {
      // Obtain country geom
      mapConfig.bounds = this.props.countries.list.find(c => c.id === this.props.filters.country);
    }

    return (
      <div className="l-map -fullscreen">

        {/* Sidebar */}
        <Sidebar>
          {/* Filters */}
          <div className="l-filters">
            <Filters
              className="-sidebar"
              filters={this.props.filters}
              setFilters={this.props.setFilters}
              toggleModal={this.props.toggleModal}
              withScope
            />
          </div>
          {/* Widget List */}
          <div className="l-sidebar-content">
            <WidgetList filters={this.props.filters} widgetsActive={this.props.widgetsActive} />
          </div>
        </Sidebar>

        {/* Map */}
        <div className="c-map-container">
          <Map
            LayerManager={LayerManager}
            mapConfig={mapConfig}
            filters={this.props.filters}
            layersActive={this.props.layersActive}
            setMapParams={this.props.setMapParams}
            sidebar={this.props.sidebar}
          />
          <Legend
            className="-map"
            expanded
            layers={this.props.layersActive}
          />
        </div>
      </div>
    );
  }
}

MapPageDesktop.propTypes = {
  mapConfig: React.PropTypes.object,
  filters: React.PropTypes.object,
  countries: React.PropTypes.object,
  sidebar: React.PropTypes.object,
  layersActive: React.PropTypes.array,
  widgetsActive: React.PropTypes.array,
  // Actions
  setMapParams: React.PropTypes.func,
  updateMapUrl: React.PropTypes.func,
  setFilters: React.PropTypes.func,
  toggleModal: React.PropTypes.func
};
