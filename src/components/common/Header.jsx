import React from 'react';
import { Link } from 'react-router';

// Components
import HeaderTools from './HeaderTools';
import HeaderSearch from './HeaderSearch';


class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: ''
    };

    // Set bindings
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
    return (
      <header className="c-header">
        <nav>
          {/* LEFT MENU */}
          <ul className="list">
            <li>
              <button data-active="tools" className={`c-header-button ${this.state.active === 'tools' && '-active'}`} onClick={this.onClickBtnAction}>
                <svg className="c-icon"><use xlinkHref="#icon-grid" /></svg>
                <span>Tools</span>
              </button>
            </li>
          </ul>

          {/* LOGO */}
          <h1 className="c-header-logo">
            <Link to="/">Logo</Link>
          </h1>

          {/* RIGHT MENU */}
          <ul className="list">
            <li>
              <HeaderSearch active={this.state.active === 'search'} />
              <button data-active="search" className={`c-header-button ${this.state.active === 'search' && '-active'}`} onClick={this.onClickBtnAction}>
                <svg className="c-icon"><use xlinkHref={`${this.state.active === 'search' ? '#icon-cross' : '#icon-search'}`} /></svg>
              </button>
            </li>
            <li>
              <button data-active="menu" className={`c-header-button ${this.state.active === 'menu' && '-active'}`} onClick={this.onClickBtnAction}>
                <svg className="c-icon"><use xlinkHref="#icon-menu" /></svg>
              </button>
            </li>
          </ul>
        </nav>

        <HeaderTools active={this.state.active === 'tools'} />
      </header>
    );
  }
}

export default Header;
