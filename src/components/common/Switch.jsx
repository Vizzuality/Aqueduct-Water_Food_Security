import React from 'react';

class Switch extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  /**
   * UI EVENTS
   * - onChange
   * - onToggle
  */
  onChange(e) {
    // Send object
    const selectedObj = this.props.items.find(item => item.value === e.currentTarget.dataset.value);
    this.props.onChange(selectedObj);
  }

  onToggle(e) {
    // Send object
    const selectedObj = this.props.items.find(item => item.value !== this.props.value);
    this.props.onChange(selectedObj);
  }

  render() {
    const { value, items } = this.props;
    const position = (value === items[0].value) ? '-left' : '-right';

    return (
      <div className="c-switch">
        <span
          className={`switch-label ${(value === items[0].value) ? '-selected' : ''}`}
          data-value={items[0].value}
          onClick={this.onChange}
        >
          {items[0].label}
        </span>

        <span
          className={`switch-element ${position}`}
          onClick={this.onToggle}
        >
          <span />
        </span>

        <span
          className={`switch-label ${(value === items[1].value) ? '-selected' : ''}`}
          data-value={items[1].value}
          onClick={this.onChange}
        >
          {items[1].label}
        </span>
      </div>
    );
  }
}

Switch.propTypes = {
  value: React.PropTypes.string,
  items: React.PropTypes.array.isRequired, // It should be an array of 2 elements
  onChange: React.PropTypes.func
};

export default Switch;
