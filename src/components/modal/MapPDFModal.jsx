import React from 'react';

export default class MapPDFModal extends React.Component {
  render() {
    return (
      <iframe
        className="c-iframe -responsive"
        width={800}
        height={800}
        src={`/#/report${window.location.search}`}
      />
    );
  }
}

MapPDFModal.propTypes = {
};
