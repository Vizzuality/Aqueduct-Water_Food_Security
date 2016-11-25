import React from 'react';
import RadioGroup from 'components/ui/RadioGroup';
import Switch from 'components/ui/Switch';

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

    this.state = {
      scope: null,
      layerType: null,
      crop: null,
      prediction: 'optimistic'
    };

    // BINDINGS
    this.triggerChange = this.triggerChange.bind(this);
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

  render() {
    return (
      <div className="c-filters">
        <RadioGroup
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
        />

      </div>
    );
  }
}

Filters.propTypes = {
};


export default Filters;
