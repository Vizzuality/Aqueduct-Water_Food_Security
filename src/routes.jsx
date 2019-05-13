import React from 'react';
import PropTypes from 'prop-types';
import { IndexRoute, Router, Route } from 'react-router';

// Components
import App from 'containers/app/App';
import { Header } from 'aqueduct-components';
import MapPage from 'containers/pages/MapPage';
import ComparePage from 'containers/pages/ComparePage';
import EmbedPage from 'containers/pages/EmbedPage';
import ReportPage from 'containers/pages/ReportPage';
import AboutPage from 'containers/pages/AboutPage';

// Routing actions
import { onEnterMapPage, onEnterComparePage, onEnterEmbedPage, onEnterReportPage, onEnterAboutPage } from 'actions/route';

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute components={{ header: () => <Header title="Food" />, main: MapPage }} onEnter={onEnterMapPage} />
      <Route path="compare">
        <IndexRoute components={{ header: () => <Header title="Food" />, main: ComparePage }} onEnter={onEnterComparePage} />
      </Route>
      <Route path="embed">
        <IndexRoute components={{ main: EmbedPage }} onEnter={onEnterEmbedPage} />
      </Route>
      <Route path="report">
        <IndexRoute components={{ main: ReportPage }} onEnter={onEnterReportPage} />
      </Route>
      <Route path="about">
        <IndexRoute components={{ header: () => <Header title="Food" />, main: AboutPage }} />
      </Route>
    </Route>
  </Router>
);

Routes.propTypes = { history: PropTypes.object.isRequired };

export default Routes;
