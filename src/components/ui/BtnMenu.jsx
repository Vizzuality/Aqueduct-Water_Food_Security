import React from 'react';
import { array, string } from 'prop-types';
import classnames from 'classnames';

export default function BtnMenu(props) {
  const cNames = classnames('c-btn-menu', {
    [props.className]: props.className
  });
  const btnClassNames = (item) => {
    return classnames('btn-menu-btn', {
      '-disabled': item.disabled
    });
  };

  return (
    <ul className={cNames}>
      {props.items.map((item, index) => (
        <li className={classnames('btn-menu-item', { '-active': item.active })} key={index}>
          <button className={btnClassNames(item)} type="button" onClick={() => item.cb && item.cb(item)}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

BtnMenu.propTypes = {
  items: array.isRequired,
  className: string
};
