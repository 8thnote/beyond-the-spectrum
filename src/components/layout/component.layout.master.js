import React from 'react';
import { Match, Miss, Link } from 'react-router';

import HomePage from '../pages/component.page.home';
import ResourcesPage from '../pages/component.page.resources';

class MasterLayout extends React.Component {
  render() {
    return (
      <div>
        <header className="c-Header">
          <div className="c-Header__top">
            <div className="container-fluid">
              <Link to="/">{
                ({href, onClick}) =>
                  <h1 className="c-Header__logo">
                    <a onClick={onClick}
                      href={href}
                      className="c-Header__logo-link"
                    >Beyond the Spectrum</a>
                  </h1>
              }</Link>
              <nav className="c-Header__nav">
                <ul className="c-Header__list">
                  <li className="c-Header__item">
                    <Link
                      to="/resources/"
                      className="c-Header__link"
                      activeClassName="is-Active"
                    >
                      Resources
                    </Link>
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
          <Match pattern={`${this.props.pathname}`} exactly component={HomePage} />
          <Match pattern={`${this.props.pathname}resources`} component={ResourcesPage} />
          <Miss render={() => (
            <p>Not found.</p>
          )}/>
        </div>
      </div>
    );
  }// end render
}

export default MasterLayout;
