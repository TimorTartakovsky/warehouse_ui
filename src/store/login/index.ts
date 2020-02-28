import { LOGIN_ACTIONS } from '../../actions';

export interface ILogin {
    username: string;
    token: string;
}

const initialLoginState: ILogin = {
    token: '',
    username: '',
}

// Actions should be with proper type
const loginReducer = (state: ILogin = initialLoginState, actions: any) => {
    switch(actions.type) {
        case LOGIN_ACTIONS.LOGIN_TO_WAREHOUSE_FAIL:
            return state;
        case LOGIN_ACTIONS.LOGIN_TO_WAREHOUSE_STARTED:
            return {
                ...state,
                username: actions.payload.username,
            };
        case LOGIN_ACTIONS.LOGIN_TO_WAREHOUSE_SUCCESS:
            return {
                ...state,
                username: actions.payload.username,
                token: actions.payload.token,
            };
        default: return state;
    }
}

export default loginReducer;