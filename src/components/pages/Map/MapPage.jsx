import React from 'react';
import OnlyOn from 'components/ui/Responsive';
import MapPageDesktop from './Content/Desktop';
import MapPageMobile from './Content/Mobile';

export default function ComparePage(props) {
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
