import React from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';

import Widget from 'components/widgets/Widget';
import { Spinner } from 'aqueduct-components';

export default class CompareWidgetList extends React.Component {
  render() {
    const { widgetsActive } = this.props;
    const items = Array.from(Array(this.props.items));

    return (
      <div className="c-compareitem-widgets">
        {widgetsActive.map((widget, index) => {
          return (
            <div key={`${widget.id}-${index}`} className="c-compareitem-row">
              {items.map((item, i) => {
                const country = this.props.countries[i];

                const filters = Object.assign({}, this.props.filters, {
                  country,
                  countryName: ((this.props.countryList || []).find(c => c.id === this.props.countries[i]) || {}).name
                });

                return (
                  <div key={`${widget.id}-${i}`} className="compareitem-column">
                    <div className="column small-12">
                      <Widget widget={widget} filters={filters} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

CompareWidgetList.propTypes = {
  grid: React.PropTypes.string,
  // STORE
  loading: React.PropTypes.bool,
  filters: React.PropTypes.object,
  // SELECTOR
  widgetsActive: React.PropTypes.array
};
