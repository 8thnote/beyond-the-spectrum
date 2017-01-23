import React from 'react';

class ResourceListView extends React.Component {
  render() {
    const {title, resourceType} = this.props.data;

    return (
      <a onClick={this.props.onClick} href={this.props.href} className={'c-Resource' + (this.props.selected ? ' is-Selected' : '')}>
        <h3 className="c-Resource__title">{ title }</h3>
        <p className="c-Resource__type">type: { resourceType }</p>
      </a>
    );
  }
}

export default ResourceListView;
