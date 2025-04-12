// src/sagas/index.js => corrected
import {all} from 'redux-saga/effects'
import watchTasks from './taskSaga';

export default function* rootSaga(){
    yield all ([
        watchTasks(),
    ])
}
/*import { all } from 'redux-saga/effects';
import taskSaga from './taskSaga';
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([
    taskSaga(),
    authSaga(),
  ]);
} */