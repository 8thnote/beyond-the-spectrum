import React from 'react';
import {
  NavLink
} from 'react-router-dom'

class ResourceListView extends React.Component {
  render() {
    const {title, category, rating} = this.props.data;

    function renderCatIcon (category) {
      switch (category) {
        case 'book':
          return <i className="fa fa-book c-Resource__category"/>
        case 'website':
          return <i className="c-Resource__category c-Resource__category--website">
            www.
          </i>
        default:
          return null
      }
    }

    return (
      <NavLink to={`${this.props.match.url}/${this.props.data.id}`}>
        <div className="c-Resource">
          <h3 className="c-Resource__title">
            { title }
            { renderCatIcon(category) }
          </h3>
          <p className="c-Resource__rating">
            { rating ?
                `rating: ${rating} / 5`

                : 'not rated yet'
            }
          </p>
        </div>
      </NavLink>
    );
  }
}

export default ResourceListView;
