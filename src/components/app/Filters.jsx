import React from 'react';
import FiltersTabs from 'components/app/FiltersTabs';

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
    this.triggerChangeScope = this.triggerChangeScope.bind(this);
  }

  /**
   * UI EVENTS
   * - triggerChange
   */
  triggerChange(selected, name) {
    this.setState({
      [name]: (selected) ? selected.value : null
    }, () => {
      console.log(this.state);
    });
  }

  triggerChangeScope(scope) {
    this.props.setCurrentFilter(scope);
  }

  render() {
    return (
      <div className="c-filters">
        <FiltersTabs triggerChangeScope={this.triggerChangeScope} scope={this.props.filters.current} />
        {/* <RadioGroup
          name="prediction"
          defaultValue="optimistic"
          items={predictionOptions}
          className="-inline"
          onChange={selected => this.triggerChange(selected, 'prediction')}
        />

        <Switch
          value={this.state.layerType || 'food'}
          items={layerTypeOptions}
          onChange={selected => this.triggerChange(selected, 'layerType')}
        /> */}

      </div>
    );
  }
}

Filters.propTypes = {
  // STORE
  filters: React.PropTypes.object,

  // ACTIONS
  setCurrentFilter: React.PropTypes.func
};


export default Filters;
