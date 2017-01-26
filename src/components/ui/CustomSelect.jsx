import React from 'react';

export default class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: props.options ? props.options.find(item => item.value === props.value) : null,
      closed: true
    };

    // Bindings
    this.toggle = this.toggle.bind(this);
    this.selectHandlerFn = this.selectHandlerFn.bind(this);
  }

  toggle() {
    this.setState(Object.assign({}, this.state, { closed: !this.state.closed }));
  }

  // Currying option select handler
  selectHandlerFn(item) {
    return () => {
      this.setState({
        selectedItem: item,
        closed: true
      });
      this.props.onValueChange && this.props.onValueChange(item);
    };
  }

  render() {
    // Class names
    const cNames = ['c-custom-select'];
    this.state.closed && cNames.push('-closed');
    this.props.className && cNames.push(this.props.className);

    return (
      <div className={cNames.join(' ')}>
        <span onClick={this.toggle}>{this.state.selectedItem ? this.state.selectedItem.label : this.props.placeHolder}</span>
        <ul className="custom-select-options">
          {this.props.options.map((item, index) => <li key={index} onClick={this.selectHandlerFn(item)}>{item.label}</li>)}
        </ul>
      </div>
    );
  }
}

CustomSelect.propTypes = {
  options: React.PropTypes.array,
  onValueChange: React.PropTypes.func,
  value: React.PropTypes.string,
  className: React.PropTypes.string,
  placeHolder: React.PropTypes.string
};
