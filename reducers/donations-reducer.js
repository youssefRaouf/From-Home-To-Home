import * as types from '../utils/Consts';

let DONATIONS_INITIAL_STATE = {
  list: [],
  isLoading: false,
};
function donations(state = DONATIONS_INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_DONATIONS:
      return {
        ...state,
        isLoading: action.refresh ? true : false,
        isFetching: true,
        list: action.refresh ? [] : state.list,
      };
    case types.FETCH_DONATIONS_SUCCESS:

      return {
        ...state,
        isLoading: false,
        isFetching: false,
        list: action.data,
      };

    case types.FETCH_DONATIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
    default:
      return state;

  }
}

export default donations;
