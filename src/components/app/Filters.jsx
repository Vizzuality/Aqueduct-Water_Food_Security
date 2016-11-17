import React from 'react';
import { SimpleSelect } from 'react-selectize';

const options = [
  { value: 'one', label: 'La madre de los textos. Porque me gusta que cuando me lean entiendan perfectamente quien soy' },
  { value: 'two', label: 'Country' },
  { value: 'three', label: 'Sub-Catchment' }
];

const predictionOptions = [
  { value: 'optimistic', label: 'Optimistic View' },
  { value: 'pesimistic', label: 'Pesimistic View' }
];

class Filters extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      scope: null,
      layers: null,
      crop: null,
      prediction: 'optimistic'
    };

    // BINDINGS
    this.triggerChange = this.triggerChange.bind(this);
    this.triggerPredictionChange = this.triggerChange.bind(this);
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
      <div className="l-filters c-filters">
        <div className="c-filter-box">
          <SimpleSelect
            name="scope"
            placeholder="Select a contry"
            options={options}
            onValueChange={selected => this.triggerChange(selected, 'scope')}
            tether
          />
        </div>
        <div className="c-filter-box">
          <SimpleSelect
            name="layers"
            placeholder="Select a layer"
            options={options}
            onValueChange={selected => this.triggerChange(selected, 'scope')}
            // onOpenChange={() => { debugger;}}
            tether
          />
        </div>
        <div className="c-filter-box">
          <SimpleSelect
            name="crop"
            placeholder="Select a crop"
            options={options}
            onValueChange={selected => this.triggerChange(selected, 'crop')}
            tether
          />
        </div>
        <div className="c-filter-box">
          <SimpleSelect
            name="prediction"
            placeholder="Select a prediction"
            options={predictionOptions}
            onValueChange={selected => this.triggerChange(selected, 'prediction')}
            tether
          />
        </div>
        <div className="c-filter-box">
          <SimpleSelect
            name="baseline"
            placeholder="Select a baseline"
            options={options}
            onValueChange={selected => this.triggerChange(selected, 'baseline')}
            tether
          />
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
};


export default Filters;
