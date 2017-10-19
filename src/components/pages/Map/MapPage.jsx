import React from 'react';

// Components
import { OnlyOn } from 'aqueduct-components';
import MapPageDesktop from './Content/Desktop';
import MapPageMobile from './Content/Mobile';

export default function MapPage(props) {
  return (
    <div className="-mobile-fullscreen">
      <OnlyOn device="mobile">
        <MapPageMobile {...props} />
      </OnlyOn>
      <OnlyOn device="desktop">
        <MapPageDesktop {...props} />
      </OnlyOn>
    </div>
  );
}
