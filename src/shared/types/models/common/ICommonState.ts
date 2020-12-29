import { LocalStorageService } from "../../../services/localStorage";

export default class CommonState {
    isFetching?: boolean;
    fetchingProgressValue?: number;
    fetchingProgressMessage?: string;
    error?: string;
    hasError?: false;
    isFulfilled?: false;
    isSignedIn: boolean | false;
    

    constructor(){
        this.isSignedIn =  LocalStorageService.getItem("token") ? true : false
    }
}