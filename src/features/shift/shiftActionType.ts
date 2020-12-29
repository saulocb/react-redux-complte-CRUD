import IShift from "./Interfaces/IShift";

export enum ShitActionTypes {
  ADD_SHIFT_START = "ADD_SHIFT_START",
  ADD_SHIFT_SUCCESS = "ADD_SHIFT_SUCCESS",
  ADD_SHIFT_FAILURE = "ADD_SHIFT_FAILURE",
  REMOVE_SHIFT_START = "REMOVE_SHIFT_START",
  REMOVE_SHIFT_SUCCESS = "REMOVE_SHIFT_SUCCESS",
  REMOVE_SHIFT_FAILURE = "REMOVE_SHIFT_FAILURE",
  EDIT_SHIFT_START = "EDIT_SHIFT_START",
  EDIT_SHIFT_SUCCESS = "EDIT_SHIFT_SUCCESS",
  EDIT_SHIFT_FAILURE = "EDIT_SHIFT_FAILURE",
  SHIFT_CLEAN_ERROR = "SHIFT_CLEAN_ERROR",
  GET_ALL_SHIFT_START = "GET_ALL_SHIFT_START",
  GET_ALL_SHIFT_SUCCESS = "GET_ALL_SHIFT_SUCCESS",
  GET_ALL_SHIFT_FAILURE = "GET_ALL_SHIFT_FAILURE",
  SELECT_SHIFT = "SELECT_SHIFT",
}

//            ADD SHIFT

export interface AddShiftStartAction {
  type: ShitActionTypes.ADD_SHIFT_START;
}

export interface AddShiftSuccessAction {
  type: ShitActionTypes.ADD_SHIFT_SUCCESS;
}

export interface AddShiftFailureAction {
  type: ShitActionTypes.ADD_SHIFT_FAILURE;
  error: string;
}

//  GET ALL SHIFT

export interface GetAllShiftStartAction {
  type: ShitActionTypes.GET_ALL_SHIFT_START;
}

export interface GetAllShiftSuccessAction {
  type: ShitActionTypes.GET_ALL_SHIFT_SUCCESS;
  shifts: IShift[];
}

export interface GetAllShiftFailureAction {
  type: ShitActionTypes.GET_ALL_SHIFT_FAILURE;
  error: string;
}

//             REMOVE SHIFT

export interface RemoveShiftStartAction {
  type: ShitActionTypes.REMOVE_SHIFT_START;
}

export interface RemoveShiftSuccessAction {
  type: ShitActionTypes.REMOVE_SHIFT_SUCCESS;
}

export interface RemoveShiftFailureAction {
  type: ShitActionTypes.REMOVE_SHIFT_FAILURE;
  error: string;
}

//               EDIT SHIFT

export interface EditShiftStartAction {
  type: ShitActionTypes.EDIT_SHIFT_START;
}

export interface EditShiftSuccessAction {
  type: ShitActionTypes.EDIT_SHIFT_SUCCESS;
}

export interface EditShiftFailureAction {
  type: ShitActionTypes.EDIT_SHIFT_FAILURE;
  error: string;
}

export interface SelectShift {
  type: ShitActionTypes.SELECT_SHIFT;
  shift: IShift;
}

export interface ShiftCleanAction {
  type: ShitActionTypes.SHIFT_CLEAN_ERROR;
  error: string;
}

export type ShiftActions =
  | AddShiftStartAction
  | AddShiftSuccessAction
  | AddShiftFailureAction
  | RemoveShiftStartAction
  | RemoveShiftSuccessAction
  | RemoveShiftFailureAction
  | EditShiftStartAction
  | EditShiftSuccessAction
  | EditShiftFailureAction
  | GetAllShiftStartAction
  | GetAllShiftSuccessAction
  | GetAllShiftFailureAction
  | SelectShift;
