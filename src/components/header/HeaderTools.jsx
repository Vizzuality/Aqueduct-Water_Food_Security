import React from 'react';

const HeaderToolsMenu = (props) => {
  return (
    <div className={`c-header-submenu ${props.active && '-active'}`}>
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
  );
};

HeaderToolsMenu.propTypes = {
  // ACTIONS
  active: React.PropTypes.bool
};


export default HeaderToolsMenu;
