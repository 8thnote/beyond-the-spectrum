import React from 'react';
import {HOC} from 'formsy-react';
import Recaptcha from 'react-recaptcha';

class MyFormsyRecaptcha extends React.Component {
  constructor () {
    super();

    this.handleRecaptcha = this.handleRecaptcha.bind(this);
  }

  render() {
    return (
      <div>
        <Recaptcha
          sitekey="6LflXBYUAAAAAOn-KJAUEiY0Bw995sNZWDwR0NZN"
          verifyCallback={this.handleRecaptcha}
          render="explicit"
          onloadCallback={console.log.bind(this, "recaptcha loaded")}
        />
      </div>
    );
  }

  handleRecaptcha (e) {
    var response = window.grecaptcha.getResponse();

    if (response.length !== 0) {
      //this.props.setRecaptcha();
      this.props.setValue(response);
    }
  }
};

export default HOC(MyFormsyRecaptcha);
