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
      <header className="c-Site__header c-Header">
        <div className="c-Header__top">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 c-Header__logo-wrap">
                <h1 className="c-Header__logo">
                  <Link to="/">Beyond the Spectrum</Link>
                </h1>
              </div>
              <nav className="col-md-8 c-Header__nav">
                <ul className="o-List-bare c-Header__list">
                  <li className="c-Header__item">
                    <NavLink
                      to="/resources/"
                      className="c-Header__link"
                      activeClassName="is-Active"
                    >
                      Resources
                    </NavLink>
                  </li>
                  <li className="c-Header__item">
                    <NavLink
                      to="/resources/submit-resource/"
                      className="c-Header__link"
                      activeClassName="is-Active"
                    >
                      Submit a Resource
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <nav className="col-md-2 c-Header__signin">
                <ul className="o-List-bare c-Header__list">
                  <li className="c-Header__item">
                    <NavLink
                      to="/resources/"
                      className="c-Header__link"
                      activeClassName="is-Active"
                    >
                      Sign In
                    </NavLink>
                  </li>
                  <li className="c-Header__item">
                    <NavLink
                      to="/resources/submit-resource/"
                      className="c-Header__link"
                      activeClassName="is-Active"
                    >
                      Join
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>{/* /.container-fluid */}
        </div>{/* /.c-Header__top */}
        <div className="c-Header__bg-color">
          <div className="c-Header__bg-img"></div>
        </div>
      </header>

      <div className="container-fluid c-Site__content">
        <Route path={`${match.url}`} exact component={HomePage} />
        <Route path={`${match.url}resources/`} render={matchProps => <ResourcesPage {...matchProps} />} />
      </div>
    </div>
  );
}

export default MasterLayout;
