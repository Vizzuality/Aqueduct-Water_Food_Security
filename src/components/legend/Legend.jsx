import React from 'react';
import orderBy from 'lodash/orderBy';

import LegendButtons from 'components/legend/LegendButtons';
import LegendGraph from 'components/legend/LegendGraph';
import SourceModal from 'components/modal/SourceModal';

export default class Legend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLayer: null,
    };
  }

  render() {
    const layers = orderBy(this.props.layers, ['category'], ['desc']);
    return (
      <div className={`c-legend ${this.props.className}`}>
        <ul>
          {layers.map((layer, index) =>
            layer.category !== 'mask' &&
            <LegendItem toggleModal={this.props.toggleModal} layer={layer} key={index}/>
          )}
        </ul>
      </div>
    );
  }
}

/**
 * Legend Item subcomponent
 */
class LegendItem extends React.Component {
  constructor (props) {
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
            {this.props.layer.category && <span className="category">{this.props.layer.category} -</span>}
            <span className="name">{this.props.layer.name}</span>
          </h3>
          <LegendButtons triggerAction={this.triggerAction} />
        </header>
        <LegendGraph config={this.props.layer.legendConfig} />
      </li>
    );
  }
}

Legend.propTypes = {
  layers: React.PropTypes.array,
  className: React.PropTypes.string
};

LegendItem.propTypes = {
  layer: React.PropTypes.object,
  toggleModal: React.PropTypes.func,
};
