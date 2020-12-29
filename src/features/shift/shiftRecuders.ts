import { Reducer } from "redux";
import { ShiftActions, ShitActionTypes } from "./shiftActionType";
import ShiftState from "./shiftState";

const initialState: ShiftState =  new ShiftState()

const ShiftReducer: Reducer<ShiftState, ShiftActions> = (
  state = initialState,
  action: ShiftActions
) => {
  switch (action.type) {
    //                     ADD SHIFT
    case ShitActionTypes.ADD_SHIFT_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ShitActionTypes.ADD_SHIFT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: undefined
      };
    }
    case ShitActionTypes.ADD_SHIFT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    //              EDIT SHIFT
    case ShitActionTypes.EDIT_SHIFT_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ShitActionTypes.EDIT_SHIFT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: undefined
      };
    }
    case ShitActionTypes.EDIT_SHIFT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case ShitActionTypes.SELECT_SHIFT: {
      return {
        ...state,
        selectedShift: action.shift
      };
    }
    //          REMOVE SHIFT
    case ShitActionTypes.REMOVE_SHIFT_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ShitActionTypes.REMOVE_SHIFT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: undefined
      };
    }
    case ShitActionTypes.REMOVE_SHIFT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    // GET ALL SHIFT

    case ShitActionTypes.GET_ALL_SHIFT_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ShitActionTypes.GET_ALL_SHIFT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: undefined,
        myShifts: action.shifts
      };
    }
    case ShitActionTypes.GET_ALL_SHIFT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    
    default:
      return state;
  }
};

export default ShiftReducer;
