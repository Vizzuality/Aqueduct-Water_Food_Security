import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Icon } from 'aqueduct-components';
import BtnMenu from 'components/ui/BtnMenu';

class AnalyzerDownloadableTable extends PureComponent {
  render() {
    const {
      onExpandTable = () => {},
      children,
      noExpand = false,
      downloadDisabled = false,
      downloading = false,
      downloadOptions = [],
      hideInstructions = false,
      downloadButtons = false,
      instructionUrl = 'https://github.com/wri/aqueduct30_data_download/blob/master/metadata.md',
      contentWrapper = node => (
        <div className="analyzer-content">
          {node}
        </div>
      )
    } = this.props;

    const instructionsNode = (
      <p className="download-instructions">
        <a
          href={instructionUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instructions
        </a>
      </p>
    );

    return (
      <React.Fragment>
        {!noExpand && (
          <div className="analyzer-header">
            <button
              type="button"
              onClick={onExpandTable}
            >
              <Icon
                name="icon-expand-window"
                className="expand-table-icon"
              />
            </button>
          </div>
        )}
        {contentWrapper(
          <React.Fragment>
            <div className="table-container">
              {children}
            </div>
            {!downloadDisabled && (
              <React.Fragment>
                {downloadButtons ? (
                  <div>
                    <span style={{ marginRight: 5 }}>Download result as: </span>
                    <BtnMenu
                      className="-theme-white -flex-inline"
                      items={downloadOptions.map(o => ({ label: o.name, cb: o.action }))}
                    />
                    {!hideInstructions && instructionsNode}
                  </div>
                ) : (
                  <div className="download-container">
                    Download as
                    <ul>
                      {downloadOptions.map((o, i, arr) => (
                        <li key={i}>
                          <button type="button" onClick={o.action}>{o.name}</button>{i < arr.length - 1 ? ',' : ''}
                        </li>
                      ))}
                      <li className="download-spinner">
                        <Spinner
                          isLoading={downloading}
                          className="-transparent -tiny"
                        />
                      </li>
                    </ul>
                    {!hideInstructions && instructionsNode}
                  </div>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

AnalyzerDownloadableTable.propTypes = {
  onExpandTable: PropTypes.func,
  noExpand: PropTypes.bool,
  children: PropTypes.node.isRequired,
  downloadDisabled: PropTypes.bool,
  downloadOptions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.node.isRequired,
      action: PropTypes.func.isRequired
    })
  ])),
  downloading: PropTypes.bool,
  hideInstructions: PropTypes.bool,
  instructionUrl: PropTypes.string,
  downloadButtons: PropTypes.bool,
  contentWrapper: PropTypes.func
};

export default AnalyzerDownloadableTable;
