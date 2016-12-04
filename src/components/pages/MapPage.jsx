import React from 'react';
import Sidebar from 'components/ui/Sidebar';
import Map from 'containers/map/Map';

class MapPage extends React.Component {
  render() {
    return (
      <div className="l-map -fullscreen">
        <Sidebar />
        <Map />
      </div>
    );
  }
}

MapPage.propTypes = {
};

export default MapPage;
