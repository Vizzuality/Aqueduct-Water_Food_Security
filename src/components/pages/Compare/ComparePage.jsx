import React from 'react';
import { OnlyOn } from 'aqueduct-components';
import { toastr } from 'react-redux-toastr';

import ComparePageDesktop from './Content/Desktop';
import ComparePageMobile from './Content/Mobile';

export default function ComparePage(props) {
  const showWidgetInfo = localStorage.getItem('AQ_WIDGETS_INFO_HIDE');

  if (!showWidgetInfo) {
    toastr.info('Note that widgets are not always limited to the current selection and can contain information about irrigated, rained and total agriculture as well as various indicators and timeframes.', {
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
