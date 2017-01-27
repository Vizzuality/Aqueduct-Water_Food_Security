import React from 'react';
import Legend from 'containers/legend/Legend';
import OnlyOn from 'components/ui/Responsive';

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
      <button onClick={toggle} className="toggle-legend-btn" type="button" />
    </OnlyOn>
  );
}

LegendMobile.propTypes = {
  layersActive: React.PropTypes.array,
  toggleModal: React.PropTypes.func
};
