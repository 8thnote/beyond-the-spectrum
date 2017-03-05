import React from 'react';
import {
  Route
} from 'react-router-dom';

import Header from './component.layout.header';

import HomePage from '../pages/component.page.home';
import ResourcesPage from '../pages/component.page.resources';

const MasterLayout = ({ match }) => {
  return (
    <div>
      <Header />

      <div className="container-fluid c-Site__content">
        <Route path={`${match.url}`} exact component={HomePage} />
        <Route path={`${match.url}resources/`} render={matchProps => <ResourcesPage {...matchProps} />} />
      </div>
    </div>
  );
}

export default MasterLayout;
