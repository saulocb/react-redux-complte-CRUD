import { Action } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { addAlert } from "../../shared/alert/alertAction";
import { BouncerApi } from "../../shared/Api/BouncerApi";
import IAddShiftForm from "./Interfaces/IAddShiftForm";
import IShift from "./Interfaces/IShift";
import { ShiftActions, ShitActionTypes } from "./shiftActionType";

export const addShift = (formValues: IAddShiftForm) => (dispatch: Dispatch) => {
  dispatch(addShiftStart());
  new BouncerApi()
    .postShift$(formValues)
    .then((response) => {
      dispatch(
        addAlert({
          id: "",
          header: "Add Shift",
          text: "shift added with success",
          style: "success",
        })
      );
      dispatch(getAllShift());
      dispatch(addShiftSuccess(response.data));
    })
    .catch((error) => handleHttpError(error, dispatch, "add"));
};

export const editShift = (shift: IShift) => (dispatch: Dispatch) => {
  dispatch(editShiftStart());
  new BouncerApi()
    .putShift$(shift)
    .then((response) => {
      dispatch(
        addAlert({
          id: "",
          header: "Edit Shift",
          text: "shift updated",
          style: "success",
        })
      );
      dispatch(getAllShift());
      dispatch(editShiftSuccess(response.data));
    })
    .catch((error) => handleHttpError(error, dispatch, "update"));
};

export const deleteShift = (shiftId: string) => (dispatch: Dispatch) => {
  dispatch(removeShiftStart());
  new BouncerApi()
    .removeShift$(shiftId)
    .then((response) => {
      dispatch(
        addAlert({
          id: "",
          header: "Remove Shift",
          text: "shift Removed",
          style: "success",
        })
      );
      dispatch(getAllShift());
      dispatch(addShiftSuccess(response.data));
    })
    .catch((error) => handleHttpError(error, dispatch, "delete"));
};

export const getAllShift = (): Action | any => (dispatch: Dispatch) => {
  dispatch(getAllShiftStart());
  new BouncerApi()
    .getALlShift$()
    .then((response) => {
      dispatch(getAllShiftSuccess(response.data));
    })
    .catch((error) => handleHttpError(error, dispatch, "gel shifts"));
};

//           ADD SHIFT

export const addShiftStart = (): ShiftActions => {
  return {
    type: ShitActionTypes.ADD_SHIFT_START,
  };
};

export const addShiftSuccess = (auth: IShift): ShiftActions => {
  return {
    type: ShitActionTypes.ADD_SHIFT_SUCCESS,
  };
};

export const shiftFailure = (error: string): ShiftActions => {
  return {
    type: ShitActionTypes.ADD_SHIFT_FAILURE,
    error: error,
  };
};

// GET ALL SHIFT

export const getAllShiftStart = (): ShiftActions => {
  return {
    type: ShitActionTypes.GET_ALL_SHIFT_START,
  };
};

export const getAllShiftSuccess = (shifts: IShift[]): ShiftActions => {
  return {
    type: ShitActionTypes.GET_ALL_SHIFT_SUCCESS,
    shifts,
  };
};

export const getAllShiftFailure = (error: string): ShiftActions => {
  return {
    type: ShitActionTypes.GET_ALL_SHIFT_FAILURE,
    error: error,
  };
};

//        EDIT SHIFT
export const editShiftStart = (): ShiftActions => {
  return {
    type: ShitActionTypes.EDIT_SHIFT_START,
  };
};

export const editShiftSuccess = (auth: IShift): ShiftActions => {
  return {
    type: ShitActionTypes.EDIT_SHIFT_SUCCESS,
  };
};

export const selectShift = (shift: IShift): ShiftActions => {
  return {
    type: ShitActionTypes.SELECT_SHIFT,
    shift,
  };
};

export const editshiftFailure = (error: string): ShiftActions => {
  return {
    type: ShitActionTypes.EDIT_SHIFT_FAILURE,
    error: error,
  };
};

//        REMOVE SHIFT

export const removeShiftStart = (): ShiftActions => {
  return {
    type: ShitActionTypes.REMOVE_SHIFT_START,
  };
};

export const removeShiftSuccess = (auth: IShift): ShiftActions => {
  return {
    type: ShitActionTypes.REMOVE_SHIFT_SUCCESS,
  };
};

export const removeshiftFailure = (error: string): ShiftActions => {
  return {
    type: ShitActionTypes.REMOVE_SHIFT_FAILURE,
    error: error,
  };
};

export const shiftCleanError = () => {
  return {
    type: ShitActionTypes.SHIFT_CLEAN_ERROR,
  };
};

export const handleHttpError = (error, dispatch, action: string) => {
  let errorMessage = "";
  if (error.response !== undefined && error.response.data.error !== undefined) {
    errorMessage = error.response.data.error.message;
  } else {
    errorMessage = `Something happened Could not ${action} the shift `;
  }
  dispatch(
    addAlert({
      id: "",
      header: "Add Shift",
      text: errorMessage,
      style: "danger",
    })
  );
  dispatch(shiftFailure(errorMessage));
};
