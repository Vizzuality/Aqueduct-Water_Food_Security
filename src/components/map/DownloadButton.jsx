import React from 'react';
import domtoimage from 'dom-to-image';
import { saveAsFile } from 'utils/utils';
import { Spinner, Icon } from 'aqueduct-components';

export default class DownloadButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }


  onDownloadMap() {
    if (this.state.loading) return;

    this.toggleLoading(true);
    console.log(this.props.mapElem);
    domtoimage.toPng(this.props.mapElem)
      .then((png) => {
        this.toggleLoading(false);
        saveAsFile(png, 'image/png', 'map.png');
      });
  }

  toggleLoading(bool) {
    this.setState({ loading: bool });
  }

  render() {
    return (
      <div className="c-download-map">
        <Spinner isLoading={this.state.loading} />
        <button className="download-map-button" onClick={() => this.onDownloadMap()}>
          <Icon name="icon-download" />
        </button>
      </div>
    );
  }
}


DownloadButton.propTypes = {
  mapElem: React.PropTypes.object
};
