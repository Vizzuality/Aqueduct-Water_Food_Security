import React from 'react';
import PropTypes from 'prop-types';

// Components
import CompareItem from 'components/compare/CompareItem';
import { SegmentedUi } from 'aqueduct-components';

export default class CompareList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      context: 'data'
    };
  }

  getItems() {
    const items = [];
    const filters = Object.assign({}, this.props.filters, { country: this.props.countries[this.props.active] });
    items.push(
      <div key={this.props.active} className="comparelist-item">
        <CompareItem
          context={this.state.context}
          filters={filters}
          loading={this.props.loading}
          widgetsActive={this.props.widgetsActive}
          index={this.props.active}
          country={this.props.countries[this.props.active]}
          countryList={this.props.countryList}
          layersActive={this.props.layersActive}
        />
      </div>
    );
    return items;
  }

  render() {
    const pageContextOptions = [{ label: 'Data', value: 'data' }, { label: 'Map', value: 'map' }];
    return (
      <div className="c-comparelist">
        <div className="comparelist-content">
          <div className="mobile-btns-wrapper">
            <SegmentedUi
              className="-btns"
              items={pageContextOptions}
              selected={this.state.context}
              onChange={selected => this.setState({ context: selected.value })}
            />
          </div>
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
  widgetsActive: PropTypes.array,
  filters: PropTypes.object,
  layersActive: PropTypes.array,
  active: PropTypes.number
};
