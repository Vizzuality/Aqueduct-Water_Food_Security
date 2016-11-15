import React from 'react';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.onClickToggle = this.onClickToggle.bind(this);

    this.state = {
      opened: true
    };
  }

  /**
   * UI EVENTS
   * - onClickToggle
  */
  onClickToggle() {
    this.setState({
      opened: !this.state.opened
    });
  }

  render() {
    const openedClass = (this.state.opened) ? '-opened' : '';
    return (
      <div className={`l-sidebar c-sidebar ${openedClass}`}>
        <div className={`btn-toggle c-btn-icon -primary ${openedClass}`} onClick={this.onClickToggle}>
          <svg className="c-icon -big"><use xlinkHref="#icon-cross" /></svg>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
};


export default Sidebar;
