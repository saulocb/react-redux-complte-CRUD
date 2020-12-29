import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { ApplicationState } from "../../../configurations/withReduxFeatures";
import {
  deleteShift,
  getAllShift,
  selectShift,
} from "../../../features/shift/actionsShift";
import IShift from "../../../features/shift/Interfaces/IShift";
import AppSpinner from "../../site/Spinner";

interface IProps {
  getAllShift(): void;
  deleteShift(shiftId?: string): void;
  selectShift(shift: IShift): void;
  shifts: IShift[];
  isFetching?: boolean;
}

const ListShiftComponent: React.FC<IProps> = ({
  shifts,
  getAllShift,
  deleteShift,
  selectShift,
  isFetching,
}) => {
  useEffect(() => {
    getAllShift();
  }, []);

  const removeSHift = (shiftId?: string) => {
    deleteShift(shiftId);
  };

  const editShift = (shift: IShift) => {
    selectShift(shift);
  };

  const RenderShift = () => {
    const listShift = shifts.map((shift: IShift) => {
      return (
        <tr key={shift.id}>
          <td>{shift.qdtBouncer}</td>
          <td>{shift.interval}</td>
          <td>{shift.pay}</td>
          <td>{shift.creationDate}</td>
          <td style={{ display: "flex" }}>
            <Button onClick={() => editShift(shift)} variant="primary">
              Edit
            </Button>
            <Button onClick={() => removeSHift(shift.id)} variant="danger">
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    return <>{listShift}</>;
  };

  return (
    <>
      {shifts.length > 0 && (
        <Table striped bordered hover>
          {isFetching && <AppSpinner />}
          <thead>
            <tr>
              <th>Bouncer</th>
              <th>hours </th>
              <th>Start</th>
              <th>Created at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <RenderShift />
          </tbody>
        </Table>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getAllShift: () => dispatch(getAllShift()),
    deleteShift: (shiftId: string) => dispatch(deleteShift(shiftId)),
    selectShift: (shift: IShift) => dispatch(selectShift(shift)),
  };
};

const mapStateToPropes = (state: ApplicationState) => {
  return {
    shifts: state.shift.myShifts,
    isFetching: state.shift.isFetching,
  };
};

export default connect(
  mapStateToPropes,
  mapDispatchToProps
)(ListShiftComponent);
