import React from 'react';
import classnames from 'classnames';
import Filters from 'components/filters/Filters';
import { Icon } from 'aqueduct-components';

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
    const classNames = classnames({
      'c-mobile-filters': true,
      '-opened': this.state.opened,
      [this.props.className]: !!this.props.className
    });

    return (
      <div className={classNames}>
        <div className="mobile-filters-content">
          {this.props.children}
        </div>

        <button className="mobile-filters-btn" onClick={this.toggle}>
          <Icon name="icon-filters" className="-medium" />
          <span>Filters</span>
          <Icon name="icon-expand" className="-medium icon-toggle" />
        </button>

        <div className="mobile-filters-wrapper">
          {this.props.headingContent}
          <Filters {...this.props} />
        </div>
      </div>
    );
  }
}

MobileFilters.propTypes = {
  children: React.PropTypes.object,
  className: React.PropTypes.string,
  headingContent: React.PropTypes.object
};
