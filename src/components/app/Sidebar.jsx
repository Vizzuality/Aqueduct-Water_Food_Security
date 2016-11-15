import React from 'react';

// Components
import Filters from 'components/app/Filters';

class Sidebar extends React.Component {

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
        {/* Toggle button */}
        <div className={`btn-toggle ${openedClass}`} onClick={this.triggerToggle}>
          <svg className="c-icon -big"><use xlinkHref="#icon-cross" /></svg>
        </div>

        {/* Filters */}
        <Filters />
        
        {/* WidgetList */}
      </div>
    );
  }
}

Sidebar.propTypes = {
};


export default Sidebar;
