import React from 'react';

import Radio from 'components/common/Radio';

class RadioGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: props.defaultValue
    };

    // BINDINGS
    this.onChange = this.onChange.bind(this);
  }

  /**
   * UI EVENTS
   * - onChange
  */
  onChange(newSelected) {
    this.setState({
      selected: newSelected
    });

    // Send object
    const selectedObj = this.props.items.find(item => item.value === newSelected);
    this.props.onChange(selectedObj);
  }

  render() {
    const { name, items } = this.props;
    const { selected } = this.state;

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
  defaultValue: React.PropTypes.string,
  className: React.PropTypes.string,
  items: React.PropTypes.array,
  onChange: React.PropTypes.func
};

export default RadioGroup;
