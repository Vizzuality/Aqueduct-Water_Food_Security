import React from 'react';
import PropTypes from 'prop-types';
import { dispatch } from 'main';
import { Legend, Icon, toggleModal } from 'aqueduct-components';

export default function LegendMobile(props) {
  const toggle = () => {
    dispatch(toggleModal(true, {
      children: Legend,
      childrenProps: {
        isModal: true,
        ...props
      }
    }));
  };

  return (
    <button onClick={toggle} type="button">
      <Icon name="icon-legend" />
    </button>
  );
}

LegendMobile.propTypes = {
  layersActive: PropTypes.array
};
