import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';
import isEqual from 'lodash/isEqual';
import capitalize from 'lodash/capitalize';
import { Spinner } from 'aqueduct-components';
import axios from 'axios';

// constants
import { LEGEND_OPACITY_RANGE } from 'components/map/legend/constants';
import { CROP_OPTIONS } from 'constants/crops';
import { CATEGORIES } from 'constants/filters';
import {
  BASELINE_WATER_INDICATORS_IDS,
  PROJECTED_WATER_INDICATORS_IDS
} from 'constants/water-indicators';

// utils
import { getObjectConversion } from 'utils/filters';
import { applyOpacity } from './helpers';

// components
import LegendButtons from './legend-buttons';
import LegendGraph from './legend-graph';

class LegendItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loading: true,
      layer: props.layer
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

  getLegendData() {
    const { filters } = this.props;
    const { layer } = this.state;
    const { layerConfig, legendConfig } = layer;


    if (!legendConfig.sql_query) {
      this.setState({ loading: false });

      return;
    }

    const legendConfigConverted = Object.assign({}, getObjectConversion(legendConfig, filters, 'water', legendConfig.params_config, legendConfig.sql_config));
    const { sql_query: sqlQuery } = legendConfigConverted;
    const { crop } = filters;

    axios.get(`https://${layerConfig.account}.carto.com/api/v2/sql?q=${sqlQuery}`)
      .then(({ data }) => {
        const buckets = data.rows[0].bucket;

        if (buckets === null || !buckets.length) {
          this.setState({
            loading: false,
            error: 'Data not available',
            layer: {
              ...layer,
              name: capitalize(crop)
            }
          });

          return;
        }

        const { color } = CROP_OPTIONS.find(c => c.value === crop) || {};
        const items = buckets.map((bucket, i) => ({
          value: `(< ${format('.3s')(bucket)})`,
          color: applyOpacity(color, LEGEND_OPACITY_RANGE[i]),
          name: ''
        }));

        const newlegendConfig = {
          ...legendConfigConverted,
          ...{ items }
        };

        this.setState({
          error: null,
          loading: false,
          layer: {
            ...layer,
            legendConfig: newlegendConfig,
            name: capitalize(crop)
          }
        });
      })
      .catch((err) => { throw err; });
  }


  triggerAction(action) {
    const { onToggleInfo, layer } = this.props;
    if (action === 'info') {
      if (onToggleInfo) onToggleInfo(layer);
    }
  }

  render() {
    const { waterLayerName } = this.props;
    const {
      layer,
      loading,
      error
    } = this.state;
    const waterLayer = [
      ...BASELINE_WATER_INDICATORS_IDS,
      ...PROJECTED_WATER_INDICATORS_IDS
    ].includes(layer.id);
    const layerCategory = (waterLayer && waterLayerName) ? 'water' : layer.category;

    return (
      <li className="c-legend-item">
        <header className="legend-item-header">
          <h3>
            {layerCategory
              && (<span className="category">{CATEGORIES[layerCategory]} -</span>)}
            <span className="name">{waterLayer ? waterLayerName : layer.name}</span>
          </h3>
          <LegendButtons triggerAction={this.triggerAction} />
        </header>
        {!error
          ? <LegendGraph config={layer.legendConfig} />
          : <span className="error-message">{error}</span>
        }
        <Spinner isLoading={loading} />
      </li>
    );
  }
}

LegendItem.propTypes = {
  waterLayerName: PropTypes.string,
  layer: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  onToggleInfo: PropTypes.func
};

LegendItem.defaultProps = {
  onToggleInfo: null,
  waterLayerName: null
};

export default LegendItem;
