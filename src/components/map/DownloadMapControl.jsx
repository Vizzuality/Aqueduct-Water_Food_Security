import React from 'react';
import domtoimage from 'dom-to-image';
import { dispatch } from 'main';
import MapPDFModal from 'components/modal/MapPDFModal';
import { DropdownButton, Icon, saveAsFile, toggleModal } from 'aqueduct-components';

export default class DownloadMapControl extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.triggerAction = this.triggerAction.bind(this);
  }

  triggerAction(action) {
    switch (action) {
      case 'image':
        if (this.state.loading) return;

        this.setState({ loading: true });

        domtoimage.toPng(this.props.mapElem)
          .then((png) => {
            this.setState({ loading: false });
            saveAsFile(png, 'image/png', 'map.png');
          });

        break;

      case 'pdf':
        dispatch(toggleModal(true, {
          children: MapPDFModal,
          size: '-full',
          childrenProps: {
          }
        }));
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
        <button>
          <Icon name="icon-download" />
        </button>
      </DropdownButton>
    );
  }
}


DownloadMapControl.propTypes = {
  mapElem: React.PropTypes.object
};
