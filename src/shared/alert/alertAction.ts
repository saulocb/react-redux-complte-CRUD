import { AlertActionTypes } from "./alertType";
import IAlert from "./interface/IAlert";

export const addAlert = (alert: IAlert) => {
  return {
    type: AlertActionTypes.ADD_ALERT,
    alert
  };
};

export const removeAlert = (id) => {
  return {
    type: AlertActionTypes.REMOVE_ALERT,
    id,
  };
};
