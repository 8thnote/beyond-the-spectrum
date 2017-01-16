import React from 'react';
import update from 'immutability-helper';

import ResourceListView from './components/ResourceListView';

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
  }
};

class App extends React.Component {
  constructor () {
    super();

    this.onChangeFilter = this.onChangeFilter.bind(this);

    this.state = initialState;
  }

  onChangeFilter(fieldName) {


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

  render() {
    var filtersArray = Object.keys(this.state.filters.resources);
    filtersArray = filtersArray.filter(filter => this.state.filters.resources[filter] === true);

    return (
      <div className="wrapper">
        <header className="container-fluid">
          <p>Header</p>
        </header>

        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <label><input type="checkbox" checked={this.state.filters.resources.book} onChange={this.onChangeFilter('book')}/> Book</label><br/>
              <label><input type="checkbox" checked={this.state.filters.resources.website} onChange={this.onChangeFilter('website')}/> Website</label><br/>
            </div>
            <div className="col-xs-12 col-md-6" style={{backgroundColor: '#dadada'}}>
              {
                this.state.resources
                  .filter(resource => {
                    console.log(filtersArray);
                    console.log(filtersArray.indexOf(resource.resourceType) > -1);
                    return filtersArray.indexOf(resource.resourceType) > -1;
                  })
                  .map(resource => {
                    console.table({resource});
                      return <ResourceListView key={resource.id} data={resource} />
                  })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
