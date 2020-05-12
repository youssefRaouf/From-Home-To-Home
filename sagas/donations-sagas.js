import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {getDonations} from '../services/Api';

function* requestDonations() {
  try {
    let data = yield call(getDonations);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.FETCH_DONATIONS_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_DONATIONS_FAIL,
      error,
    });
  }
}
// function* requestEventsByUserId({offset,user_id}) {
//   try {
//     let data = yield call(getPostsByUserId,offset,user_id);
//     // data = data.map(event => new Event(event));
//     yield put({
//       type: types.FETCH_POSTS_USER_ID_SUCCESS, 
//       data,
//       user_id
//     });
//   } catch (error) {
//     console.log(error);
//     yield put({
//       type: types.FETCH_POSTS_USER_ID_FAIL,
//       error,
//     });
//   }
// }
// function* createPosts({text,url,videoName}) {
//   try {
//     let data = yield call(createPost,text,url,videoName);
//     // data = data.map(event => new Event(event));
//     yield put({
//       type: types.CREATE_POST_SUCCESS, 
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//     yield put({
//       type: types.CREATE_POST_FAIL,
//       error,
//     });
//   }
// }

export default function* donationsSagas() {
  yield takeLatest(types.FETCH_DONATIONS, requestDonations);
  // yield takeLatest(types.FETCH_POSTS_USER_ID, requestEventsByUserId);
  // yield takeLatest(types.CREATE_POST, createPosts);
}
