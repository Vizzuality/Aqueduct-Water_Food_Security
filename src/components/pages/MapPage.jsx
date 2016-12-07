import React from 'react';

// Components
import Sidebar from 'components/ui/Sidebar';
import Map from 'components/map/Map';
import Filters from 'containers/filters/Filters';
import WidgetList from 'containers/widgets/WidgetList';

class MapPage extends React.Component {

  componentWillMount() {
    this.props.updateMapUrl();
  }

  render() {
    return (
      <div className="l-map -fullscreen">
        <Sidebar>
          {/* Filters */}
          <div className="l-filters">
            <Filters />
          </div>

          {/* Widget List */}
          <div className="l-sidebar-content">
            <WidgetList />
          </div>
        </Sidebar>
        <Map mapConfig={this.props.mapConfig} setMapParams={this.props.setMapParams} />
      </div>
    );
  }
}

MapPage.propTypes = {
  mapConfig: React.PropTypes.object,
  setMapParams: React.PropTypes.func,
  updateMapUrl: React.PropTypes.func
};

export default MapPage;
