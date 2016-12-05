import React from 'react';
import Sidebar from 'components/ui/Sidebar';
import Map from 'containers/map/Map';
import Legend from 'components/legend/Legend';

const layers = [
  { title: 'Layer title' },
  { title: 'Layer title' },
  { title: 'Layer title' },
  { title: 'Layer title' },
  { title: 'Layer title' },
  { title: 'Layer title' }
];

class MapPage extends React.Component {
  render() {
    return (
      <div className="l-map -fullscreen">
        <Sidebar />
        <Map />
        <Legend className="map-legend" layers={layers} />
      </div>
    );
  }
}

MapPage.propTypes = {
};

export default MapPage;
