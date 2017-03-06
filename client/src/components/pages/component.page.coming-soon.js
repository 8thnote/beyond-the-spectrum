import React from 'react';

import Formsy from 'formsy-react';
import { FormsyText, FormsyCheckbox } from 'formsy-material-ui/lib';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MyFormsyRecaptcha from '../fragments/component.formsy-recaptcha';

import LatestResources from '../fragments/component.latest-resources';

class ComingSoonPage extends React.Component {
  constructor () {
    super();

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.submitAnother = this.submitAnother.bind(this);

    this.state = {
      canSubmit: false,
      sending: false,
      sent: false,
      captchaErrorShown: false,
      name: '',
      email: '',
      phone: '',
      message: '',
      notify: true
    };
  }

  render() {

    function renderContactForm () {
      if (!this.state.sent && !this.state.sending) {
        return (
          <div key="'form'">
            <h3 className="o-Second-H">
              Contact Us
            </h3>

            {this.state.captchaErrorShown &&
              <div className="c-Ss-err">
                <p className="c-Ss-err__p">There was a problem with the captcha. Please try resubmitting.</p>
              </div>
            }

            <p>* required</p>

            <Formsy.Form
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              onValidSubmit={this.submitForm}
              onInvalidSubmit={this.notifyFormError}>
              <div className="row">
                <div className="col-xs-12 col-md-8">
                  <FormsyText
                    name="name"
                    value={this.state.name}
                    floatingLabelText="Your Name"
                    fullWidth={true}
                  />
                  <FormsyText
                    name="email"
                    value={this.state.email}
                    required
                    floatingLabelText="Email*"
                    fullWidth={true}
                  />
                  <FormsyText
                    name="phone"
                    value={this.state.phone}
                    floatingLabelText="Phone"
                    fullWidth={true}
                  />
                  <FormsyText
                    name="message"
                    value={this.state.message}
                    hintText="Your suggestions or other comments."
                    floatingLabelText="Message"
                    multiLine={true}
                    rows={5}
                    fullWidth={true}
                  />
                  <br /><br />
                  <FormsyCheckbox
                    name="notify"
                    value={this.state.notify}
                    label="Yes! Please notify me about changes to the site."
                  />
                </div>
              </div>
              <div className="row">
                <div className="o-Form-captcha-wrap">
                  <MyFormsyRecaptcha
                    name="g-recaptcha-response"
                    required
                  />
                </div>
                <div className="o-Form-btn-wrap">
                  <RaisedButton
                    type="submit"
                    label="Submit"
                    className="o-Form-btn"
                    disabled={!this.state.canSubmit}
                    primary={true}
                  />
                </div>
              </div>
            </Formsy.Form>
          </div>
        )
      } else if (this.state.sending) {
        return (
          <div key="'sending'" style={{position: 'absolute', top: 0, left: 0}}>
            <h3 className="o-Page__title">Sending...</h3>
          </div>
        )
      } else {
        return (
          <div key="'thankyou'">
            <h3 className="o-Page__title">
              Thank You!
            </h3>
            <p>Thank you for contacting us. We look forward to connecting with you!</p>
          </div>
        )
      }
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-md-offset-1 col-md-10">
          <div className="o-Page o-Page--neg-mt">
            <div className="row">
              <div className="col-md-8">
                <h2 className="o-Page__title">Coming Soon</h2>
                <p>
                  We're glad you've found this site! It is brand new and we are working hard to add useful features such as the following:
                </p>

                <ul>
                  <li>User accounts which will allow you to:</li>
                  <li>Favorite resources so you can refer to your personalized list at any time</li>
                  <li>Rate resources so you can sort the list by resources that are most helpful</li>
                  <li>Personalized list of resources based on your location</li>
                  <li>Comment on resources</li>
                  <li>Include other types of helpful info such as recipes, etc.</li>
                  <li>And more if we find that there's interest in this type of website! Please let us know below.</li>
                </ul>

                <h3>Want to be notified? Or have a suggestion?</h3>

                <br />

                <div style={{position: 'relative'}}>
                  <ReactCSSTransitionGroup
                    transitionName="slow-fade"
                    transitionEnterTimeout={800}
                    transitionLeaveTimeout={500}
                  >
                      {renderContactForm.call(this)}
                  </ReactCSSTransitionGroup>
                </div>

              </div>
              <div className="col-md-offset-1 col-md-3">
                <LatestResources />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }// end render

  enableButton () {
    this.setState({
      canSubmit: true
    });
  }

  disableButton () {
    this.setState({
      canSubmit: false
    });
  }

  submitForm (data) {
    const self = this;

    self.setState({
      sending: true,
      category: data.category,
      title: data.title,
      description: data.description,
      website_link: data.website_link,
      purchase_link: data.purchase_link
    });

    // Using setTimeout to test the transition
    setTimeout(function () {
      axios.post('/api/resource', data)
      .then(res => {
        // Was captcha valid?
        if (typeof res.data.formSubmit !== 'undefined' && !res.data.formSubmit) {
          self.setState({
            sending: false,
            captchaErrorShown: true
          });
        } else {
          self.setState({
            captchaErrorShown: false,
            sent: true,
            sending: false,
            category: '',
            title: '',
            description: '',
            website_link: '',
            purchase_link: ''
          });
        }
      });
    }, 1000);
  }

  notifyFormError (data) {
    console.error('Form error:', data);
  }

  submitAnother () {
    this.setState({
      sent: false
    });
  }
}

export default ComingSoonPage;
