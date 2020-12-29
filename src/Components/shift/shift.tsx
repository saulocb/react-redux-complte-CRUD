import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ApplicationState } from "../../configurations/withReduxFeatures";
import AddShiftFormComponent from "./addShift/addShiftForm";
import IAddShiftForm from "../../features/shift/Interfaces/IAddShiftForm";
import {
  addShift,
  editShift,
  shiftCleanError,
} from "../../features/shift/actionsShift";
import ListShiftComponent from "./listShift/listShiftComponent";
import IShift from "../../features/shift/Interfaces/IShift";
import Shift from "../../features/shift/Models/Shift";
import { LocalStorageService } from "../../shared/services/localStorage";

interface Props {
  addShift(formeValue: IAddShiftForm): void;
  editShift(shift: IShift): void;
  cleanError(): void;
  error: string;
}

interface IState {
  showAler: boolean;
}

class ShiftComponent extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = { showAler: false };
  }

  onSubmit = (formeValue: IAddShiftForm) => {
    if (formeValue.id) {
      const shift: IShift = new Shift(
        formeValue.id,
        formeValue.userId,
        formeValue.qdtBouncer,
        formeValue.creationDate,
        formeValue.pay,
        formeValue.interval
      );
      this.props.editShift(shift);
    } else {
      formeValue.userId = LocalStorageService.getItem('userId')
      formeValue.creationDate = new Date();
      this.props.addShift(formeValue);
    }
  };

  closeAlert = () => {
    this.props.cleanError();
  };

  componentWillUnmount() {
    this.props.cleanError();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={4}>
            <AddShiftFormComponent onSubmit={this.onSubmit} />
          </Col>
          <Col sm={8}>
            <ListShiftComponent />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addShift: (formeValue: IAddShiftForm) => dispatch(addShift(formeValue)),
    cleanError: () => dispatch(shiftCleanError()),
    editShift: (shift: IShift) => dispatch(editShift(shift)),
  };
};

const mapStateToPropes = (state: ApplicationState) => {
  return {
    error: state.shift.error ? state.shift.error : "",
  };
};

export default connect(mapStateToPropes, mapDispatchToProps)(ShiftComponent);
