import React from 'react';

// Components
import CompareItem from 'components/compare/CompareItem';

export default class CompareList extends React.Component {

  getItems() {
    const items = [];
    for (let i = 0; i < this.props.items; i += 1) {
      const country = this.props.countries[i];
      const filters = Object.assign({}, this.props.filters, country);
      items.push(
        <div key={i} className="comparelist-item small-6">
          <CompareItem
            filters={filters}
            loading={this.props.loading}
            widgetsActive={this.props.widgetsActive}
            index={i}
            country={country}
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
