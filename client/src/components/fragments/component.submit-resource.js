import React from 'react';
import Formsy from 'formsy-react';
import { FormsySelect, FormsyText } from 'formsy-material-ui/lib';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class SubmitResource extends React.Component {
  constructor () {
    super();

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);

    this.state = {
      canSubmit: false,
      category: '',
      description: '',
      purchase_link: '',
      title: '',
      url: '',
      website_link: ''
    };
  }

  enableButton () {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton () {
    this.setState({
      canSubmit: false,
    });
  }

  submitForm (data) {
    console.log(data);
    axios.post('/api/resource', data)
      .then(res => {
        console.log(res);
      });
  }

  notifyFormError (data) {
    console.error('Form error:', data);
  }

  render() {
    return (
        <div className="c-Details">
          <h3 className="c-Details__title">
            Submit a Resource
          </h3>

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
                  required
                  hintText="Please add some info about the resource."
                  floatingLabelText="Description*"
                  multiLine={true}
                  rows={5}
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormsyText
                  name="website_link"
                  required
                  hintText="E.g. http://autismspeaks.org/"
                  floatingLabelText="Website Link*"
                  fullWidth={true}
                />
              </div>
              <div className="col-md-6">
                <FormsyText
                  name="purchase_link"
                  hintText="A direct link to the purchase page if applicable"
                  floatingLabelText="Purchase Link"
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="row">
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

          {/*<form>
            <div className="row">
              <div className="col-md-6">
                <SelectField
                  floatingLabelText="Category"
                  value={this.state.category}
                  onChange={this.handleChange}
                >
                  <MenuItem value={1} primaryText="Book" />
                  <MenuItem value={2} primaryText="Magazine" />
                  <MenuItem value={3} primaryText="Website" />
                </SelectField>
              </div>
              <div className="col-md-6">
                <TextField
                  hintText="E.g. Autism Speaks"
                  floatingLabelText="Title"
                  fullWidth={true}
                />
              </div>
            </div>

            <TextField
              hintText="E.g. Autism Speaks is a website..."
              floatingLabelText="Description"
              fullWidth={true}
            />
          </form>*/}
        </div>
    );
  }
}

export default SubmitResource;
