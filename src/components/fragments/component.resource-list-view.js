import React from 'react';

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
      <a onClick={this.props.onClick} href={this.props.href} className={'c-Resource' + (this.props.selected ? ' is-Selected' : '')}>
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
      </a>
    );
  }
}

export default ResourceListView;
