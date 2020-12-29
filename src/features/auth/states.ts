import IAuthentication from "./Interfaces/IAuthentication";
import CommonState from "../../shared/types/models/common/ICommonState";
import IUser from "./Interfaces/IUser";

export default class AuthState extends CommonState {
  auth?: IAuthentication;
  user?: IUser
}
