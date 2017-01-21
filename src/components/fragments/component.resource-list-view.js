import React from 'react';

class ResourceListView extends React.Component {
  render() {
    const {title, description} = this.props.data;

    return (
      <a onClick={this.props.onClick} href={this.props.href} className={this.props.selected ? 'is-Selected' : ''}>
        <div className="c-Resource">
          <h3 className="c-Resource__title">{ title }</h3>
          <p className="c-Resource__description">{ description }</p>
        </div>
      </a>
    );
  }
}

export default ResourceListView;
