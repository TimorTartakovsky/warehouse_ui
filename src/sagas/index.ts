// SAGA
import { all } from 'redux-saga/effects';
import loginSagas from './login';

// ALLOW ALL THE PROCESSES TO BE CRATED IN PARALLEL
export default function* () {
    yield all([
        ...loginSagas,
    ])
};
