import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Legend, Icon, SourceModal } from 'aqueduct-components';

class LegendMobile extends PureComponent {
  openLayerInfo() {
    const { toggleModal, layersActive } = this.props;

    if (layersActive[0]) {
      toggleModal(true, {
        children: SourceModal,
        childrenProps: { layer: layersActive[0] }
      });
    }
  }

  toggle() {
    const { toggleModal, layersActive } = this.props;

    toggleModal(true, {
      children: Legend,
      childrenProps: {
        isModal: true,
        ...this.props,
        layers: layersActive,
        onToggleInfo: () => { this.openLayerInfo(); }
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
