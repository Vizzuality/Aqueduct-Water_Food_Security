import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' }
];

class Filters extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      scope: null,
      layers: null,
      crop: null
    };

    // BINDINGS
    this.triggerSelectChange = this.triggerSelectChange.bind(this);
  }

  /**
   * UI EVENTS
   * - triggerSelectChange
   */
  triggerSelectChange(selected, name) {
    this.setState({
      [name]: (selected) ? selected.value : null
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
                onChange={selected => this.triggerSelectChange(selected, 'scope')}
              />
              <Select
                name="layers"
                value={this.state.layers}
                options={options}
                onChange={selected => this.triggerSelectChange(selected, 'layers')}
              />
              <Select
                name="crop"
                value={this.state.crop}
                options={options}
                onChange={selected => this.triggerSelectChange(selected, 'crop')}
              />
            </div>
          </div>
          <div className="column small-12 medium-5 medium-offset-1">
            <div className="c-filter-box">
              <h2>Baseline</h2>
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
