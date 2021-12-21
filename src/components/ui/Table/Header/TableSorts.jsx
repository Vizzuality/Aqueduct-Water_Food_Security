import React from 'react';
import PropTypes from 'prop-types';
import TetherComponent from 'react-tether';
import { Icon } from 'aqueduct-components';

export default class TableFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closed: true,
      sort: 1
    };

    // Bindings
    this.onToggle = this.onToggle.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onScreenClick);
  }

  /**
   * UI EVENTS
   * - onToggle
   * - onScreenClick
  */
  onToggle() {
    const { closed } = this.state;

    // requestAnimationFrame
    //   - Goal: Prevent double trigger at first atempt
    //   - Issue: When you add the listener the click event is not finished yet so it will trigger onScrennClick
    //   - Stop propagation?: if I put e.stopPropagation clicking on another filter btn won't trigger the screenClick,
    //                        so we will have 2 dropdown filters at the same time
    requestAnimationFrame(() => window[closed ? 'addEventListener' : 'removeEventListener']('click', this.onScreenClick));
    this.setState({ closed: !closed });
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-table-tooltip');
    const clickOutside = el && el.contains && !el.contains(e.target);

    if (clickOutside) {
      this.onToggle();
    }
  }

  render() {
    return (
      <div>
        <TetherComponent
          attachment="top center"
          constraints={[{
            to: 'scrollParent'
          }]}
          classes={{
            element: 'c-table-tooltip'
          }}
        >
          {/* First child: This is what the item will be tethered to */}
          <button
            ref={node => this.btnToggle = node}
            onClick={this.onToggle}
            className="table-header-btn"
          >
            <Icon name="icon-sort" className="-small" />
          </button>

          {/* Second child: If present, this item will be tethered to the the first child */}
          {!this.state.closed &&
            <div className="tooltip-content">
              <div className="content">
                <ul>
                  <li>
                    <button onClick={() => this.props.onSort && this.props.onSort({ field: this.props.field, value: 1 })}>
                      Ascending
                    </button>
                  </li>
                  <li>
                    <button onClick={() => this.props.onSort && this.props.onSort({ field: this.props.field, value: -1 })}>
                      Descending
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          }
        </TetherComponent>
      </div>
    );
  }
}

TableFilters.propTypes = {
  field: PropTypes.string.isRequired,
  onSort: PropTypes.func
};

TableFilters.defaultProps = {
  onChange: null,
  selected: null
};
