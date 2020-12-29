import React from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignUpForm from "./signUpForm";
import { signUp, cleanError } from "../../features/auth/actionsAuth";
import { LOGIN } from "../../app/RouterLinks";
import AlertDismissible from "../site/Alert/AlertDismissible";
import { ApplicationState } from "../../configurations/withReduxFeatures";
import ISignUpForm from "../../features/auth/Interfaces/ISignUpForm";

interface props {
  signUp(formValues: ISignUpForm): void;
  cleanError(): void;
  error: string;
}

class SignUpComponent extends React.Component<props> {
  onSubmit = (formValues: ISignUpForm) => {
    formValues.emailVerified =  true
    this.props.signUp(formValues);
  };

  closeAlert = () => {
    this.props.cleanError();
  };

  componentWillUnmount() {
    this.props.cleanError();
  }

  render() {
    const errorMessage = {
      message: this.props.error,
      variant: "danger",
      closeAlert: this.closeAlert,
    };
    return (
      <Container>
        <Row>
          <Col sm={4}></Col>
          <Col  sm={8}>
            <Jumbotron>
              {this.props.error && <AlertDismissible {...errorMessage} />}
              <h1>Sign out</h1>
              <SignUpForm onSubmit={this.onSubmit} />
              <Link to={LOGIN}>Login</Link>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToPropes = (state: ApplicationState) => {
  return {
    authentication: state.authentication,
    error: state.authentication.error ? state.authentication.error : "",
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    signUp: (form: ISignUpForm) => dispatch(signUp(form)),
    cleanError: () => dispatch(cleanError()),
  };
};

export default connect(mapStateToPropes, mapDispatchToProps)(SignUpComponent);
