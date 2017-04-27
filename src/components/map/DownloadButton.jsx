import React from 'react';
import classnames from 'classnames';
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

    this.setState({ loading: true });

    domtoimage.toPng(this.props.mapElem)
      .then((png) => {
        this.setState({ loading: false });
        saveAsFile(png, 'image/png', 'map.png');
      });
  }

  render() {
    const className = classnames({
      [this.props.className]: !!this.props.className
    });

    return (
      <button
        className={className}
        onClick={() => this.onDownloadMap()}
      >
        <Spinner
          className="-tiny"
          isLoading={this.state.loading}
        />
        <Icon name="icon-download" />
      </button>
    );
  }
}


DownloadButton.propTypes = {
  className: React.PropTypes.string,
  mapElem: React.PropTypes.object
};
