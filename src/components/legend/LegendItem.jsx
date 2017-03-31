import React from 'react';

import LegendButtons from 'components/legend/LegendButtons';
import LegendGraph from 'components/legend/LegendGraph';
import SourceModal from 'components/modal/SourceModal';
import { Spinner } from 'aqueduct-components';
import { get } from 'utils/request';
import { getObjectConversion } from 'utils/filters/filters';
import { cropOptions } from 'constants/filters';
import { legendOpacityRange } from 'constants/index';
import { format } from 'd3-format';
import { isEqual, capitalize } from 'lodash';

const categories = {
  water: 'Water risk',
  food: 'Food security',
  crop: 'Crops'
};

class LegendItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      layer: this.props.layer
    };

    // BINDINGS
    this.triggerAction = this.triggerAction.bind(this);
  }

  componentDidMount() {
    this.getLegendData();
  }

  componentWillReceiveProps(nextProps) {
    if (isEqual(this.props, nextProps)) return;
    const newState = {
      ...nextProps,
      loading: true
    };
    this.setState(newState, this.getLegendData);
  }

  _applyOpacity(hex, opacity) {
    // Splits in 2-length chunks the hexadecimal
    const hexArray = hex.split('#')[1].match(/.{1,2}/g);
    // Converts from hex to RGB every chunk
    const rgb = hexArray.map(h => parseInt(h, 16));

    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
  }

  getLegendData() {
    const { layerConfig, legendConfig } = this.state.layer;
    if (!legendConfig.sqlQuery) {
      this.setState({
        loading: false
      });
      return;
    }

    const legendConfigConverted = getObjectConversion(legendConfig, this.props.filters, 'water');
    const { sqlQuery } = legendConfigConverted;
    const { crop } = this.props.filters;

    get({
      url: `https://${layerConfig.account}.carto.com/api/v2/sql?q=${sqlQuery}`,
      onSuccess: (data) => {
        const buckets = data.rows[0].bucket;
        const color = cropOptions.find(c => c.value === crop).color;
        const items = buckets.map((bucket, i) => { return { value: `(>= ${format('.3s')(bucket)})`, color: this._applyOpacity(color, legendOpacityRange[i]), name: '' }; });

        const newlegendConfig = {
          ...legendConfig,
          ...{ items }
        };

        this.setState({
          loading: false,
          layer: {
            ...this.state.layer,
            legendConfig: newlegendConfig,
            name: capitalize(crop)
          }
        });
      },
      onError: (err) => {
        throw err;
      }
    });
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
            {this.state.layer.category && <span className="category">{categories[this.state.layer.category]} -</span>}
            <span className="name">{this.state.layer.name}</span>
          </h3>
          <LegendButtons triggerAction={this.triggerAction} />
        </header>
        <LegendGraph config={this.state.layer.legendConfig} />
        <Spinner isLoading={this.state.loading} />
      </li>
    );
  }
}

export default LegendItem;

LegendItem.propTypes = {
  layer: React.PropTypes.object,
  filters: React.PropTypes.object,
  toggleModal: React.PropTypes.func
};
