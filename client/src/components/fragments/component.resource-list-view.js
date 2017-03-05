import React from 'react';
import {
  Route,
  NavLink
} from 'react-router-dom';
import MediaQuery from 'react-responsive';


class ResourceListView extends React.Component {
  render() {
    const {_id, title, description, category, website_link, purchase_link, rating} = this.props.data;

    function renderCatIcon (category) {
      switch (category) {
        case 'book':
          return <i className="fa fa-book c-Resource__category"/>
        case 'website':
          return <i className="c-Resource__category c-Resource__category--website">
            www.
          </i>
        case 'magazine':
          return <i className="c-Resource__category c-Resource__category--website">
            MAG
          </i>
        default:
          return null
      }
    }

    return (
      <div className="c-Resource">
        <NavLink to={`${this.props.match.path}details/${this.props.data._id}`}
          activeClassName="is-Active"
        >
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
        </NavLink>
        <MediaQuery query='(max-width: 61.999em)'>
          <Route path={`${this.props.match.url}/details/:resourceId`}
            render={matchProps => {
                if (_id === matchProps.match.params.resourceId)
                  return (
                    <div className="c-Resource__details">
                      <a href={ website_link } target="_blank"
                        className="c-Resource__details-website"
                      >
                        { website_link }
                      </a>
                      { purchase_link &&
                          <a href={ purchase_link }
                            className="o-Btn c-Resource__details-purchase"
                            target="_blank"
                          >
                            Purchase Link
                          </a>
                      }
                      <div className="c-Resource__details-description-wrap">
                        <p className="c-Resource__details-description">{ description }</p>
                      </div>
                    </div>
                  )
                else
                  return null;
              }
            }
          />
        </MediaQuery>
      </div>
    );
  }
}

export default ResourceListView;
