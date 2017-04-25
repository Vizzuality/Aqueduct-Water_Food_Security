import React from 'react';
import domtoimage from 'dom-to-image';
import { Spinner, Icon, saveAsFile } from 'aqueduct-components';

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
      <div className={this.props.className}>
        <Spinner isLoading={this.state.loading} />
        <button onClick={() => this.onDownloadMap()}>
          <Icon name="icon-download" />
        </button>
      </div>
    );
  }
}


DownloadButton.propTypes = {
  className: React.PropTypes.string,
  mapElem: React.PropTypes.object
};
