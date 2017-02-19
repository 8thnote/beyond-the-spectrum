import React from 'react';
import {
  Route,
  NavLink,
  Link
} from 'react-router-dom';

import HomePage from '../pages/component.page.home';
import ResourcesPage from '../pages/component.page.resources';

const MasterLayout = ({ match }) => {
  return (
    <div>
      <header className="c-Header">
        <div className="c-Header__top">
          <div className="container-fluid">
            <h1 className="c-Header__logo">
              <Link to="/">Beyond the Spectrum</Link>
            </h1>
            <nav className="c-Header__nav">
              <ul className="c-Header__list">
                <li className="c-Header__item">
                  <NavLink
                    to="/resources"
                    className="c-Header__link"
                  >
                    Resources
                  </NavLink>
                </li>
                {/*
                <li className="c-Header__item">
                  <a href="#" className="c-Header__link">Submit a Resource</a>
                </li>
                <li className="c-Header__item">
                  <a href="#" className="c-Header__link">About</a>
                </li>
                */}
              </ul>
            </nav>
          </div>{/* /.container-fluid */}
        </div>{/* /.c-Header__top */}
        <div className="c-Header__bg-img"></div>
      </header>

      <div className="container-fluid">
        <Route path={`${match.url}`} exact component={HomePage} />
        <Route path={`${match.url}resources`} render={matchProps => <ResourcesPage {...matchProps} />} />
      </div>
    </div>
  );
}

export default MasterLayout;
