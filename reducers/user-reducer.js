import * as types from '../utils/Consts';

let USER_INITIAL_STATE = {
  user:'',
  deviceToken:'',
  loading:false
};
function user(state = USER_INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
         user:action.data[0],
         deviceToken:action.data[1],
         loading:true
      };
      case types.SAVE_USER_SUCCESS:
        console.log("ya 3mo",action.user)
        return {
          ...state,
           user:action.user,
        };
    default:
      return state;

  }
}

export default user;
