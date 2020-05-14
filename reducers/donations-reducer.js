import * as types from '../utils/Consts';

let DONATIONS_INITIAL_STATE = {
  list: [],
  isLoading: false,
  isFetching: false,
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
    case types.CREATE_DONATION:
      return {
        ...state,
        isLoading: true,
        isFetching: true,
      };
    case types.CREATE_DONATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
    case types.CREATE_DONATION_FAIL:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
      };
    case types.CHANGE_NUMBER:
      console.log("ss", action)
      let newList = state.list.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            count: action.number
          }
        }
        return {
          ...item,
          count: item.count || 0
        }
      })
      return {
        ...state,
        list: newList
      };
    case types.ADD_TYPE:
      let newList1 = state.list.map((item) => {
        return {
          ...item,
          count: item.count || 0
        }
      })
      newList1.push({
        count: 0,
        item: "",
        id: 10,
        edit:true
      })
      return {
        ...state,
        list: newList1
      };
    case types.CHANGE_NAME:
      let newList2 = state.list.map((item) => {
        if(item.id===action.id){
          return{
            ...item,
            item:action.name
          }
        }
        return {
          ...item,
          count: item.count || 0
        }
      })
      return {
        ...state,
        list: newList2
      };
    default:
      return state;

  }
}

export default donations;
