import React from 'react';
import Formsy from 'formsy-react';
import { FormsySelect, FormsyText } from 'formsy-material-ui/lib';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MyFormsyRecaptcha from './component.formsy-recaptcha';

class SubmitResource extends React.Component {
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
      category: '',
      title: '',
      description: '',
      website_link: '',
      purchase_link: ''
    };
  }

  render() {
    function renderSubmitForm () {
      if (!this.state.sent && !this.state.sending) {
        return (
          <div key="'form'">
            <h3 className="o-Page__title">
              Submit a Resource
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
              onInvalidSubmit={this.notifyFormError}
            >
              <div className="row">
                <div className="col-md-6">
                  <FormsySelect
                    name="category"
                    value={this.state.category}
                    required
                    floatingLabelText="Category*"
                    fullWidth={true}
                  >
                    <MenuItem value={'book'} primaryText="Book" />
                    <MenuItem value={'magazine'} primaryText="Magazine" />
                    <MenuItem value={'website'} primaryText="Website" />
                    <MenuItem value={'other'} primaryText="Other" />
                  </FormsySelect>
                </div>
                <div className="col-md-6">
                  <FormsyText
                    name="title"
                    value={this.state.title}
                    required
                    hintText="E.g. Autism Speaks"
                    floatingLabelText="Title*"
                    fullWidth={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <FormsyText
                    name="description"
                    value={this.state.description}
                    required
                    hintText="Please add some information about the resource."
                    floatingLabelText="Description*"
                    multiLine={true}
                    rows={5}
                    fullWidth={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <FormsyText
                    name="website_link"
                    value={this.state.website_link}
                    required
                    hintText="E.g. http://www.autismspeaks.org/"
                    floatingLabelText="Website Link*"
                    fullWidth={true}
                  />
                  <p>Please copy and paste the full url including http:// or https://.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <FormsyText
                    name="purchase_link"
                    value={this.state.purchase_link}
                    hintText="A direct link to the purchase page if applicable"
                    floatingLabelText="Purchase Link"
                    fullWidth={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="o-Form-btn-wrap">
                  <MyFormsyRecaptcha
                    name="g-recaptcha-response"
                    required
                  /><br />
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
        );
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
            <p>Thank you for submitting a resource. We will review it and add it to our website if it meets our submission criteria.</p>
            <div className="o-Form-btn-wrap">
              <RaisedButton
                label="Submit Another Resource"
                onClick={this.submitAnother}
              />
            </div>
          </div>
        )
      }
    }
    return (
      <div className="o-Page c-Submit-resource">
        <div style={{position: 'relative'}}>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
          >
              {renderSubmitForm.call(this)}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
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

export default SubmitResource;
