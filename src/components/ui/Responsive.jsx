import { BREAKPOINT_MOBILE } from 'constants/responsive';
import React from 'react';
import MediaQuery from 'react-responsive';

export default function OnlyOn(props) {
  const breakpoints = {
    mobile: `(max-width: ${BREAKPOINT_MOBILE}px)`,
    desktop: `(min-width: ${BREAKPOINT_MOBILE + 1}px)`
  };
  return (
    <MediaQuery query={breakpoints[props.device]}>
      {props.children}
    </MediaQuery>
  );
}

OnlyOn.propTypes = {
  // STORE
  children: React.PropTypes.object,
  device: React.PropTypes.string.isRequired
};
