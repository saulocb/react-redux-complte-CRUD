import IAuthentication from "./Interfaces/IAuthentication";
import IUser from "./Interfaces/IUser";

export enum AuthActionTypes {
  LOG_IN_START = "LOG_IN_START",
  LOG_IN_SUCCESS = "LOG_IN_SUCCESS",
  LOG_IN_FAILURE = "LOG_IN_FAILURE",
  LOG_OUT = "LOG_OUT",
  CLEAN_ERROR = "CLEAN_ERROR",
  SIGN_UP_START = "SIGN_UP_START ",
  SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS",
  SIGN_UP_FAILURE = "SIGN_UP_FAILURE",
  GET_USER_START =  "GET_USER_START",
  GET_USER_SUCCESS =  "GET_USER_SUCCESS"
}

//    LOGIN

export interface LoginStartAction {
  type: AuthActionTypes.LOG_IN_START;
}

export interface LoginSuccessAction {
  type: AuthActionTypes.LOG_IN_SUCCESS;
  auth: IAuthentication;
}

export interface LoginFailureAction {
  type: AuthActionTypes.LOG_IN_FAILURE;
  error: string;
}

export interface LogOut {
  type: AuthActionTypes.LOG_OUT;
}

export interface CleanError {
  type: AuthActionTypes.CLEAN_ERROR;
}

//             SIGN-UP
export interface SignUpStartAction {
  type: AuthActionTypes.SIGN_UP_START;
}

export interface SignUpSuccessAction {
  type: AuthActionTypes.SIGN_UP_SUCCESS;
  user: IUser;
}

export interface SignUpFailureAction {
  type: AuthActionTypes.SIGN_UP_FAILURE;
  error: string;
}


// USER

export interface GetUserStartAction {
  type: AuthActionTypes.GET_USER_START;
}

export interface GetUserSuccessAction {
  type: AuthActionTypes.GET_USER_SUCCESS;
  user: IUser
}

export interface CleanError {
  type: AuthActionTypes.CLEAN_ERROR;
}



export type AuthLoginActions =
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailureAction
  | SignUpStartAction
  | SignUpFailureAction
  | LogOut
  | SignUpSuccessAction
  | CleanError
  | GetUserSuccessAction
  | GetUserStartAction;
