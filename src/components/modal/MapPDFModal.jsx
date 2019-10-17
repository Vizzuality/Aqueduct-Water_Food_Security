import React from 'react';

const MapPDFModal = () => {
  const { location: { origin, pathname, hash } } = window;
  const { length } = hash;
  const iframeURL = `${origin}${pathname}#/report${hash.slice(2, length)}`;

  return (
    <iframe
      title="Report modal"
      className="c-iframe -responsive"
      width={800}
      height={800}
      src={iframeURL}
    />
  );
};

MapPDFModal.propTypes = {
};

export default MapPDFModal;
