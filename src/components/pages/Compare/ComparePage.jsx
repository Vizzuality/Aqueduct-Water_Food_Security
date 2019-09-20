import React from 'react';
import { OnlyOn } from 'aqueduct-components';
import { toastr } from 'react-redux-toastr';

import ComparePageDesktop from './Content/Desktop';
import ComparePageMobile from './Content/Mobile';

export default function ComparePage(props) {
  const showWidgetInfo = localStorage.getItem('AQ_WIDGETS_INFO_HIDE');

  if (!showWidgetInfo) {
    toastr.info('Widgets contain information about irrigated and rainfed crops and multiple indicators.', {
      onHideComplete: () => { localStorage.setItem('AQ_WIDGETS_INFO_HIDE', true); },
      timeout: 5500
    });
  }

  return (
    <div>
      <OnlyOn device="mobile">
        <ComparePageMobile {...props} />
      </OnlyOn>
      <OnlyOn device="desktop">
        <ComparePageDesktop {...props} />
      </OnlyOn>
    </div>
  );
}
