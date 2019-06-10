import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';

import Widget from 'components/widgets/widget';
import { Spinner } from 'aqueduct-components';

export default class CompareWidgetList extends React.Component {
  render() {
    const { widgetsActive } = this.props;
    const items = Array.from(Array(this.props.items));
    const compareWarningList = [
      '88aefca0-e25c-4a16-80b3-f2831d2064e4',
      'd654b935-31cd-4971-877e-bf0345c8b49a',
      '636d41ed-620b-4da9-8796-e5783347fc10'
    ];

    return (
      <div className="c-compareitem-widgets">
        {widgetsActive.map((widget, index) => {
          return (
            <div key={`${widget.id}-${index}`} className="c-compareitem-row">
              {items.map((item, i) => {
                const country = this.props.countries[i];

                if (!country) {
                  return null;
                }

                const filters = Object.assign({}, this.props.filters, {
                  country,
                  countryName: ((this.props.countryList || []).find(c => c.id === this.props.countries[i]) || {}).name
                });

                return (
                  <div key={`${widget.id}-${i}`} className="compareitem-column">
                    <div className="column small-12">
                      <Widget
                        widget={widget}
                        filters={filters}
                        warning={compareWarningList.includes(widget.id) &&
                          <p><i>Note: Y-Axis scales could be different between countries</i></p>
                        }
                      />
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
  grid: PropTypes.string,
  // STORE
  loading: PropTypes.bool,
  filters: PropTypes.object,
  // SELECTOR
  widgetsActive: PropTypes.array
};
