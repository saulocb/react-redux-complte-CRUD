import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import AuthReducer from "../features/auth/authReducer";
import withProvider from "./withProvider";
import { reducer as formReducer } from "redux-form";
import reduxThunk from "redux-thunk";
import AuthState from "../features/auth/states";
import ShiftReducer from "../features/shift/shiftRecuders";
import ShiftState from "../features/shift/shiftState";
import AlertReducer from "../shared/alert/alertsReducer";
import AlertState from "../shared/alert/IAlertState";

/**
 * Create root reducer, containing
 * all features of the application
 */

export interface FormState {
  addShift: any
}


export interface ApplicationState {
  authentication: AuthState;
  shift: ShiftState,
  arlets: AlertState,
  form:  FormState
}

const rootReducer = combineReducers({
  authentication: AuthReducer,
  shift: ShiftReducer,
  form: formReducer,
  arlets: AlertReducer
});

/**
 * Initialize Redux Dev Tools,
 * if they are installed in browser.
 */
/* eslint-disable no-underscore-dangle */
/** Use Redux compose, if browser doesn't have Redux devtools */
const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
console.log("composeEnhancers", composeEnhancers);
/* eslint-enable */

/** Create Redux store with root reducer and middleware included */
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

/**
 * provide a list of all reducer
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Create HOC, which wraps given Component with Redux Provider
 */
export default withProvider({ store, Provider });
