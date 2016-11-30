import React from 'react';

const scopeOptions = [
  { value: 'global', label: 'Global' },
  { value: 'country', label: 'Country' },
  { value: 'subcatchment', label: 'Sub-Catchment' }
];


class FiltersTabs extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerChange = this.triggerChange.bind(this);
  }

  /**
   * UI EVENTS
   * - triggerChange
   */
  triggerChange(e) {
    const scope = e.currentTarget.dataset.scope;
    this.props.triggerChangeScope(scope);
  }

  render() {
    return (
      <div className="c-filters-tabs">
        <ul>
          {scopeOptions.map((scope, i) => {
            const activeClass = (scope.value === this.props.scope) ? '-active' : '';
            return (
              <li
                key={i}
                data-scope={scope.value}
                onClick={this.triggerChange}
                className={`tab-item ${activeClass}`}
              >
                {scope.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

FiltersTabs.propTypes = {
  scope: React.PropTypes.string,
  triggerChangeScope: React.PropTypes.func
};


export default FiltersTabs;
