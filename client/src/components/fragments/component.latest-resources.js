import React from 'react';
import {
  NavLink
} from 'react-router-dom'
import axios from 'axios';


class LatestResources extends React.Component {
  constructor () {
    super();

    this.state = {
      resources: []
    }
  }

  componentDidMount() {
    axios.get('/api/resource?limit=5')
      .then(res => {
        this.setState({
          resources: res.data
        })
      });
  }

  render() {
    function renderResources (resources, match) {
      resources = resources.sort(function (a, b) {
        return new Date(b.dateSubmitted) - new Date(a.dateSubmitted);
      });

      resources = resources.map(resource => {
        return (
          <li key={resource._id} className="c-Latest__item">
            <h4 className="c-Latest__item-title">
              <NavLink to={`/resources/details/${resource._id}`}
                className="c-Latest__item-link"
              >
                {resource.title}
              </NavLink>
            </h4>
            <p className="c-Latest__item-cat">{resource.category}</p>
          </li>
        )
      });

      return resources;
    }

    return (
      <div className="c-Latest">
        <h3 className="c-Latest__heading">Latest Resources</h3>
        <ul className="o-List-bare c-Latest__list">
          { renderResources(this.state.resources) }
        </ul>
      </div>
    )
  }
}

export default LatestResources;
