import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import history from "../../app/history";
import { Router } from "react-router-dom";
import { logOut } from "../../features/auth/actionsAuth";
import { connect } from "react-redux";

interface Props {
  logOut(): void;
}

class Menu extends React.Component<Props> {
  logOut = (e) => {
    e.preventDefault();
    this.props.logOut();
  };

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Router history={history}>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link  onClick={(e) => this.logOut(e)}>Log out</Nav.Link>
          </Nav>
          <Form inline>
          </Form>
        </Router>
      </Navbar>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(null, mapDispatchToProps)(Menu);
