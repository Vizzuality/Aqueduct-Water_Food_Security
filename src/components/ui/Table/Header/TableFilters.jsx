import React from 'react';
import PropTypes from 'prop-types';
import TetherComponent from 'react-tether';
import classnames from 'classnames';

import { CheckboxGroup, Icon } from 'aqueduct-components';

export default class TableFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closed: true,
      input: '',
      sort: 1,
      values: props.values,
      selected: props.selected
    };

    // Bindings
    this.onToggle = this.onToggle.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onResetInput = this.onResetInput.bind(this);

    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.onFilterSelectAll = this.onFilterSelectAll.bind(this);
    this.onFilterClear = this.onFilterClear.bind(this);
  }

  /* Component lifecycle */
  componentWillReceiveProps(nextProps) {
    const selected = (nextProps.selected) ? nextProps.selected : nextProps.values;
    this.setState({
      selected,
      values: nextProps.values
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onScreenClick);
  }

  /**
   * UI EVENTS
   * - onToggle
   * - onScreenClick
   *
   * - onChangeInput
   * - onResetInput
   *
   * - onFilterSelect
   * - onFilterSelectAll
   * - onFilterClear
  */
  onToggle() {
    const { closed } = this.state;

    // requestAnimationFrame
    //   - Goal: Prevent double trigger at first atempt
    //   - Issue: When you add the listener the click event is not finished yet so it will trigger onScrennClick
    //   - Stop propagation?: if I put e.stopPropagation clicking on another filter btn won't trigger the screenClick,
    //                        so we will have 2 dropdown filters at the same time
    requestAnimationFrame(() => window[closed ? 'addEventListener' : 'removeEventListener']('click', this.onScreenClick));

    this.setState({ closed: !closed, input: '' });
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-table-tooltip');
    const clickOutside = el && el.contains && !el.contains(e.target);

    if (clickOutside) {
      this.onToggle();
    }
  }

  onChangeInput() {
    this.setState({
      input: this.input.value
    });
  }

  onResetInput(e) {
    // As we are using svg symbols, if you click on one it will consider that it's outside the dropdown
    // That's why I put this
    e && e.stopPropagation();

    this.setState({
      input: ''
    });
  }

  onFilterSelect(selected) {
    this.setState({ selected }, () => {
      const { values } = this.state;
      this.props.onFilter && this.props.onFilter({
        field: this.props.field,
        value: (selected.length !== values.length) ? selected : null
      });
    });
  }

  onFilterSelectAll() {
    this.setState({ selected: null }, () => {
      this.props.onFilter && this.props.onFilter({
        field: this.props.field,
        value: this.state.selected
      });
    });
  }

  onFilterClear() {
    this.setState({ selected: [] }, () => {
      this.props.onFilter && this.props.onFilter({
        field: this.props.field,
        value: this.state.selected
      });
    });
  }

  /**
   * HELPERS
   * - getFilteredValues
  */
  getFilteredValues() {
    const { values, input } = this.state;

    const filteredValues = values.filter((val) => {
      if (input) {
        return !!val.toString().toLowerCase().match(input.toString().toLowerCase());
      }
      return true;
    });

    return filteredValues.map(v => ({ label: v, value: v }));
  }

  render() {
    const { field } = this.props;
    const { selected, input, values } = this.state;

    const btnClass = classnames('table-header-btn', {
      '-active': values && selected && values.length !== selected.length
    });

    return (
      <div>
        <TetherComponent
          attachment="top center"
          constraints={[{
            to: 'scrollParent'
          }]}
          classes={{
            element: 'c-table-tooltip -footer'
          }}
        >
          {/* First child: This is what the item will be tethered to */}
          <button
            ref={node => this.btnToggle = node}
            onClick={this.onToggle}
            className={btnClass}
          >
            <Icon name="icon-filter" className="-small" />
          </button>

          {/* Second child: If present, this item will be tethered to the the first child */}
          {!this.state.closed &&
            <div className="tooltip-content">
              <div className="content">
                <div className="search-box">
                  <input
                    ref={node => this.input = node}
                    type="text"
                    value={input}
                    placeholder="Type search"
                    onChange={this.onChangeInput}
                  />
                  {!input &&
                    <button className="-search">
                      <Icon name="icon-search" className="-small" />
                    </button>
                  }

                  {!!input &&
                    <button
                      className="-close"
                      onClick={this.onResetInput}
                    >
                      <Icon name="icon-cross" className="-small" />
                    </button>
                  }
                </div>
                <CheckboxGroup
                  name={`${field}-checkbox-group`}
                  items={this.getFilteredValues()}
                  selected={selected || values}
                  onChange={this.onFilterSelect}
                />
                {/* <ul>
                  <li>
                    <button onClick={() => this.props.onSort && this.props.onSort({ field: this.props.field, value: -1 })}>
                      DESC
                    </button>
                  </li>
                  <li>
                    <button onClick={() => this.props.onSort && this.props.onSort({ field: this.props.field, value: 1 })}>
                      ASC
                    </button>
                  </li>
                </ul> */}
              </div>
              <div className="footer">
                <ul>
                  <li>
                    <button onClick={this.onFilterSelectAll}>
                      Select all
                    </button>
                  </li>
                  <li>
                    <button onClick={this.onFilterClear}>
                      Clear
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
  values: PropTypes.array,
  selected: PropTypes.array,
  onFilter: PropTypes.func
};

TableFilters.defaultProps = {
  onChange: null,
  selected: null,
  values: []
};
