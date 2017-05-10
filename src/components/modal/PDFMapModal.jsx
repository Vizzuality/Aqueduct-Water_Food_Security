import React from 'react';

export default class PDFMapModal extends React.Component {
  render() {
    return (
      <iframe
        className="c-iframe -responsive"
        width={800}
        height={800}
        src="/report?crop=all&food=none&indicator=none&irrigation=irrigated%2Crainfed&lat=36.14&lng=-22.28&period=year&period_value=baseline&scope=global&type=absolute&year=baseline&zoom=5"
      />
    );
  }
}

PDFMapModal.propTypes = {
};
