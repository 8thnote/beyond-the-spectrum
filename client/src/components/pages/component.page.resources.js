import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import update from 'immutability-helper';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Checkbox from 'material-ui/Checkbox';

import ResourceListView from '../fragments/component.resource-list-view';
import ResourceDetailsWrap from '../fragments/component.resource-details-wrap';
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

    return (
      <div className="row c-Resource-page">
        <div className="col-xs-12 col-md-2">
          <div className="c-Resource-page__filters">
            <p>Filter Resources:</p>
            <Checkbox
              label="Books"
              checked={this.state.filters.resources.book}
              onCheck={this.handleChangeFilter('book')}
            />
            <Checkbox
              label="Magazine"
              checked={this.state.filters.resources.magazine}
              onCheck={this.handleChangeFilter('magazine')}
            />
            <Checkbox
              label="Website"
              checked={this.state.filters.resources.website}
              onCheck={this.handleChangeFilter('website')}
            />
          </div>
        </div>
        <div className="col-xs-12 col-md-4">
          <div className="c-Resource-page__resource-list">
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              { renderResourceList(this.state.resources, this.props.match) }
            </ReactCSSTransitionGroup>
          </div>
        </div>
        <div className="col-xs-12 col-md-6">
          <div className="c-Resource-page__resource-details">
            <Switch>
              <Route path={`${this.props.match.url}/submit-resource/`} exact component={SubmitResource} />
              <Route path={`${this.props.match.url}/details/`}
                render={matchProps => {
                    if (this.state.resources.length > 0) {
                      return (
                        <ResourceDetailsWrap {... matchProps} resources={this.state.resources} />
                      )
                    } else {
                      return null;
                    }
                  }
                }
              />
              <Route render={() => {
                  return (
                    <div className="c-Resource-page__lg-ad">
                      <a href="https://disneyworld.disney.go.com/"
                        target="_blank"
                      >
                        <img src="/img/demo-ad.png" alt="Demo Ad" />
                      </a>
                    </div>
                  )
                }
              } />
            </Switch>
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
