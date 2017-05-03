import React from 'react';
import { dispatch } from 'main';
import { Legend, OnlyOn, Icon, toggleModal } from 'aqueduct-components';

export default function LegendMobile(props) {
  const toggle = () => {
    dispatch(toggleModal(true, {
      children: Legend,
      childrenProps: { ...props }
    }));
  };

  return (
    <OnlyOn device="mobile">
      <button onClick={toggle} className="toggle-legend-btn" type="button">
        <Icon name="icon-legend" />
      </button>
    </OnlyOn>
  );
}

LegendMobile.propTypes = {
  layersActive: React.PropTypes.array
};
