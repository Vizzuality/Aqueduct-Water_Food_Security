import React from 'react';

import RadioGroup from 'components/common/RadioGroup';
import Switch from 'components/common/Switch';

const predictionOptions = [
  { value: 'optimistic', label: 'Optimistic View' },
  { value: 'pesimistic', label: 'Pesimistic View' },
  { value: 'business', label: 'Business as usual' }
];

const layerTypeOptions = [
  { value: 'food', label: 'Food' },
  { value: 'water', label: 'Water' }
];


class Filters extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerChange = this.triggerChange.bind(this);
  }

  /**
   * UI EVENTS
   * - triggerChange
   */
  triggerChange(selected, name) {
    const newFilters = Object.assign({}, this.props.filters[this.props.filters.current], {
      [name]: selected.value
    });

    this.props.triggerChange(newFilters);
  }

  render() {
    const currentFilters = this.props.filters[this.props.filters.current];
    return (
      <div className="c-filters-tabs-content">
        <div className="section">
          <Switch
            selected={currentFilters.layerType}
            items={layerTypeOptions}
            onChange={selected => this.triggerChange(selected, 'layerType')}
          />

          <RadioGroup
            name="prediction"
            selected={currentFilters.prediction}
            items={predictionOptions}
            className="-inline"
            onChange={selected => this.triggerChange(selected, 'prediction')}
          />
        </div>
        {/* <div className="section">

        </div> */}
      </div>
    );
  }
}

Filters.propTypes = {
  filters: React.PropTypes.object,
  triggerChange: React.PropTypes.func
};


export default Filters;
