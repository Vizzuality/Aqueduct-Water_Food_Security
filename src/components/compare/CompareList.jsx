import React from 'react';
import PropTypes from 'prop-types';

// Components
import CompareItem from 'components/compare/CompareItem';

export default class CompareList extends React.Component {

  getItems() {
    const items = [];
    for (let i = 0; i < this.props.items; i += 1) {
      const filters = Object.assign({}, this.props.filters, { country: this.props.countries[i] });
      items.push(
        <CompareItem
          key={`${this.props.countries[i]}-${i}`}
          filters={filters}
          loading={this.props.loading}
          widgetsActive={this.props.widgetsActive}
          index={i}
          country={this.props.countries[i]}
          countryList={this.props.countryList}
          layersActive={this.props.layersActive}
        />
      );
    }
    return items;
  }

  render() {
    return (
      <div className="c-comparelist">
        <div className="comparelist-content">
          {this.getItems()}
        </div>
      </div>
    );
  }
}

CompareList.propTypes = {
  countries: PropTypes.array,
  countryList: PropTypes.array,
  loading: PropTypes.bool,
  items: PropTypes.number,
  widgetsActive: PropTypes.array,
  filters: PropTypes.object,
  layersActive: PropTypes.array,
  active: PropTypes.number
};
