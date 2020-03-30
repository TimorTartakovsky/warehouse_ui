// SAGA
import { all } from 'redux-saga/effects';
import loginSagas from './user';
import bolSagas from './bol';
import monitoringSagas from './monitoring';
import userSagas from './user';
import orderTypeSagas from './order-type'

// ALLOW ALL THE PROCESSES TO BE CRATED IN PARALLEL
export default function* () {
    yield all([
        ...loginSagas,
        ...bolSagas,
        ...userSagas,
        ...monitoringSagas,
        ...orderTypeSagas,
    ])
};
