import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Filters from 'components/filters';
import { Icon } from 'aqueduct-components';

class MobileFilters extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { opened: false };

    // Bindings
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { opened } = this.state;
    this.setState({ opened: !opened });
  }

  render() {
    const { className, children, headingContent } = this.props;
    const { opened } = this.state;
    const classNames = classnames('c-mobile-filters', {
      '-opened': opened,
      [className]: !!className
    });

    return (
      <div className={classNames}>
        <div className="mobile-filters-content">
          {children}
        </div>

        <button
          type="button"
          className="mobile-filters-btn"
          onClick={this.toggle}
        >
          <Icon name="icon-filters" className="-medium" />
          <span>Filters</span>
          <Icon name="icon-expand" className="-medium icon-toggle" />
        </button>

        <div className="mobile-filters-wrapper">
          {headingContent}
          <Filters {...this.props} />
        </div>
      </div>
    );
  }
}

MobileFilters.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
  headingContent: PropTypes.object.isRequired
};

MobileFilters.defaultProps = { className: null };

export default MobileFilters;
