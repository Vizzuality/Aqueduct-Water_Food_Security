import React from 'react';

import LegendButtons from 'components/legend/LegendButtons';
import LegendGraph from 'components/legend/LegendGraph';
import SourceModal from 'components/modal/SourceModal';

class LegendItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(action) {
    if (action === 'info') {
      this.props.toggleModal(true, {
        children: SourceModal,
        childrenProps: {
          layer: this.props.layer
        }
      });
    }
  }

  render() {
    return (
      <li className="c-legend-item">
        <header className="legend-item-header">
          <h3>
            <span className="category">{this.props.layer.category} -</span>
            <span className="name">{this.props.layer.name}</span>
          </h3>
          <LegendButtons triggerAction={this.triggerAction} />
        </header>
        <LegendGraph config={this.props.layer.legendConfig} />
      </li>
    );
  }
}

export default LegendItem;

LegendItem.propTypes = {
  layer: React.PropTypes.object,
  toggleModal: React.PropTypes.func
};
