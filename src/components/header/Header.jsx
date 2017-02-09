import React from 'react';
import OnlyOn from 'components/ui/Responsive';
import { Link } from 'react-router';
import { Icon } from 'aqueduct-components';

// Components
import HeaderTools from './HeaderTools';

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: ''
    };

    // BINDINGS
    this.onClickBtnAction = this.onClickBtnAction.bind(this);
  }

  /**
   * UI EVENTS
   * - onClickBtnAction
  */
  onClickBtnAction(e) {
    const current = e.currentTarget.dataset.active;

    this.setState({
      active: (current !== this.state.active) ? current : ''
    });
  }

  render() {
    const desktopNav = (
      <nav role="navigation">
        {/* RIGHT MENU */}
        <ul className="list">
          <li>
            <button data-active="tools" className={`c-header-button ${this.state.active === 'tools' && '-active'}`} onClick={this.onClickBtnAction}>
              <span>Tools</span>
            </button>
          </li>
          <li>
            <Link className="c-header-button" to="/how-to">How to </Link>
          </li>
          <li>
            <Link className="c-header-button" to="/resource-library">Resource Library </Link>
          </li>
          <li>
            <Link className="c-header-button" to="/about">About us </Link>
          </li>
          <li>
            <Link className="c-header-button" to="/get-involved">Get involved </Link>
          </li>
          <li>
            <Link className="c-header-button" to="/search">
              <Icon name="icon-search" />
            </Link>
          </li>
        </ul>
      </nav>
    );

    return (
      <header role="banner" className="l-header c-header">
        {/* LOGO */}
        <h1 className="c-header-logo">
          <Link to="/">Logo</Link>
        </h1>
        <OnlyOn device="desktop">
          {desktopNav}
        </OnlyOn>
        <OnlyOn device="desktop">
          <HeaderTools active={this.state.active === 'tools'} />
        </OnlyOn>

      </header>
    );
  }
}
