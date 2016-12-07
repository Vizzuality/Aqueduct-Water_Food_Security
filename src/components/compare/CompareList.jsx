import React from 'react';

// Components
import CompareItem from 'containers/compare/CompareItem';

export default class CompareList extends React.Component {

  getItems() {
    const items = [];
    for (let i = 0; i < this.props.items; i += 1) {
      items.push(
        <div key={i} className="small-6">
          <CompareItem country={this.props.countries[i]} datasets={this.props.datasets} index={i} />
        </div>
      );
    }
    return items;
  }

  render() {
    return (
      <div className="c-comparelist">
        <div className="comparelist-content">
          <div className="row expanded">
            {this.getItems()}
          </div>
        </div>
      </div>
    );
  }
}

CompareList.propTypes = {
  countries: React.PropTypes.array,
  datasets: React.PropTypes.object,
  items: React.PropTypes.number
};
