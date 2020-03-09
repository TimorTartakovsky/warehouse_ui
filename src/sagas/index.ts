// SAGA
import { all } from 'redux-saga/effects';
import loginSagas from './user';
import bolSagas from './bol';

// ALLOW ALL THE PROCESSES TO BE CRATED IN PARALLEL
export default function* () {
    yield all([
        ...loginSagas,
        ...bolSagas,
    ])
};
