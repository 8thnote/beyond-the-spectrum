import React from 'react';

import LatestResources from '../fragments/component.latest-resources';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-offset-1 col-md-10">
          <div className="o-Page o-Page--neg-mt">
            <div className="row">
              <div className="col-md-8">
                <h2 className="o-Page__title">Oops!</h2>
                <p>Sorry, the page you requested was not found.</p>
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

export default NotFoundPage;
