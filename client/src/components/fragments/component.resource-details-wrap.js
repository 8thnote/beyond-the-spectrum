import React from 'react';
import {
  Route
} from 'react-router-dom';
import { TransitionMotion, spring } from 'react-motion';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ResourceDetails from './component.resource-details';

class ResourceDetailsWrap extends React.Component {


  render() {
    if (!(this.props.resources.length > 0)) {
      return null;
    }

    const willLeave = () => ({ zIndex: 1, opacity: spring(0) });

    return (
      <ReactCSSTransitionGroup
        transitionName="fade-slide"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeaveTimeout={300}
      >
        <div className="o-Page c-Details">
          <Route path={`${this.props.match.url}/:resourceId`}
            children={
              ({ location, match }) => {
                if (this.props.resources.length > 0) {
                  return (
                    <TransitionMotion
                      willLeave={willLeave}
                      styles={match ? [ {
                        key: location.pathname,
                        style: { opacity: 1 },
                        data: match
                      } ] : []}
                    >
                      {interpolatedStyles => (
                        <div className="c-Details__content-wrap">
                          {interpolatedStyles.map(config => (
                            <div
                              key={config.key}
                              style={{ ...config.style, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                            >
                              <ResourceDetails {...config.data} match={match} resources={this.props.resources} />
                            </div>
                          ))}
                        </div>
                      )}
                    </TransitionMotion>
                  )
                } else {
                  return null;
                }
              }
            }
          />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default ResourceDetailsWrap;
