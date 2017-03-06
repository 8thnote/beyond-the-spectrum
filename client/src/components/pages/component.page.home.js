import React from 'react';
import { NavLink } from 'react-router-dom';

import LatestResources from '../fragments/component.latest-resources';

class HomePage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-offset-1 col-md-10">
          <div className="o-Page o-Page--neg-mt">
            <div className="row">
              <div className="col-md-8">
                <h2 className="o-Page__title">Welcome</h2>
                <p>
                  Beyond the Spectrum is a place where you can discover resources that have helped many families along their journey with autism. These resources are recommended and rated by the users of this site, and most of them are intended for parents with a child on the spectrum. As parents with a child on the spectrum ourselves, we hope you’ll find this site useful and decide to participate by recommending and rating resources you’ve personally found helpful. Thank you and we look forward to connecting with you!
                </p>

                <NavLink
                  to="/resources/"
                  className="o-Btn o-Btn--full@xs"
                >
                  View All Resources
                </NavLink>
              </div>
              <div className="col-md-offset-1 col-md-3">
                <LatestResources />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }// end render
}

export default HomePage;
