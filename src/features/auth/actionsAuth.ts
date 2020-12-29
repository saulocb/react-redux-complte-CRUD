import {
  AuthActionTypes,
  GetUserStartAction,
  GetUserSuccessAction,
  LoginFailureAction,
  LoginStartAction,
  LoginSuccessAction,
  SignUpFailureAction,
  SignUpStartAction,
  SignUpSuccessAction,
} from "./actionsType";
import history from "../../app/history";
import { Dispatch } from "redux";
import ILoginForm from "./Interfaces/IAuthForm";
import { BouncerApi } from "../../shared/Api/BouncerApi";
import IAuthentication from "./Interfaces/IAuthentication";
import { LocalStorageService } from "../../shared/services/localStorage";
import ISignUpForm from "./Interfaces/ISignUpForm";
import IUser from "./Interfaces/IUser";
import { addAlert } from "../../shared/alert/alertAction";

// ************  async functions **************

export const signin = (formValues: ILoginForm) => (dispatch: Dispatch) => {
  dispatch(loginStart());
  new BouncerApi()
    .postLogin(formValues)
    .then((response) => {
      dispatch(loginSuccess(response.data));
      LocalStorageService.setItem("token", response.data.id);
      LocalStorageService.setItem("userId", response.data.userId);
      history.push("/home");
    })
    .catch((error) => handleHttpError(error, dispatch, "login"));
};

export const signUp = (formValues: ISignUpForm) => (dispatch: Dispatch) => {
  dispatch(signUpStart());
  new BouncerApi()
    .postUser$(formValues)
    .then((response) => {
      LocalStorageService.setItem("userId", response.data.id);
      dispatch(signUpSuccess(response.data));
      dispatch(
        addAlert({
          id: "",
          header: "SignUp",
          text: "User created with success",
          style: "success",
        })
      );
    })
    .catch((error) => handleHttpError(error, dispatch, "sign up"));
};

// ************   sync functions **************

//     LOGIN
export const loginSuccess = (user: IAuthentication): LoginSuccessAction => {
  return {
    type: AuthActionTypes.LOG_IN_SUCCESS,
    auth: user,
  };
};

export const logOut = () => {
  LocalStorageService.removeItem("token");
  return {
    type: AuthActionTypes.LOG_OUT,
  };
};

export const cleanError = () => {
  return {
    type: AuthActionTypes.CLEAN_ERROR,
  };
};

export const signinFailure = (error: string): LoginFailureAction => {
  return {
    type: AuthActionTypes.LOG_IN_FAILURE,
    error: error,
  };
};

export const loginStart = (): LoginStartAction => {
  return {
    type: AuthActionTypes.LOG_IN_START,
  };
};

export const getUserStart = (): GetUserStartAction => {
  return {
    type: AuthActionTypes.GET_USER_START,
  };
};

export const getUserSuccess = (user: IUser): GetUserSuccessAction => {
  return {
    type: AuthActionTypes.GET_USER_SUCCESS,
    user: user,
  };
};

//     SIGNUP

export const signUpSuccess = (user: IUser): SignUpSuccessAction => {
  return {
    type: AuthActionTypes.SIGN_UP_SUCCESS,
    user: user,
  };
};

export const signUpFailure = (error: string): SignUpFailureAction => {
  return {
    type: AuthActionTypes.SIGN_UP_FAILURE,
    error: error,
  };
};

export const signUpStart = (): SignUpStartAction => {
  return {
    type: AuthActionTypes.SIGN_UP_START,
  };
};


export const handleHttpError = (error, dispatch, action: string) => {
  let errorMessage = "";
  if (error.response !== undefined && error.response.data.error !== undefined) {
    errorMessage = error.response.data.error.message;
  } else {
    errorMessage = `Something happened Could not ${action}`;
  }
  dispatch(signinFailure(errorMessage));
};
