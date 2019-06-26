import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Legend, Icon } from 'aqueduct-components';

class LegendMobile extends PureComponent {
  toggle() {
    const { toggleModal, layersActive } = this.props;

    toggleModal(true, {
      children: Legend,
      childrenProps: {
        isModal: true,
        ...this.props,
        layers: layersActive
      }
    });
  }

  render() {
    return (
      <button
        type="button"
        onClick={() => { this.toggle(); }}
      >
        <Icon name="icon-legend" />
      </button>
    );
  }
}

LegendMobile.propTypes = {
  layersActive: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default LegendMobile;
