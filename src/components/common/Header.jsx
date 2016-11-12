import React from 'react';
import { Link } from 'react-router';

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
          <ul className="list">
            <li>
              <button data-active="tools" className={`c-header-button ${this.state.active === 'tools' && '-active'}`} onClick={this.onClickBtnAction}>
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
              <button data-active="search" className={`c-header-button ${this.state.active === 'search' && '-active'}`} onClick={this.onClickBtnAction}>
                <svg className="c-icon"><use xlinkHref="#icon-search" /></svg>
              </button>
            </li>
            <li>
              <button data-active="menu" className={`c-header-button ${this.state.active === 'menu' && '-active'}`} onClick={this.onClickBtnAction}>
                <svg className="c-icon"><use xlinkHref="#icon-menu" /></svg>
              </button>
            </li>
          </ul>
        </nav>

        <div className={`c-header-submenu ${this.state.active === 'tools' && '-active'}`}>
          <a className="item -active" href="#outside">
            <svg className="c-icon -big"><use xlinkHref="#icon-plus" /></svg>
            <span>Flood Risk Analyzer</span>
          </a>
          <a className="item" href="#outside">
            <svg className="c-icon -big"><use xlinkHref="#icon-plus" /></svg>
            <span>Risk Atlas</span>
          </a>
          <a className="item" href="#outside">
            <svg className="c-icon -big"><use xlinkHref="#icon-plus" /></svg>
            <span>Country basin risk profiles and Rankings</span>
          </a>
          <a className="item" href="#outside">
            <svg className="c-icon -big"><use xlinkHref="#icon-plus" /></svg>
            <span>Supply Chain Water Risk Assesment</span>
          </a>
          <a className="item" href="#outside">
            <svg className="c-icon -big"><use xlinkHref="#icon-plus" /></svg>
            <span>Water and Food Security Analyzer</span>
          </a>
        </div>

      </header>
    );
  }
}

export default Header;
