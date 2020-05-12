import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {createUser,fetchData, _storeUser} from '../services/Api';

function* fetchUser() {
  try {
    let data = yield call(fetchData);
    // data = data.map(event => new Event(event));
    console.log(data)
    yield put({
      type: types.FETCH_USER_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_USER_FAIL,
      error,
    });
  }
}
function* saveUser({user}) {
    try {
      let data = yield call(_storeUser,user);
      // data = data.map(event => new Event(event));
      yield put({
        type: types.SAVE_USER_SUCCESS, 
        user,
      });
    } catch (error) {
      console.log(error);
      yield put({
        type: types.SAVE_USER_FAIL,
        error,
      });
    }
  }
  function* createUsers({user}) {
    try {
  
      let data = yield call(createUser,user);
      yield put({
        type: types.CREATE_USER_SUCCESS, 
        data,
      });
    } catch (error) {
      console.log(error);
      yield put({
        type: types.CREATE_USER_FAIL,
        error,
      });
    }
  }


export default function* userSagas() {
  yield takeLatest(types.FETCH_USER, fetchUser);
  yield takeLatest(types.SAVE_USER, saveUser);
  yield takeLatest(types.CREATE_USER, createUsers);


}
