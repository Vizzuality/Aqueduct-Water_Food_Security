import React from 'react';

// Components
import CompareList from 'components/compare/CompareList';
import Filters from 'components/filters/Filters';

export default class ComparePage extends React.Component {
  render() {
    return (
      <div>
        <Filters filters={this.props.compare.filters} setFilters={this.props.setFilters} />
        <CompareList countries={this.props.compare.countries} datasets={this.props.datasets} items={2} />
      </div>
    );
  }
}

ComparePage.propTypes = {
  compare: React.PropTypes.object,
  datasets: React.PropTypes.object
};
