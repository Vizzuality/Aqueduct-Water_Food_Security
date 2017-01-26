import React from 'react';
import isEqual from 'lodash/isEqual';

export default class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: props.options ? props.options.find(item => item.value === props.value) : null,
      closed: true,
      filteredOptions: props.options || []
    };

    // Bindings
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.onType = this.onType.bind(this);
    this.onEnterSearch = this.onEnterSearch.bind(this);
  }

  componentWillReceiveProps({ options, value }) {
    if (!isEqual(this.props.options, options)) {
      this.setState(Object.assign({}, this.state, { filteredOptions: options }));
    }
    if (this.props.value !== value) {
      this.setState(Object.assign({}, this.state, { selectedItem: this.props.options.find(item => item.value === value) }));
    }
  }

  // Event handler for event keyup on search input
  onType(evt) {
    const value = evt.currentTarget.value;
    const filteredOptions = this.props.options.filter(item => item.label.toLowerCase().match(value.toLowerCase()));
    this.setState(Object.assign({}, this.state, {
      filteredOptions
    }));

    // TODO: select item with enter key
    // TODO: navigate through items with arrow keys
    // if (evt.keyCode === 13) {
    //   const item = this.state.filteredOptions.find(i => i.label === this.input.value);
    //   if (item) {
    //     this.selectItem(item);
    //   }
    // }
  }

  // Event handler for enter event on search input
  onEnterSearch() {
    this.setState(Object.assign({}, this.state, {
      closed: false
    }));
  }

  // Event handler for mouseup event on options list item
  selectItem(item) {
    this.setState({ selectedItem: item });
    this.close();
    this.props.onValueChange && this.props.onValueChange(item);
  }

  // Method than shows the option list
  open() {
    // Close select when clicking outside it
    const self = this;
    window.addEventListener('click', function onScreenClick(evt) {
      if (!self.el.contains(evt.target)) {
        self.close();
        window.removeEventListener('click', onScreenClick);
      }
    });

    this.setState(Object.assign({}, this.state, { closed: false }), () => {
      this.input && this.input.focus();
    });
  }

  // Method that closes the options list
  close() {
    // NOTE: Without setTimeout function, state never mutates to closed: true. Bug?
    setTimeout(() => {
      this.setState(Object.assign({}, this.state, {
        closed: true,
        filteredOptions: this.props.options
      }));
      if (this.input) {
        this.input.value = '';
      }
    }, 0);
  }

  render() {
    // Class names
    const cNames = ['c-custom-select'];
    this.props.className && cNames.push(this.props.className);
    this.props.search && cNames.push('-search');
    this.state.closed && cNames.push('-closed');

    return (
      <div ref={(node) => { this.el = node; }} className={cNames.join(' ')}>
        <span className="custom-select-text" onClick={this.open}>
          <span>{this.state.selectedItem ? this.state.selectedItem.label : this.props.placeholder}</span>
          {this.props.search &&
            <input
              ref={(node) => { this.input = node; }}
              className="custom-select-search"
              type="search"
              onBlur={this.close}
              onFocus={this.onEnterSearch}
              onKeyUp={this.onType}
            />
          }
        </span>
        {this.state.closed ||
          <ul className="custom-select-options">
            {this.state.filteredOptions.map((item, index) => <li key={index} onMouseDown={() => this.selectItem(item)}>{item.label}</li>)}
          </ul>
        }
      </div>
    );
  }
}

CustomSelect.propTypes = {
  options: React.PropTypes.array,
  onValueChange: React.PropTypes.func,
  value: React.PropTypes.string,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  search: React.PropTypes.bool
};
