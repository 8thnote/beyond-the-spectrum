import React from 'react';
import {HOC} from 'formsy-react';
import Recaptcha from 'react-recaptcha';

class MyFormsyRecaptcha extends React.Component {
  constructor () {
    super();

    this.verifyCallback = this.verifyCallback.bind(this);
    this.resetCaptcha = this.resetCaptcha.bind(this);
  }

  render() {
    return (
      <div>
        <Recaptcha
          ref={e => this.recaptchaInstance = e}
          sitekey="6LflXBYUAAAAAOn-KJAUEiY0Bw995sNZWDwR0NZN"
          verifyCallback={this.verifyCallback}
          render="explicit"
          onloadCallback={this.resetCaptcha}
          expiredCallback={this.resetCaptcha}
        />
      </div>
    );
  }

  verifyCallback (val) {
    if (val) {
      this.props.setValue(val);
    }
  }

  resetCaptcha () {
    window.grecaptcha.reset();
  }
};

export default HOC(MyFormsyRecaptcha);
