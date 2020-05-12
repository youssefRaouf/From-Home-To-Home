import {fork, all} from 'redux-saga/effects';
import userSagas from './user-sagas';
import donationsSagas from './donations-sagas';
function* rootSaga() {
  yield all([fork(userSagas)]);
  yield all([fork(donationsSagas)]);
}

export default rootSaga;
