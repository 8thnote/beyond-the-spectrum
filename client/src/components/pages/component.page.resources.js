import React from 'react';
import {
  Route
} from 'react-router-dom';
import update from 'immutability-helper';
import base from '../../base';
import axios from 'axios';

import ResourceListView from '../fragments/component.resource-list-view';
import ResourceDetails from '../fragments/component.resource-details';



class ResourcesPage extends React.Component {
  constructor () {
    super();

    this.handleChangeFilter = this.handleChangeFilter.bind(this);
  }

  state = {
    resources: {},
    filters: {
      resources: {
        book: false,
        website: false
      },
      resourcesArray: []
    },
    selectedResource: null
  }

  componentWillMount() {
    this.ref = base.syncState('/resources/resources_collection', {
      context: this,
      state: 'resources'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidMount() {
    // axios.get('/api/resource')
    //   .then(res => {
    //     console.log(res);
    //   });

    let data = {
      category: 'book',
      description: 'test description',
      title: 'test title',
      url: '/test-title/',
      website_link: 'http://google.com/'
    }

    axios.post('/api/resource', data)
      .then(res => {
        console.log(res);
      });
  }

  render() {
    var filtersArray = Object.keys(this.state.filters.resources);
    filtersArray = filtersArray.filter(filter => this.state.filters.resources[filter] === true);

    var resources = [];
    Object.keys(this.state.resources).forEach((key, index) => {
      resources.push(this.state.resources[key]);
    });

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
            <ResourceListView match={match} data={resource} key={resource.id} />
          )
        });

      return resources;
    }


    return (
      <div className="row c-Resource-page">
        <div className="col-xs-12 col-md-2">
          <div className="c-Resource-page__filters">
            <p>Filter Resources:</p>
            <label><input type="checkbox" checked={this.state.filters.resources.book} onChange={this.handleChangeFilter('book')}/> Books</label><br/>
            <label><input type="checkbox" checked={this.state.filters.resources.website} onChange={this.handleChangeFilter('website')}/> Websites</label>
          </div>
        </div>
        <div className="col-xs-12 col-md-4">
          <div className="c-Resource-page__resource-list">
            { renderResourceList(resources, this.props.match) }
          </div>
        </div>
        <div className="col-xs-12 col-md-6">
          <div className="c-Resource-page__resource-details">
            <Route path={`${this.props.match.url}/:resourceId`}
              render={
                matchProps => {
                  if (resources.length > 0) {
                    return (
                        <ResourceDetails {...matchProps} resources={resources} />
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
