import React from 'react';
import Legend from 'containers/legend/Legend';
import { OnlyOn, Icon } from 'aqueduct-components';

export default function LegendMobile(props) {
  const toggle = () => {
    props.toggleModal(true, {
      children: Legend,
      childrenProps: {
        layers: props.layersActive
      }
    });
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
