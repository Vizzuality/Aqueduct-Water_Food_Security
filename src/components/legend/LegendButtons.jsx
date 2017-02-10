import React from 'react';
import { Icon } from 'aqueduct-components';

class LegendButtons extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(e) {
    const action = e.currentTarget.dataset.action;
    this.props.triggerAction(action);
  }

  render() {
    return (
      <ul className="c-legend-buttons">
        {/* <li>
          <button data-action="visibility" className="legend-button" onClick={this.triggerAction}>
            <Icon name="icon-eye" />
          </button>
        </li> */}
        <li>
          <button data-action="info" className="legend-button" onClick={this.triggerAction}>
            <Icon name="icon-info" />
          </button>
        </li>
      </ul>
    );
  }
}

LegendButtons.propTypes = {
  // PROPS
  triggerAction: React.PropTypes.func
};


export default LegendButtons;
