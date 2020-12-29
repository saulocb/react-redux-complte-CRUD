import { AuthActionTypes, AuthLoginActions } from "./actionsType";
import { Reducer } from "redux";
import AuthState from "./states";

const initialState: AuthState =  new AuthState()

const AuthReducer: Reducer<AuthState, AuthLoginActions> = (
  state = initialState,
  action: AuthLoginActions
) => {
  switch (action.type) {
    case AuthActionTypes.LOG_IN_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case AuthActionTypes.LOG_IN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isSignedIn: true,
        auth: action.auth,
        error: undefined
      };
    }
    case AuthActionTypes.LOG_IN_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case AuthActionTypes.GET_USER_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case AuthActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        user: action.user
      };
    }
    case AuthActionTypes.CLEAN_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: undefined,
      };
    }
    case AuthActionTypes.LOG_OUT: {
      return {
        ...state,
        isFetching: false,
        isSignedIn: false,
      };
    }
    case AuthActionTypes.SIGN_UP_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case AuthActionTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: undefined,
        user: action.user
      };
    }
    case AuthActionTypes.SIGN_UP_FAILURE: {
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

export default AuthReducer;
