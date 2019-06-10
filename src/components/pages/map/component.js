import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import { OnlyOn } from 'aqueduct-components';

// components
import MapPageDesktop from './desktop';
import MapPageMobile from './mobile';

class MapPage extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { mapState, updateMapUrl } = this.props;
    const { mapState: nextMapState } = nextProps;
    const mapStateChanged = !isEqual(mapState, nextMapState);

    if (mapStateChanged) updateMapUrl();
  }

  render() {
    return (
      <div className="-mobile-fullscreen">
        <OnlyOn device="mobile">
          <MapPageMobile {...this.props} />
        </OnlyOn>
        <OnlyOn device="desktop">
          <MapPageDesktop />
        </OnlyOn>
      </div>
    );
  }
}

MapPage.propTypes = {
  mapState: PropTypes.object.isRequired,
  updateMapUrl: PropTypes.func.isRequired
};

export default MapPage;
