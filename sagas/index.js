import {fork, all} from 'redux-saga/effects';
import userSagas from './user-sagas';
function* rootSaga() {
  yield all([fork(userSagas)]);
}

export default rootSaga;
