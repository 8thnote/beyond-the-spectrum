import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <header className="container-fluid">
          <p>Header</p>
        </header>

        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-3">
              Filters
            </div>
            <div className="col-xs-12 col-md-6" style={{backgroundColor: '#dadada'}}>
              Resources List
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
