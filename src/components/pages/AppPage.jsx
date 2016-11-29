import React from 'react';
import Sidebar from 'components/app/Sidebar';
import Map from 'containers/map/Map';

class AppPage extends React.Component {
  render() {
    return (
      <div className="l-content -fullscreen">
        <Sidebar />
        <div className="l-map -fullscreen">
          <Map />
        </div>
      </div>
    );
  }
}

AppPage.propTypes = {
};

export default AppPage;
