import React, { PureComponent } from 'react';
import isEqual from 'react-fast-compare';

// Components
import { OnlyOn } from 'aqueduct-components';
import MapPageDesktop from './Content/Desktop';
import MapPageMobile from './Content/Mobile';

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
          <MapPageDesktop {...this.props} />
        </OnlyOn>
      </div>
    );
  }
}

export default MapPage;



// export default function MapPage(props) {
//   return (
//     <div className="-mobile-fullscreen">
//       <OnlyOn device="mobile">
//         <MapPageMobile {...props} />
//       </OnlyOn>
//       <OnlyOn device="desktop">
//         <MapPageDesktop {...props} />
//       </OnlyOn>
//     </div>
//   );
// }
