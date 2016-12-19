import React from 'react';

export default function InfoModal() {
  return (
    <div className="c-info">
      <div className="info-header">
        <div className="info-titles">
          <span className="info-title">Lorem ipsum dolor sit amet</span>
          <span className="info-subtitle">Lorem ipsum dolor sit amet</span>
        </div>
        <button className="c-btn -primary" type="button">Download</button>
      </div>
      <div className="info-content">
        <div className="row collapse">
          <div className="small-8"></div>
          <div className="small-4">
            <div className="info-description">
              <dl>
                <dt>Description:</dt>
                <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</dd>
                <dt>Data source:</dt>
                <dd>Lorem ipsum dolor sit amet.</dd>
                <dt>Topic:</dt>
                <dd>
                  <ul>
                    <li>topic 1</li>
                    <li>topic 2</li>
                    <li>topic 3</li>
                  </ul>
                </dd>
                <dt>Area:</dt>
                <dd className="-highlighted">Lorem ipsum</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
