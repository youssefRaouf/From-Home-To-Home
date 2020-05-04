import * as types from '../utils/Consts';

let ROOMS_INITIAL_STATE = {
  number: 0
};
function rooms(state = ROOMS_INITIAL_STATE, action) {
  switch (action.type) {
    case types.CHANGE_NUMBER:
      console.log("ss",action)
      return {
        ...state,
        number:Number(state.number)+Number(action.number),
        [action.text]: {
          number:action.number,
        }
      };
    default:
      return state;

  }
}

export default rooms;
