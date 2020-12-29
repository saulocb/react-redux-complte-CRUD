import IAlert from "./interface/IAlert";

export enum AlertActionTypes {
  ADD_ALERT = "ADD_ALERT",
  REMOVE_ALERT = "REMOVE_ALERT",
}

export interface AlertAddAction {
  type: AlertActionTypes.ADD_ALERT;
  alert: IAlert
}

export interface AlertRemoveAction {
  type: AlertActionTypes.REMOVE_ALERT;
  id: string
}

export type AlertActions = AlertAddAction | AlertRemoveAction;
