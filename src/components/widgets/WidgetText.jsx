import React from 'react';

export default function WidgetText(props) {
  let { tmpl } = props;

  Object.keys(props.data).forEach((k) => {
    tmpl = tmpl.replace(`{{${k}}}`, props.data[k]);
  });

  return (
    <span className="c-widget-text">{tmpl}</span>
  );
}

WidgetText.propTypes = {
  tmpl: React.PropTypes.string,
  data: React.PropTypes.object
};
