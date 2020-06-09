import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {createUser,fetchData,createComplain,updateUser, _storeUser, createDelegate, createDonation} from '../services/Api';

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

  function* updateUsers({code,user,deviceToken}) {
    try {
      let data = yield call(updateUser,code,user,deviceToken);
      yield put({
        type: types.UPDATE_USER_SUCCESS, 
        data,
      });
    } catch (error) {
      console.log(error);
      yield put({
        type: types.UPDATE_USER_FAIL,
        error,
      });
    }
  }

  function* createComplains({user,complain}) {
    try {
      let data = yield call(createComplain,user,complain);
      yield put({
        type: types.CREATE_COMPLAIN_SUCCESS, 
        data,
      });
    } catch (error) {
      console.log(error);
      yield put({
        type: types.CREATE_COMPLAIN_FAIL,
        error,
      });
    }
  }

  function* createDelegates({delegate,receiveMethod,handlingMethod,user,donationDetails}) {
    try {
  
      let data = yield call(createDelegate,delegate);
      console.log("saga",data)
     let data2= yield call(createDonation,handlingMethod,user,data,donationDetails)
     console.log(data2)
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
  yield takeLatest(types.CREATE_COMPLAIN, createComplains);
  yield takeLatest(types.UPDATE_USER, updateUsers);
  yield takeLatest(types.CHANGE_RECEIVE_METHOD, createDelegates);



}
