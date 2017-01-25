import React from 'react';
import Filters from 'components/filters/Filters';
import Icon from 'components/ui/Icon';

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
    this.props.className && cNames.push(this.props.className);
    this.state.opened && cNames.push('-opened');
    return (
      <div className={cNames.join(' ')}>
        {this.props.children}
        <button className="mobile-filters-btn" onClick={this.toggle}>
          <Icon name="icon-filters" className="-medium" />
          <span>Filters</span>
          <Icon name="icon-expand" className="-medium icon-toggle" />
        </button>
        <Filters {...this.props} />
      </div>
    );
  }
}

MobileFilters.propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.string
};
