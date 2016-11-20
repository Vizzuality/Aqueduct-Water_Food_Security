import React from 'react';
import Sidebar from 'containers/app/Sidebar';
import Map from 'containers/map/Map';

class AppPage extends React.Component {
  render() {
    return (
      <div className="l-content -fullscreen">
        <Sidebar />
        <Map />
      </div>
    );
  }
}

AppPage.propTypes = {
};

export default AppPage;
