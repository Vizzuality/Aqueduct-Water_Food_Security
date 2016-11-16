import React from 'react';
import Select from 'react-select';
import RadioGroup from 'components/common/RadioGroup';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' }
];

const predictionItems = [
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
      <div className="c-filters">
        <div className="row collapse">
          <div className="column small-12 medium-6">
            <div className="c-filter-box">
              <h2>Explore water risk</h2>
              <Select
                name="scope"
                value={this.state.scope}
                options={options}
                onChange={selected => this.triggerChange(selected, 'scope')}
              />
              <Select
                name="layers"
                value={this.state.layers}
                options={options}
                onChange={selected => this.triggerChange(selected, 'layers')}
              />
              <Select
                name="crop"
                value={this.state.crop}
                options={options}
                onChange={selected => this.triggerChange(selected, 'crop')}
              />
            </div>
          </div>
          <div className="column small-12 medium-5 medium-offset-1">
            <div className="c-filter-box">
              <h2>Baseline</h2>
              <div>
                <RadioGroup
                  name="prediction"
                  defaultValue={this.state.prediction}
                  items={predictionItems}
                  onChange={selected => this.triggerChange(selected, 'prediction')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
};


export default Filters;
