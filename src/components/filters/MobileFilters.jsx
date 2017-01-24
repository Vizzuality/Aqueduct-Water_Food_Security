import React from 'react';
import Filters from 'components/filters/Filters';

export default class MobileFilters extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };

    // Bindings
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      opened: !this.state.opened
    });
  }

  render() {
    const cNames = ['c-mobile-filters'];
    this.state.opened && cNames.push('-opened');
    return (
      <div className={cNames.join(' ')}>
        <button className="mobile-filters-btn" onClick={this.toggle}>Filters</button>
        <Filters withScope {...this.props} />
      </div>
    );
  }
}
