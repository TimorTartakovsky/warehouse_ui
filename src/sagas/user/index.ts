// SAGA 
import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { LOGIN_ACTIONS, USER_ACTIONS, LOCATION_ACTIONS, IActionPayload } from '../../actions';
import UserService from '../../api/UserService';
import LocationService from '../../api/LocationService';
import { IUser } from '../../store/user/user.types';
import { ILocation } from '../../store/user/location.types';

// GENERATORS START
function* loginAsync(action: IActionPayload) {
    try {
        yield put(LOGIN_ACTIONS.doLoginBasicStart());
        const { username, password, history } = action.payload || {};
        const loginResult = yield call(UserService.login, username, password);
        const userResult: IUser =  yield call(UserService.whoAmI);
        const location: ILocation = yield call(LocationService.getLocationById, userResult.locationId)
        if (loginResult && userResult) {
            yield put(LOGIN_ACTIONS.loginBasicSuccess({ username, password }));
            yield put(USER_ACTIONS.userRequestWhoAmISuccess(userResult));
            yield put(LOCATION_ACTIONS.locationRequestSuccess(location));
            history.push('/dashboard') 
        } else {
            yield put(LOGIN_ACTIONS.loginBasicFailed());
            yield put(USER_ACTIONS.userRequestWhoAmIFail(new Error('Failed to login or fetch user.')));
            yield put(LOCATION_ACTIONS.locationRequestFailed(new Error('Failed to login or fetch user.')));   
        }
    } catch (e) {
        yield put(LOGIN_ACTIONS.loginBasicFailed());
        yield put(USER_ACTIONS.userRequestWhoAmIFail(new Error('Failed to login or fetch user.')));
        yield put(LOCATION_ACTIONS.locationRequestFailed(new Error('Failed to login or fetch user.')));  
        console.error(`loginAsync -> login request failed`);
    }
}

function* tokenAsync(action: IActionPayload) {
    try {
        const { token } = action.payload || {};
        const res = yield call(UserService.verifyToken, token);
        if (res) {
            yield put(LOGIN_ACTIONS.tokenBasicSuccess(token));
        } else {
            yield put(LOGIN_ACTIONS.tokenBasicFailed());
        }
    } catch (e) {
        yield put(LOGIN_ACTIONS.tokenBasicFailed());
        console.error(`tokenAsync -> token request failed`);
    }
}
// GENERATORS END

// WATCHERS START
function* watchUserLogin() {
    yield takeLatest(LOGIN_ACTIONS.LOGIN_TO_WAREHOUSE_REQUEST, loginAsync);
}

function* watchUserToken() {
    yield takeLatest(LOGIN_ACTIONS.TOKEN_TO_WAREHOUSE_REQUEST, tokenAsync);
}
// WATCHERS END

const userSagas = [
    fork(watchUserLogin),
    fork(watchUserToken),
];

export default userSagas;
