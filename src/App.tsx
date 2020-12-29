import React, { CSSProperties } from "react";
import "./App.css";
import AppRoute from "./app/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./Components/sider-menu/siderMenu";
import { connect } from "react-redux";
import { ApplicationState } from "./configurations/withReduxFeatures";
import { ErrorBoundary } from "./shared/Components/ErrorBoundary";
import AlertsOverlayComponent from "./Components/site/Alert/AlertsOverlayComponent ";
import { addAlert } from "./shared/alert/alertAction";
import AppAlert from "./Components/site/Alert/AppAlert";
import IAlert from "./shared/alert/interface/IAlert";
import { Row, Col } from "react-bootstrap";

const appAlert: CSSProperties = {
  position: "absolute",
  zIndex: 10100,
  paddingTop: "3%",
  paddingLeft: "1%",
};

interface Props {
  addAlert(alert: IAlert): void;
  isSignedIn: boolean;
  alerts: IAlert[];
}



class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <RenderAlert listAlerts={this.props.alerts} />
        {this.props.isSignedIn && <Menu />}
        <ErrorBoundary>
          <AppRoute />
        </ErrorBoundary>
      </div>
    );
  }
}

const RenderAlert = (props) => {
  return (
    <div style={appAlert}>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <AlertsOverlayComponent alerts={props.listAlerts}>
            <AppAlert />
          </AlertsOverlayComponent>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addAlert: (alert: IAlert) => dispatch(addAlert(alert)),
  };
};

const mapStateToPropes = (state: ApplicationState): Props => {
  return {
    isSignedIn: state.authentication.isSignedIn,
    alerts: state.arlets.arlets,
    addAlert: (alert: IAlert) => {},
  };
};

export default connect(mapStateToPropes, mapDispatchToProps)(App);
