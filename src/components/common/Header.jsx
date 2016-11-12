import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      toggleTools: false,
      toggleSearch: false,
      toggleMenu: false
    };

    // Set bindings
    this.onClickBtnTools = this.onClickBtnTools.bind(this);
    this.onClickBtnSearch = this.onClickBtnSearch.bind(this);
    this.onClickBtnMenu = this.onClickBtnMenu.bind(this);
  }

  /**
   * UI EVENTS
   * - onClickBtnTools
   * - onClickBtnSearch
   * - onClickBtnMenu
  */
  onClickBtnTools() {
    this.setState({ toggleTools: !this.state.toggleTools });
  }

  onClickBtnSearch() {
    this.setState({ toggleSearch: !this.state.toggleSearch });
  }

  onClickBtnMenu() {
    this.setState({ toggleMenu: !this.state.toggleMenu });
  }

  render() {
    return (
      <header className="c-header">
        <nav>
          <ul className="list">
            <li>
              <button className={`c-header-button ${this.state.toggleTools && '-active'}`} onClick={this.onClickBtnTools}>
                <svg className="c-icon"><use xlinkHref="#icon-grid" /></svg>
                <span>Tools</span>
              </button>
            </li>
          </ul>

          <h1 className="c-header-logo">
            <Link to="/">Logo</Link>
          </h1>

          <ul className="list">
            <li>
              <button className={`c-header-button ${this.state.toggleSearch && '-active'}`} onClick={this.onClickBtnSearch}>
                <svg className="c-icon"><use xlinkHref="#icon-search" /></svg>
              </button>
            </li>
            <li>
              <button className={`c-header-button ${this.state.toggleMenu && '-active'}`} onClick={this.onClickBtnMenu}>
                <svg className="c-icon"><use xlinkHref="#icon-menu" /></svg>
              </button>
            </li>
          </ul>
        </nav>

      </header>
    );
  }
}

export default Header;
