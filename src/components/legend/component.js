import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Legend, Icon } from 'aqueduct-components';

class LegendMobile extends PureComponent {
  toggle() {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children: Legend,
      childrenProps: {
        isModal: true,
        ...this.props
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

LegendMobile.propTypes = { toggleModal: PropTypes.func.isRequired };

export default LegendMobile;
