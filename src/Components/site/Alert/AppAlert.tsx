import React from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { removeAlert } from "../../../shared/alert/alertAction";
import IAlert from "../../../shared/alert/interface/IAlert";

interface Props {
  removeAlert(alerId?: string): void;
  alert?: IAlert;
}

class AppAlert extends React.Component<Props> {
  removeAlert = () => {
    this.props.removeAlert(this.props.alert?.id);
  };

  removeAlertTime = () => {
    setTimeout(() => {
      this.removeAlert();
    }, 3000);
  };

  render() {
    this.removeAlertTime();
    return (
      <Alert
        variant={this.props.alert?.style}
        onClose={() => this.removeAlert()}
        dismissible
      >
        <Alert.Heading>{this.props.alert?.header}!</Alert.Heading>
        <p>{this.props.alert?.text}</p>
      </Alert>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    removeAlert: (alerId: string) => dispatch(removeAlert(alerId)),
  };
};

export default connect(null, mapDispatchToProps)(AppAlert);
