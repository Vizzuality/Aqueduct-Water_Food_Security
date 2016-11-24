import React from 'react';
import FiltersTabs from 'components/app/FiltersTabs';
import FiltersTabsContent from 'components/app/FiltersTabsContent';

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
    this.props.setCurrentFilter(scope);
  }

  render() {
    return (
      <div className="c-filters">
        <FiltersTabs triggerChangeScope={this.triggerChangeScope} scope={this.props.filters.current} />
        <FiltersTabsContent triggerChange={this.triggerChange} filters={this.props.filters} />
      </div>
    );
  }
}

Filters.propTypes = {
  // STORE
  filters: React.PropTypes.object,

  // ACTIONS
  setFilters: React.PropTypes.func,
  setCurrentFilter: React.PropTypes.func
};


export default Filters;
