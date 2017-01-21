import React from 'react';

class ResourceDetails extends React.Component {
  render() {
    const resource = (() => {
      return this.props.resources.find((resource) => {
        return resource.id === parseInt(this.props.params.resourceId, 10);
      });
    })();

    return (
      <div className="c-Details">
        <h3 className="c-Details__title">{ resource.title }</h3>
        <p className="c-Details__description">{ resource.description }</p>
      </div>
    );
  }
}

export default ResourceDetails;
