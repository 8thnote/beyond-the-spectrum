import React from 'react';

class ResourceDetails extends React.Component {
  render() {
    if (!(this.props.resources.length > 0)) {
      return null;
    }

    const resource = (() => {
      return this.props.resources.find((resource) => {
        return resource._id === this.props.params.resourceId;
      });
    })();

    function renderCatIcon (category) {
      switch (category) {
        case 'book':
          return (
            <span className="c-Details__category">
              <i className="fa fa-book"/>
            </span>
          )
        case 'website':
          return (
            <span className="c-Details__category c-Details__category--website">
              <i>
                www.
              </i>
            </span>
          )
        case 'magazine':
          return (
            <span className="c-Details__category c-Details__category--website">
              <i>
                MAG
              </i>
            </span>
          )
        default:
          return null
      }
    }

    return (
      <div className="c-Details__content">
        <h3 className="o-Page__title">
          { resource.title }
          { renderCatIcon(resource.category) }
        </h3>

        <div className="c-Details__description">
          <p>
            { resource.description }
          </p>
        </div>

        { resource.rating &&
          <p>
            <strong>Rating: </strong> {resource.rating} / 5
          </p>
        }

        <p className="c-Details__website">
          <strong>Website: </strong>
          <a href={ resource.website_link }
            target="_blank"
          >
            { resource.website_link }
          </a>
        </p>

        { resource.purchase_link &&
            <a href={ resource.purchase_link }
              className="o-Btn c-Details__purchase"
              target="_blank"
            >
              Purchase Link
            </a>
        }
      </div>
    );
  }
}

export default ResourceDetails;
