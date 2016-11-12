import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <header className="c-header">
    <nav>
      <ul className="list">
        <li>
          <button className="c-header-button">
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
          <button className="c-header-button">
            <svg className="c-icon"><use xlinkHref="#icon-search" /></svg>
          </button>
        </li>
        <li>
          <button className="c-header-button">
            <svg className="c-icon"><use xlinkHref="#icon-menu" /></svg>
          </button>
        </li>
      </ul>
    </nav>

  </header>
);

export default Header;
