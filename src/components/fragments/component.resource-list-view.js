import React from 'react';

class ResourceListView extends React.Component {
  render() {
    const {id, title, description} = this.props.data;

    return (
      <div onClick={() => this.props.selectResource(id)} className="c-Resource">
        <h3 className="c-Resource__title">{ title }</h3>
        <p className="c-Resource__description">{ description }</p>
      </div>
    );
  }
}

export default ResourceListView;
