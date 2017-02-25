import React from 'react';
import {
  Route
} from 'react-router-dom';
import update from 'immutability-helper';
import axios from 'axios';
import { TransitionMotion, spring } from 'react-motion';

import ResourceListView from '../fragments/component.resource-list-view';
import ResourceDetails from '../fragments/component.resource-details';
import SubmitResource from '../fragments/component.submit-resource';



class ResourcesPage extends React.Component {
  constructor () {
    super();

    this.handleChangeFilter = this.handleChangeFilter.bind(this);

    this.state = {
      resources: [],
      filters: {
        resources: {
          book: false,
          magazine: false,
          website: false
        },
        resourcesArray: []
      },
      selectedResource: null,
      test: null
    }
  }

  componentDidMount() {
    axios.get('/api/resource')
      .then(res => {
        this.setState({
          resources: res.data
        })
      });
  }

  render() {
    var filtersArray = Object.keys(this.state.filters.resources);
    filtersArray = filtersArray.filter(filter => this.state.filters.resources[filter] === true);

    function renderResourceList (resources, match) {
      if (filtersArray.length > 0) {
        resources = resources
          .filter(resource => {
            if (filtersArray.length > 0) {
              return filtersArray.indexOf(resource.category) > -1;
            } else {
              return true;
            }
          });
      }

      resources = resources
        .map(resource => {
          return (
            <ResourceListView match={match} data={resource} key={resource._id} />
          )
        });

      return resources;
    }

    const willLeave = () => ({ zIndex: 1, opacity: spring(0) });

    return (
      <div className="row c-Resource-page">
        <div className="col-xs-12 col-md-2">
          <div className="c-Resource-page__filters">
            <p>Filter Resources:</p>
            <label><input type="checkbox" checked={this.state.filters.resources.book} onChange={this.handleChangeFilter('book')}/> Books</label><br/>
            <label><input type="checkbox" checked={this.state.filters.resources.magazine} onChange={this.handleChangeFilter('magazine')}/> Magazines</label><br/>
            <label><input type="checkbox" checked={this.state.filters.resources.website} onChange={this.handleChangeFilter('website')}/> Websites</label>
          </div>
        </div>
        <div className="col-xs-12 col-md-4">
          <div className="c-Resource-page__resource-list">
            { renderResourceList(this.state.resources, this.props.match) }
          </div>
        </div>
        <div className="col-xs-12 col-md-6">
          <div className="c-Resource-page__resource-details">
            <Route path={`${this.props.match.url}/submit-resource/`} exact component={SubmitResource} />
            <Route path={`${this.props.match.url}/details/:resourceId`}
              children={
                ({ location, match }) => {
                  if (this.state.resources.length > 0) {
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
                          <div>
                            {interpolatedStyles.map(config => (
                              <div
                                key={config.key}
                                style={{ ...config.style, position: 'absolute', top: 0, right: 0, bottom: 0, left: '1rem' }}
                              >
                                <ResourceDetails {...config.data} match={match} resources={this.state.resources} />
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
        </div>
      </div>
    );
  }// end render

  handleChangeFilter (fieldName) {
    return (event) => {
      const newData = update(this.state.filters, {
        resources: {
          [fieldName]: {
            $set: !this.state.filters.resources[fieldName]
          }
        }
      });

      this.setState({filters: newData});
    }
  }
}

ResourcesPage.contextTypes = {
  router: React.PropTypes.object
}

export default ResourcesPage;
