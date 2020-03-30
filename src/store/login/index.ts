import { LOGIN_ACTIONS, IActionPayload } from '../../actions';

export interface ILogin {
    username: string;
    isWaiting: boolean;
    isTokenExist: boolean;
    isLoginSucceeded: boolean; 
}

const initialLoginState: ILogin = {
    isWaiting: false,
    isTokenExist: false,
    isLoginSucceeded: false,
    username: '',
}

// Actions should be with proper type
const loginReducer = (state: ILogin = initialLoginState, actions: IActionPayload) => {
    switch(actions.type) {
        case LOGIN_ACTIONS.TOKEN_TO_WAREHOUSE_SUCCESS:
            return {
                ...state,
                isTokenExist: true,
            }
        case LOGIN_ACTIONS.LOGIN_TO_WAREHOUSE_FAIL:
            return {
                ...state,
                isLoginSucceeded: false,
                isWaiting: false,
            };
        case LOGIN_ACTIONS.LOGIN_TO_WAREHOUSE_STARTED:
            return {
                ...state,
                isWaiting: true,
            };
        case LOGIN_ACTIONS.LOGIN_TO_WAREHOUSE_SET_USERNAME:
            return {
                ...state,
                username: actions.payload && actions.payload.username,
            };
        case LOGIN_ACTIONS.LOGIN_TO_WAREHOUSE_SUCCESS:
            return {
                ...state,
                isLoginSucceeded: true,
                isWaiting: false,
            };
        default: return state;
    }
}

export default loginReducer;