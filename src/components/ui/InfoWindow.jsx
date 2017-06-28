import React from 'react';
import PropTypes from 'prop-types';

export default function InfoWindow(props) {
  const { title, list } = props;

  const parse = (v) => {
    if (!v || v === 'null') { return '-'; }
    return v;
  };

  return (
    <div className="c-infowindow">
      <h3>{title}</h3>
      {list && !!list.length &&
        <dl className="dl">
          {list.map(item =>
            <div
              // onClick={() => console.log(item)}
              className="dc"
              key={item.label}
            >
              <dt className="dt">{item.label}:</dt>
              <dd className="dd">{parse(item.value)}</dd>
            </div>
          )}
        </dl>
      }
    </div>
  );
}

InfoWindow.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array
};
