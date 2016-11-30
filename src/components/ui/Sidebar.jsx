import React from 'react';
import Icon from 'components/ui/Icon';

// Components
import Filters from 'containers/filters/Filters';
import WidgetList from 'containers/widgets/WidgetList';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerToggle = this.triggerToggle.bind(this);

    this.state = {
      opened: true
    };
  }

  /**
   * UI EVENTS
   * - triggerToggle
  */
  triggerToggle() {
    this.setState({
      opened: !this.state.opened
    });
  }

  render() {
    const openedClass = (this.state.opened) ? '-opened' : '';

    return (
      <div className={`l-sidebar c-sidebar ${openedClass}`}>
        {/*
          Toggle button
          - I'm using a div instead of a button because I don't want that browser's styles interfere with it
        */}
        <div className={`l-sidebar-toggle btn-toggle ${openedClass}`} onClick={this.triggerToggle}>
          <Icon className="-medium" name="icon-arrow-left" />
        </div>

        {/* Filters */}
        <div className="l-filters">
          <Filters />
        </div>

        {/* Widget List */}
        <div className="l-sidebar-content">
          <WidgetList />
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
};
