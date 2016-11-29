import React from 'react';

// Components
import CompareItem from 'components/compare/CompareItem';

export default class CompareList extends React.Component {

  getItems() {
    const items = [];
    for (let i = 0; i < this.props.items; i += 1) {
      items.push(<CompareItem key={i} country={this.props.countries[i]} />);
    }
    return items;
  }

  render() {
    return (
      <div className="c-comparelist">
        <div className="comparelist-header">
          <span>Back</span>
        </div>
        <div className="comparelist-content">
          {this.getItems()}
        </div>
      </div>
    );
  }
}

CompareList.propTypes = {
  countries: React.PropTypes.array,
  items: React.PropTypes.number
};
