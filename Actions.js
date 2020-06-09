import * as types from './utils/Consts';

export function changeNumber(id,number) {
    return {type: types.CHANGE_NUMBER,id,number};
}
export function changeName(id,name) {
    return {type: types.CHANGE_NAME,id,name};
}
export function fetchUser() {
    return {type: types.FETCH_USER};
}
export function fetchDonations() {
    return {type: types.FETCH_DONATIONS};
}
export function addType() {
    return {type: types.ADD_TYPE};
}

export function createComplain(user,complain) {
    return {type: types.CREATE_COMPLAIN,user,complain};
}
export function removeType() {
    return {type: types.REMOVE_TYPE};
}


export function createUser(user,deviceToken) {
    console.log("gwa action",user)
    return {type: types.CREATE_USER,user,deviceToken};
}

export function updateUser(code,user,deviceToken) {
    console.log("gwa action",user)
    return {type: types.UPDATE_USER,code,user,deviceToken};
}

export function createDonation(handlingMethod,user,receivingUser,donationDetails) {
    return {type: types.CREATE_DONATION,handlingMethod,user,receivingUser,donationDetails};
}

export function changeReceiveMethod(receiveMethod,delegate,handlingMethod,user,donationDetails) {
    return {type: types.CHANGE_RECEIVE_METHOD,receiveMethod,delegate,handlingMethod,user,donationDetails};
}

export function changeReceiveMethodOnly(receiveMethod) {
    return {type: types.CHANGE_RECEIVE_METHOD_ONLY,receiveMethod};
}

export function setDeviceToken(deviceToken) {
    return {type: types.SET_DEVICE_TOKEN,deviceToken};
}
// export function fetchPostsByUserId(offset,user_id) {
//   console.log("d5lna user posts",user_id,offset)
//   return {type: types.FETCH_POSTS_USER_ID,offset,user_id};
// }



