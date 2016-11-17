/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import React from 'react';
import L from 'leaflet';

class Map extends React.Component {

  componentDidMount() {
    this.map = L.map('map', {
      minZoom: 2,
      zoom: 3,
      center: [52, 7],
      detectRetina: true
    });

    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    this.map.zoomControl.setPosition('topright');
    this.map.scrollWheelZoom.disable();
    this.tileLayer = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png')
                      .addTo(this.map)
                      .setZIndex(0);
    // Listen to leaflet events
    this.addMapEventListeners();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  getMapParams() {
    return {
      zoom: this.map.getZoom()
    };
  }

  addMapEventListeners() {
    function onZoomend() {
      this.props.setMapParams(this.getMapParams());
    }
    this.map.on('zoomend', onZoomend.bind(this));
  }

  render() {
    return (
      <div className="l-map -fullscreen">
        <div id={'map'} className="c-map" />
      </div>
    );
  }
}

Map.propTypes = {
  setMapParams: React.PropTypes.func
};

export default Map;
