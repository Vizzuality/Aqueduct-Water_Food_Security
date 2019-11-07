import React from 'react';
import PropTypes from 'prop-types';
import { IndexRoute, Router, Route } from 'react-router';
import { Header } from 'aqueduct-components';

// components
import App from 'components/app';
import MapPage from 'components/pages/map';
import ComparePage from 'containers/pages/ComparePage';
import EmbedPage from 'containers/pages/EmbedPage';
import ReportPage from 'components/pages/report';
import AboutPage from 'containers/pages/AboutPage';

// Routing actions
import { onEnterMapPage, onEnterComparePage, onEnterEmbedPage, onEnterReportPage } from 'actions/route';

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute components={{ header: () => <Header title="Food" appRoute="https://www.wri.org/applications/aqueduct/food/" />, main: MapPage }} onEnter={onEnterMapPage} />
      <Route path="compare">
        <IndexRoute components={{ header: () => <Header title="Food" appRoute="https://www.wri.org/applications/aqueduct/food/" />, main: ComparePage }} onEnter={onEnterComparePage} />
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
