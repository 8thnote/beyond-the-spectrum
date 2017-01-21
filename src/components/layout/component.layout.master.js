import React from 'react';
import { Match, Miss, Link } from 'react-router';

import HomePage from '../pages/component.page.home';
import ResourcesPage from '../pages/component.page.resources';

class MasterLayout extends React.Component {
  render() {
    return (
      <div>
        <header className="container-fluid c-Header">
          <Link to="/">{
            ({href, onClick}) =>
              <h1>
                <a onClick={onClick} href={href}>Beyond the Spectrum</a>
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
