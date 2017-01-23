import React from 'react';
import Icon from 'components/ui/Icon';
import debounce from 'lodash/debounce';
import ShareModal from 'containers/modal/ShareModal';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerToggle = this.triggerToggle.bind(this);
    this.toggleShareModal = this.toggleShareModal.bind(this);

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

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }

  /**
   * UI EVENTS
   * - triggerToggle
  */
  triggerToggle() {
    this.sidebarNode && this.setState({
      opened: !this.state.opened
    }, () => {
      this.props.setSidebarWidth((this.state.opened) ? this.sidebarNode.offsetWidth : '50');
    });
  }

  triggerResize() {
    this.sidebarNode && this.props.setSidebarWidth((this.state.opened) ? this.sidebarNode.offsetWidth : '50');
  }

  toggleShareModal() {
    this.props.toggleModal(true, {
      children: ShareModal
    });
  }

  render() {
    const openedClass = (this.state.opened) ? '-opened' : '';

    return (
      <aside ref={(node) => { this.sidebarNode = node; }} className={`l-sidebar c-sidebar ${openedClass}`}>
        {/*
          Toggle button
          - I'm using a div instead of a button because I don't want that browser's styles interfere with it
        */}
        <button type="button" className="c-btn -white -with-icon btn-share" onClick={this.toggleShareModal}>
          <Icon className="-medium" name="icon-share" />
          Share
        </button>

        <button type="button" className={`l-sidebar-toggle btn-toggle ${openedClass}`} onClick={this.triggerToggle}>

          { this.state.opened &&
            <Icon className="-medium" name="icon-cross" />
          }
          { !this.state.opened &&
            <Icon className="-medium" name="icon-arrow-right" />
          }
        </button>

        <div className="l-sidebar-content">
          {this.props.children}
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  children: React.PropTypes.array,
  setSidebarWidth: React.PropTypes.func,
  toggleModal: React.PropTypes.func
};
