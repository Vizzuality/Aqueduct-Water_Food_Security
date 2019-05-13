import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'aqueduct-components';

class LegendButtons extends PureComponent {
  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(e) {
    const { triggerAction } = this.props;
    const { action } = e.currentTarget.dataset;

    triggerAction(action);
  }

  render() {
    return (
      <ul className="c-legend-buttons">
        <li>
          <button
            type="button"
            data-action="info"
            className="legend-button"
            onClick={this.triggerAction}
          >
            <Icon name="icon-info" />
          </button>
        </li>
      </ul>
    );
  }
}

LegendButtons.propTypes = {
  triggerAction: PropTypes.func.isRequired
};

export default LegendButtons;
