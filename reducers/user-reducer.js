import * as types from '../utils/Consts';

let USER_INITIAL_STATE = {
  user: '',
  deviceToken: '',
  receiveMethod: '',
  loading: false
};
function user(state = USER_INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.data[0],
        deviceToken: action.data[1],
        receiveMethod: action.data[2],
        loading: true
      };
    case types.SAVE_USER_SUCCESS:
      console.log("ya 3mo", action.user)
      return {
        ...state,
        user: action.user,
      };
    case types.CREATE_USER_SUCCESS:
      // let createUser = action.data[0] || '';
      // let createToken = action.data[1] || null;
      return {
        ...state,
        user: action.data,
        // token: createToken,
        // loading1: true
      };
    case types.CREATE_USER_FAIL:
      return state
    default:
      return state;

  }
}

export default user;
