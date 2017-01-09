import React from 'react';
import LegendButtons from 'components/legend/LegendButtons';
import LegendGraph from 'components/legend/LegendGraph';
import SourceModal from 'components/modal/SourceModal';

export default class Legend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(action) {
    if (action === 'info') {
      this.props.toggleModal(true, {
        children: SourceModal
      });
    }
  }

  render() {
    return (
      <div className={`c-legend ${this.props.className}`}>
        <ul>
          {this.props.layers.map((layer, index) =>
            layer.category !== 'mask' &&
            <li className="c-legend-item" key={index}>
              <header className="legend-item-header">
                <h3>
                  <span className="category">{layer.category} -</span>
                  <span className="name">{layer.name}</span>
                </h3>
                <LegendButtons triggerAction={this.triggerAction} />
              </header>
              <LegendGraph config={layer.legendConfig} />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

Legend.propTypes = {
  layers: React.PropTypes.array,
  className: React.PropTypes.string,
  toggleModal: React.PropTypes.func
};
