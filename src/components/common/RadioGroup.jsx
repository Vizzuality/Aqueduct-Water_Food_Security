import React from 'react';

import Radio from 'components/common/Radio';

class RadioGroup extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.onChange = this.onChange.bind(this);
  }

  /**
   * UI EVENTS
   * - onChange
  */
  onChange(newSelected) {
    // Send object
    const selectedObj = this.props.items.find(item => item.value === newSelected);
    this.props.onChange(selectedObj);
  }

  render() {
    const { name, items, selected } = this.props;

    return (
      <div className={`c-radio-box ${this.props.className}`}>
        {items.map((item, i) => {
          return (<Radio
            key={i}
            name={name}
            value={item.value}
            selected={selected}
            label={item.label}
            onChange={newSelected => this.onChange(newSelected)}
          />);
        })}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  name: React.PropTypes.string,
  selected: React.PropTypes.string,
  className: React.PropTypes.string,
  items: React.PropTypes.array,
  onChange: React.PropTypes.func
};

export default RadioGroup;
