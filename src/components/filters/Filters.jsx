import React from 'react';
import FiltersTabs from 'components/filters/FiltersTabs';
import FiltersTabsContent from 'components/filters/FiltersTabsContent';

class Filters extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerChange = this.triggerChange.bind(this);
    this.triggerChangeScope = this.triggerChangeScope.bind(this);
  }

  triggerChange(newFilters) {
    this.props.setFilters(newFilters);
  }

  triggerChangeScope(scope) {
    this.props.setScopeFilter(scope);
  }

  render() {
    return (
      <div className="c-filters">
        <FiltersTabs triggerChangeScope={this.triggerChangeScope} scope={this.props.filters.scope} />
        <FiltersTabsContent triggerChange={this.triggerChange} filters={this.props.filters} datasets={this.props.datasets} />
      </div>
    );
  }
}

Filters.propTypes = {
  // STORE
  filters: React.PropTypes.object,
  datasets: React.PropTypes.object,

  // ACTIONS
  setFilters: React.PropTypes.func,
  setScopeFilter: React.PropTypes.func
};


export default Filters;
