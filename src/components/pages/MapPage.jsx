import React from 'react';

// Components
import Sidebar from 'components/ui/Sidebar';
import Map from 'containers/map/Map';
import Filters from 'containers/filters/Filters';
import WidgetList from 'containers/widgets/WidgetList';

class MapPage extends React.Component {
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
        <Map />
      </div>
    );
  }
}

MapPage.propTypes = {
};

export default MapPage;
