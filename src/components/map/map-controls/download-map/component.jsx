import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import domtoimage from 'dom-to-image';
import MapPDFModal from 'components/modal/MapPDFModal';
import { DropdownButton, Icon, saveAsFile } from 'aqueduct-components';

class DownloadMapControl extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { loading: false };

    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(action) {
    const { toggleModal, mapElem } = this.props;
    const { loading } = this.state;

    switch (action) {
      case 'image':
        if (loading) return;

        this.setState({ loading: true }, () => {
          domtoimage.toPng(mapElem)
            .then((png) => {
              this.setState({ loading: false });
              saveAsFile(png, 'image/png', 'map.png');
            });
        });

        break;

      case 'pdf':
        toggleModal(true, {
          children: MapPDFModal,
          size: '-full',
          childrenProps: {
          }
        });
        break;

      default:
        console.info('The action is not supported by this function');
    }
  }

  render() {
    return (
      <DropdownButton
        options={[
          { label: 'Download image', value: 'image' },
          { label: 'Download report', value: 'pdf' }
        ]}
        dropdownClassName="-bottom -left"
        onSelect={selected => this.triggerAction(selected.value)}
      >
        <button type="button">
          <Icon name="icon-download" />
        </button>
      </DropdownButton>
    );
  }
}


DownloadMapControl.propTypes = {
  mapElem: PropTypes.object,
  toggleModal: PropTypes.func.isRequired
};

DownloadMapControl.defaultProps = { mapElem: null };

export default DownloadMapControl;
