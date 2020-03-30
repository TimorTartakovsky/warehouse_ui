import { USER_ACTIONS, LOCATION_ACTIONS, IActionPayload } from '../../actions';
import { IUserState, UserState, initialUserState } from './user.types';
const userReducer = (state: IUserState = initialUserState, actions: IActionPayload): IUserState => {
    switch(actions.type) {
        case USER_ACTIONS.USER_ACTION_START:
        case USER_ACTIONS.USER_ACTION_REQUEST:
            return state;
        case USER_ACTIONS.USER_ACTION_REQUEST_SUCCESS:
            const user = actions.payload && new UserState(actions.payload.user as UserState)
            return {
                ...state,
                ...user,
            }
        case USER_ACTIONS.USER_ACTION_REQUEST_FAILED:
            return {
                ...state,
                isUserRequestFailed: true,
                userFailedErrorMessage: actions.payload && actions.payload.error

            }
        case LOCATION_ACTIONS.LOCATION_ACTION_START:
            return state;
        case LOCATION_ACTIONS.LOCATION_ACTION_REQUEST_SUCCESS:
            return {
                ...state,
                location: actions.payload && actions.payload.location,
            }
        case LOCATION_ACTIONS.LOCATION_ACTION_REQUEST_FAILED:
            return {
                ...state,
                isLocationRequestFailed: true,
                locationFailedErrorMessage: actions.payload && actions.payload.error,
            }
        default: return state; 
    }
}

export default userReducer;