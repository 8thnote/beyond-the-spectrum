import React from 'react';
import { Match, Miss } from 'react-router';
import update from 'immutability-helper';

import ResourceListView from '../fragments/component.resource-list-view';
import ResourceDetails from '../fragments/component.resource-details';

const initialState = {
  resources: [
    {
      id: 1,
      title: 'Resource 1',
      description: 'Description 1',
      resourceType: 'book'
    },
    {
      id: 2,
      title: 'Resource 2',
      description: 'Description 2',
      resourceType: 'book'
    },
    {
      id: 3,
      title: 'Resource 3',
      description: 'Description 3',
      resourceType: 'website'
    }
  ],
  filters: {
    resources: {
      book: false,
      website: false
    },
    resourcesArray: []
  },
  selectedResource: null
};

class ResourcesPage extends React.Component {
  constructor () {
    super();

    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleResourceClick = this.handleResourceClick.bind(this);

    this.state = initialState;
  }

  render() {
    var self = this;
    var filtersArray = Object.keys(this.state.filters.resources);
    filtersArray = filtersArray.filter(filter => this.state.filters.resources[filter] === true);
    var resources = this.state.resources;

    function renderResourceList () {
      if (filtersArray.length > 0) {
        resources = resources
          .filter(resource => {
            if (filtersArray.length > 0) {
              return filtersArray.indexOf(resource.resourceType) > -1;
            } else {
              return true;
            }
          });
      }

      resources = resources
        .map(resource => {
          return <ResourceListView key={resource.id} data={resource} selectResource={self.handleResourceClick} />
        });

      return resources;
    }


    return (
      <div>
        <header className="container-fluid">
          <h1>Beyond the Spectrum</h1>
        </header>

        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-2">
              <p>Filter Resources:</p>
              <label><input type="checkbox" checked={this.state.filters.resources.book} onChange={this.handleChangeFilter('book')}/> Book</label><br/>
              <label><input type="checkbox" checked={this.state.filters.resources.website} onChange={this.handleChangeFilter('website')}/> Website</label><br/>
            </div>
            <div className="col-xs-12 col-md-4" style={{backgroundColor: '#dadada'}}>
              { renderResourceList() }
            </div>
            <div className="col-xs-12 col-md-6">
              <Match pattern={`${this.props.pathname}/:resourceId`} render={(props) => (
                <ResourceDetails {...props} resources={this.state.resources} />
              )}/>
              <Miss render={() => (
                <p>Select a resource to see more details here.</p>
              )}/>
            </div>
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

  handleResourceClick (id) {
    console.log(`clicked! ${id}`);
    this.setState({selectedResource: id});
    this.context.router.transitionTo(`/resources/${id}`);
  }
}

ResourcesPage.contextTypes = {
  router: React.PropTypes.object
}

export default ResourcesPage;
