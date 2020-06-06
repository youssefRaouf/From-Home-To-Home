import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {createUser,fetchData, _storeUser, createDelegate} from '../services/Api';

function* fetchUser() {
  try {
    let data = yield call(fetchData);
    // data = data.map(event => new Event(event));
    // console.log("3mlna fetch ya 3m",data)
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
  function* createUsers({user,deviceToken}) {
    try {
  
      let data = yield call(createUser,user,deviceToken);
      console.log("saga",data)
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

  function* createDelegates({delegate,receiveMethod}) {
    try {
  
      let data = yield call(createDelegate,delegate);
      console.log("saga",data)
      yield put({
        type: types.CHANGE_RECEIVE_METHOD_SUCCESS, 
        data,
        receiveMethod
      });
    } catch (error) {
      console.log(error);
      yield put({
        type: types.CHANGE_RECEIVE_METHOD_FAIL,
        error,
      });
    }
  }


export default function* userSagas() {
  yield takeLatest(types.FETCH_USER, fetchUser);
  yield takeLatest(types.SAVE_USER, saveUser);
  yield takeLatest(types.CREATE_USER, createUsers);
  yield takeLatest(types.CHANGE_RECEIVE_METHOD, createDelegates);



}
