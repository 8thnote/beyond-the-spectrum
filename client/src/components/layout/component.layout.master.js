import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Header from './component.layout.header';

import HomePage from '../pages/component.page.home';
import ResourcesPage from '../pages/component.page.resources';
import ComingSoonPage from '../pages/component.page.coming-soon';
import NotFoundPage from '../pages/component.page.not-found';

const MasterLayout = ({ match }) => {
  return (
    <div>
      <Header />

      <div className="container-fluid c-Site__content">
        <Switch>
          <Route path={`${match.url}`} exact component={HomePage} />
          <Route path={`${match.url}resources/`} render={matchProps => <ResourcesPage {...matchProps} />} />
          <Route path={`${match.url}coming-soon/`} exact component={ComingSoonPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
}

export default MasterLayout;
