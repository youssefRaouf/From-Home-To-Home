import * as types from './utils/Consts';

export function changeNumber(text,number) {
    return {type: types.CHANGE_NUMBER,text,number};
}
export function fetchUser() {
    return {type: types.FETCH_USER};
}
export function fetchDonations() {
    return {type: types.FETCH_DONATIONS};
}
export function createUser(user) {
    return {type: types.CREATE_USER,user};
}
// export function fetchPostsByUserId(offset,user_id) {
//   console.log("d5lna user posts",user_id,offset)
//   return {type: types.FETCH_POSTS_USER_ID,offset,user_id};
// }



