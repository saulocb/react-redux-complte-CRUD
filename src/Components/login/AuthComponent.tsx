import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { logOut, signin, cleanError } from "../../features/auth/actionsAuth";
import AuthForm from "./AuthFormComponent";
import ILoginForm from "../../features/auth/Interfaces/IAuthForm";
import { ApplicationState } from "../../configurations/withReduxFeatures";
import history from "../../app/history";
import AuthState from "../../features/auth/states";
import AlertDismissible from "../site/Alert/AlertDismissible";
import { SIGN_UP } from "../../app/RouterLinks";

interface Props {
  signOut(): void;
  signin(formeValue: ILoginForm): void;
  cleanError(): void;
  authentication: AuthState;
  error: string;
}

class AuthComponent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    if (props.authentication.isSignedIn) {
      history.push("/home");
    }
  }

  onSubmit = (formeValue: ILoginForm) => {
    this.props.signin(formeValue);
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
          <Col sm={8}>
            <Jumbotron> 
              <h1>Login</h1>
              {this.props.error && <AlertDismissible {...errorMessage} />}
              <AuthForm onSubmit={this.onSubmit} />
              <div>
                <Link to={SIGN_UP}>Sign-up</Link>
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    signin: (formeValue: ILoginForm) => dispatch(signin(formeValue)),
    signOut: () => dispatch(logOut()),
    cleanError: () => dispatch(cleanError()),
  };
};

const mapStateToPropes = (state: ApplicationState) => {
  return {
    authentication: state.authentication,
    error: state.authentication.error ? state.authentication.error : "",
  };
};

export default connect(mapStateToPropes, mapDispatchToProps)(AuthComponent);
