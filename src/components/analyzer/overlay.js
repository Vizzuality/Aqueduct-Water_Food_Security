import React from 'react'
import BtnMenu from 'components/ui/BtnMenu';
import classNames from 'classnames';

const AnalyzerOverlay = ({ onUploadNew, show = false, content, children }) => {
  return (
    <div className="c-overlay">
      {children}
      <div className={classNames('content', { show, hide: !show })}>
        <div className="content-box">
          {content}
          <BtnMenu
            className="-theme-white"
            items={[
              {
                label: 'Reupload File',
                cb: onUploadNew,
              }
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default AnalyzerOverlay