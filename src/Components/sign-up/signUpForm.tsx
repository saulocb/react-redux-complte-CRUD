import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Field, reduxForm } from "redux-form";
import { validate } from "./validation";
import { ApplicationState } from "../../configurations/withReduxFeatures";
import { connect } from "react-redux";
import RenderInput from "../site/renderInput";
import AppSpinner from "../site/Spinner";
import ISignUpForm from "../../features/auth/Interfaces/ISignUpForm";

interface IProps {
  onSubmit(form: ISignUpForm);
  handleSubmit(funtion: Function);
  isSignedIn?: boolean;
  isFetching?: boolean;
}

class SignUpFormComponent extends React.Component<IProps>{
  onSubmit = (formValues: ISignUpForm) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Form.Group controlId="formGroupEmail">
            <Field
              name="email"
              placeholder="Enter email"
              type="text"
              component={RenderInput}
              label="Email address "
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Field
              name="password"
              placeholder="password"
              type="password"
              component={RenderInput}
              label="Password"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Field
              name="username"
              placeholder="IUser name"
              type="text"
              component={RenderInput}
              label="IUser Name"
            />
          </Form.Group>
          <Button variant="primary" type="submit" size="lg" block>
           {this.props.isFetching && <AppSpinner/>}
            Submit 
          </Button>
        </Form>
      </>
    );
  }
}

const mapStateToPropes = (state: ApplicationState) => {
  return {
    isSignedIn: state.authentication.isSignedIn,
    isFetching: state.authentication.isFetching,
  };
};

const AppConnect =  connect(mapStateToPropes)(SignUpFormComponent);

export default reduxForm({
  form: "signUp",
  validate,
})(AppConnect);
