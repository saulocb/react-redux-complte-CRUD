import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Field, reduxForm, change } from "redux-form";
import {reset} from 'redux-form';
import { ApplicationState } from "../../../configurations/withReduxFeatures";
import { connect } from "react-redux";
import RenderInput from "../../site/renderInput";
import AppSpinner from "../../site/Spinner";
import { validate } from "./validation";
import { Row, Col } from "react-bootstrap";
import IAddShiftForm from "../../../features/shift/Interfaces/IAddShiftForm";
import IShift from "../../../features/shift/Interfaces/IShift";

interface IProps {
  onSubmit(form: IAddShiftForm);
  handleSubmit(funtion: Function);
  initialize: Function;
  initialValues: Function;
  change: Function;
  reset: Function
  isFetching?: boolean;
  selectedShift?: IShift;
  addShiftform: IAddShiftForm;
}

const AddShiftFormComponent: React.FC<IProps> = ({
  onSubmit,
  handleSubmit,
  change,
  reset,
  isFetching,
  selectedShift
}) => {

  useEffect(() => {
    updateShift()
  }, [selectedShift]);

  const submit = (formValues: IAddShiftForm) => {
    onSubmit(formValues);
    clean()
  };

  const updateShift = () => {
    if (selectedShift) {
      change("addShift", "qdtBouncer", selectedShift.qdtBouncer);
      change("addShift", "interval", selectedShift.interval);
      change("addShift", "pay", selectedShift.pay);
      change("addShift", "id", selectedShift.id);
      change("addShift", "userId", selectedShift.userId);
    }
  };

  const clean = () => {
    reset()
  }


  return (
    <>
      <Form onSubmit={handleSubmit(submit)}>
        <Row>
          <Col>
            <Form.Group>
              <Field
                name="qdtBouncer"
                type="number"
                component={RenderInput}
                label="How many Bouncer ?"
              />
            </Form.Group>
            <Form.Group>
              <Field
                name="interval"
                type="text"
                component={RenderInput}
                label="How many hours ?"
              />
            </Form.Group>
            <Form.Group>
              <Field
                name="pay"
                type="number"
                component={RenderInput}
                label="Payment p/hour"
              />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg" block>
              {isFetching && <AppSpinner />}
              Submit
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    change: (formanem, fildName, value) => dispatch(change(formanem, fildName, value)),
    reset: () => dispatch(reset('addShift'))
  };
};

const mapStateToPropes = (state: ApplicationState) => {
  return {
    isFetching: state.shift.isFetching,
    selectedShift: state.shift.selectedShift,
    addShiftform: state.form.addShift,
  };
};

const AppConnect = connect(
  mapStateToPropes,
  mapDispatchToProps
)(AddShiftFormComponent);

export default reduxForm({
  form: "addShift",
  enableReinitialize: true,
  validate,
})(AppConnect);
