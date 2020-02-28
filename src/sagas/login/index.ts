// SAGA 
import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { LOGIN_ACTIONS } from '../../actions/';
import LoginService from '../../api/LoginService';

// GENERATORS START
function* loginAsync() {
    try {
        const result = yield call(LoginService.login, 'username', 'password');
        console.log(result);
    } catch (e) {
        console.error(`loginAsync -> login request failed`);
    }
}
// GENERATORS END

// WATCHERS START
function* watchUserLogin() {
    yield put(LOGIN_ACTIONS.doLoginBasicStart());
    yield takeEvery(LOGIN_ACTIONS.LOGIN_TO_WAREHOUSE_REQUEST, loginAsync);
}
// WATCHERS END

const loginSagas = [
    fork(watchUserLogin),
];

export default loginSagas;
