// SAGA 
import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { LOGIN_ACTIONS, IActionPayload } from '../../actions/';
import LoginService from '../../api/LoginService';

// GENERATORS START
function* loginAsync(action: IActionPayload) {
    try {
        yield put(LOGIN_ACTIONS.doLoginBasicStart());
        const { username, password, history } = action.payload;
        const result = yield call(LoginService.login, username, password);
        if (result) {
            yield put(LOGIN_ACTIONS.loginBasicSuccess({ username, password }));
            history.push('/dashboard') 
        } else {
            yield put(LOGIN_ACTIONS.loginBasicFailed());   
        }
    } catch (e) {
        yield put(LOGIN_ACTIONS.loginBasicFailed());
        console.error(`loginAsync -> login request failed`);
    }
}

function* tokenAsync(action: IActionPayload) {
    try {
        const { token } = action.payload;
        const res = yield call(LoginService.verifyToken, token);
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

const loginSagas = [
    fork(watchUserLogin),
    fork(watchUserToken),
];

export default loginSagas;
