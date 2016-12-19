import React from 'react';
import Icon from 'components/ui/Icon';
import debounce from 'lodash/debounce';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerToggle = this.triggerToggle.bind(this);

    this.state = {
      opened: true
    };
  }

  componentDidMount() {
    this.props.setSidebarWidth(this.sidebarNode.offsetWidth);
    this.resizeEvent = () => {
      this.triggerResize();
    };
    window.addEventListener('resize', debounce(this.resizeEvent, 100));
  }

  /**
   * UI EVENTS
   * - triggerToggle
  */
  triggerToggle() {
    this.setState({
      opened: !this.state.opened
    }, () => {
      this.props.setSidebarWidth((this.state.opened) ? this.sidebarNode.offsetWidth : '50');
    });
  }

  triggerResize() {
    this.props.setSidebarWidth((this.state.opened) ? this.sidebarNode.offsetWidth : '50');
  }

  render() {
    const openedClass = (this.state.opened) ? '-opened' : '';

    return (
      <aside ref={(node) => { this.sidebarNode = node; }} className={`l-sidebar c-sidebar ${openedClass}`}>
        {/*
          Toggle button
          - I'm using a div instead of a button because I don't want that browser's styles interfere with it
        */}
        <div className={`l-sidebar-toggle btn-toggle ${openedClass}`} onClick={this.triggerToggle}>
          <Icon className="-medium" name="icon-arrow-left" />
        </div>

        <div className="sidebar-content">
          {this.props.children}
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  children: React.PropTypes.array,
  setSidebarWidth: React.PropTypes.func
};
