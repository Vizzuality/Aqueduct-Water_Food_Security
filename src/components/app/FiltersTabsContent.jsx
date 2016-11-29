import React from 'react';

import RadioGroup from 'components/ui/RadioGroup';
import Switch from 'components/ui/Switch';
import FiltersLayers from 'components/app/FiltersLayers';
import CountriesSelect from 'components/app/CountriesSelect';
import countryList from 'data/countries';

const predictionOptions = [
  { value: 'optimistic', label: 'Optimistic' },
  { value: 'pesimistic', label: 'Pesimistic' },
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
    const newFilters = Object.assign({}, this.props.filters[this.props.filters.scope], {
      [name]: selected.value
    });

    this.props.triggerChange(newFilters);
  }

  render() {
    // Filters
    const current = this.props.filters.scope;
    const currentFilters = this.props.filters[this.props.filters.scope];

    // Select default value
    const countrySelected = countryList.find(x => x.value === currentFilters.iso);

    return (
      <div className="c-filters-tabs-content">
        {(current === 'country') ?
          <div className="filters-section">
            <CountriesSelect
              value={countrySelected}
              onValueChange={(selected) => {
                this.triggerChange(selected || { value: null }, 'iso');
              }}
            />
          </div>
        : null }
        {(current === 'subcatchment') ?
          <div className="filters-section">
            Select a subcatchment
          </div>
        : null }
        <div className="filters-section">
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
        <div className="filters-section">
          <FiltersLayers
            filters={this.props.filters}
            datasets={this.props.datasets}
            onChange={selected => this.triggerChange(selected, 'datasetsIds')}
          />
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  filters: React.PropTypes.object,
  datasets: React.PropTypes.object,
  triggerChange: React.PropTypes.func
};


export default Filters;
