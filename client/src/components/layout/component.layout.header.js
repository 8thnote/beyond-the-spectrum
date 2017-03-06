import React from 'react';
import {
  NavLink
} from 'react-router-dom';

import HamMenu from 'material-ui/svg-icons/navigation/menu';
import classNames from 'classnames';

class Header extends React.Component {
  constructor() {
    super();

    this.handleNavClick = this.handleNavClick.bind(this);

    this.state = {
      mobileNavShown: false
    };
  }

  handleNavClick () {
    this.setState({'mobileNavShown': !this.state.mobileNavShown});
  }

  render() {
    const dynamicNavClasses = classNames({
      'is-Shown': this.state.mobileNavShown
    });

    const navClasses = 'col-xs-12 col-md-8 c-Header__nav ' + dynamicNavClasses;

    return (
      <header className="c-Site__header c-Header">
        <div className="container-fluid c-Header__top">
          <div className="c-Header__top-row">
            <div className="row c-Header__logo-wrap">
              <div className="col-xs-12 col-md-2 c-Header__logo-desk-wrap">
                <div className="row between-xs c-Header__logo-desk-inner-wrap">
                  <h1 className="col-xs-9 col-md-3 c-Header__logo">
                    <NavLink to="/">Beyond the Spectrum</NavLink>
                  </h1>
                  <div className="col-xs-offset-1 col-xs-2 col-md-0 c-Header__ham">
                    <HamMenu color={'#fff'} onClick={this.handleNavClick} />
                  </div>
                </div>
              </div>
            </div>
            <nav className={navClasses}>
              <ul onClick={this.handleNavClick}
                className="o-List-bare c-Header__list">
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
                <li className="c-Header__item">
                  <NavLink
                    to="/coming-soon/"
                    className="c-Header__link"
                    activeClassName="is-Active"
                  >
                    About &amp; Contact
                  </NavLink>
                </li>
              </ul>
            </nav>
            <nav className="col-md-2 c-Header__signin">
              <ul className="o-List-bare c-Header__list">
                <li className="c-Header__item">
                  <NavLink
                    to="/coming-soon/"
                    className="c-Header__link"
                    activeClassName="is-Active"
                  >
                    Sign In
                  </NavLink>
                </li>
                <li className="c-Header__item">
                  <NavLink
                    to="/coming-soon/"
                    className="c-Header__link"
                    activeClassName="is-Active"
                  >
                    Join
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>{/* /.c-Header__top */}
        <div className="c-Header__bg-color">
          <div className="c-Header__bg-img"></div>
        </div>
      </header>
    )
  }
}

export default Header;

