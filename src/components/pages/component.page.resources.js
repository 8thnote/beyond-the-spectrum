import React from 'react';
import { Match, Miss, Link } from 'react-router';
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

    this.state = initialState;
  }

  render() {
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
          return (
            <Link to={`/resources/${resource.id}`} key={resource.id}>{
              ({isActive, href, onClick}) =>
                <ResourceListView data={resource} onClick={onClick} href={href} selected={isActive} />
            }</Link>
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
            { renderResourceList() }
          </div>
        </div>
        <div className="col-xs-12 col-md-6">
          <div className="c-Resource-page__resource-details">
            <Match pattern={`${this.props.pathname}/:resourceId`} render={(props) => (
              <ResourceDetails {...props} resources={this.state.resources} />
            )}/>
            <Miss render={() => (
              <p>Select a resource to see more details here.</p>
            )}/>
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
