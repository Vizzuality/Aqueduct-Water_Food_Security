import React from 'react';

// Components
import CompareItem from 'components/compare/CompareItem';

export default class CompareList extends React.Component {

  getItems() {
    const items = [];
    for (let i = 0; i < this.props.items; i += 1) {
      items.push(
        <div key={i} className="small-6">
          <CompareItem
            filters={this.props.filters}
            loading={this.props.loading}
            widgetsActive={this.props.widgetsActive}
            index={i}
            country={this.props.countries[i]}
            countryList={this.props.countryList}
            layersActive={this.props.layersActive}
          />
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
  countryList: React.PropTypes.array,
  loading: React.PropTypes.bool,
  items: React.PropTypes.number,
  widgetsActive: React.PropTypes.array,
  filters: React.PropTypes.object,
  layersActive: React.PropTypes.array
};
