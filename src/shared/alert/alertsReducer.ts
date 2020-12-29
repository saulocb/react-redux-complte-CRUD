import { v4 as uuidv4 } from 'uuid';
import { AlertActions, AlertActionTypes } from './alertType';
import IAlertState from './IAlertState';
import IAlert from './interface/IAlert';

class Alert implements  IAlert {
  id = '';
  header = ''
  text = '';
  style = '';
}

const initialState: IAlertState = {
  arlets: new Array<Alert>()
}

const  alertsReducer = (state: IAlertState = initialState, action: AlertActions) => {
  switch (action.type) {

    case AlertActionTypes.ADD_ALERT:
      return {
        arlets: [
          ...state.arlets,
          {
            header: action.alert.header,
            text: action.alert.text,
            style: action.alert.style,
            id: uuidv4()
          }
        ]
      }

    case AlertActionTypes.REMOVE_ALERT:
      return {
        arlets: state.arlets.filter((alert) => {
          if (alert.id === action.id ) {
            return false;
          } else {
            return true;
          }
        })
      }

    default:
      return state;
  }
};

export default alertsReducer