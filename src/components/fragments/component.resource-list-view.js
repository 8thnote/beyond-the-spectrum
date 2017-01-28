import React from 'react';

class ResourceListView extends React.Component {
  render() {
    const {title, category} = this.props.data;

    return (
      <a onClick={this.props.onClick} href={this.props.href} className={'c-Resource' + (this.props.selected ? ' is-Selected' : '')}>
        <h3 className="c-Resource__title">{ title }</h3>
        <p className="c-Resource__type">type: { category }</p>
      </a>
    );
  }
}

export default ResourceListView;
