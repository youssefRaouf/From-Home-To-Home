import * as types from '../utils/Consts';

let USER_INITIAL_STATE = {
  user: '',
  deviceToken: '',
  receiveMethod: '',
  loading: false,
  delegateLoading: false
};
function user(state = USER_INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.data[0],
        receiveMethod: action.data[1],
        delegate: action.data[2],
        loading: true
      };
    case types.SAVE_USER_SUCCESS:
      // console.log("ya 3mo", action.user)
      return {
        ...state,
        user: action.user,
      };
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
      };
    case types.CREATE_USER_FAIL:
      return state
    case types.CREATE_COMPLAIN_SUCCESS:
      return {
        ...state,
      };
    case types.CREATE_COMPLAIN_FAIL:
      return state
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.data,
      };
    case types.UPDATE_USER_FAIL:
      return state;
    case types.CHANGE_RECEIVE_METHOD_ONLY:
      return {
        ...state,
        receiveMethod: action.receiveMethod,
      };
    case types.CHANGE_RECEIVE_METHOD:
      return {
        ...state,
        delegateLoading: true,
      };
    case types.CHANGE_RECEIVE_METHOD_SUCCESS:
      console.log(action.receiveMethod);
      return {
        ...state,
        receiveMethod: action.receiveMethod,
        delegate: action.data,
        delegateLoading: false,
      };
    case types.CHANGE_RECEIVE_METHOD_FAIL:
      return state;
    case types.SET_DEVICE_TOKEN:
      console.log("ss hna set",action.deviceToken)
      return {
        ...state,
        deviceToken: action.deviceToken,
      };
    default:
      return state;
  }
}

export default user;
