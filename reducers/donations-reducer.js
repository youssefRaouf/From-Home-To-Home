import * as types from '../utils/Consts';

let DONATIONS_INITIAL_STATE = {
  list: [],
  isLoading: false,
  isFetching: false,
  loading:false,
  money:0
};
function donations(state = DONATIONS_INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_DONATIONS:
      return {
        ...state,
        isLoading: true,
        isFetching: true,
        loading:false,
        list: action.refresh ? [] : state.list,
      };
    case types.FETCH_DONATIONS_SUCCESS:
       let ar=[...action.data]
       ar.push(
        {
          count: 0,
          item: "",
          id: randomId,
          edit:true,
          image:""
        }
       )
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        loading:true,
        list:ar,
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
      // console.log("ss", action)
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
      console.log("add")
     let randomId= Math.floor(Math.random() * 10000) + 1 ;
      let newList1 = state.list.map((item) => {
        return {
          ...item,
          count: item.count || 0
        }
      })
      newList1.push({
        count: 0,
        item: "",
        id: randomId,
        edit:true,
        image:""
      })
      return {
        ...state,
        list: newList1
      };
      case types.REMOVE_TYPE:
     let arr3=[...state.list]
     if(arr3[arr3.length-1].item===""){
       arr3.splice(arr3.length-1,1)
     }
      return {
        ...state,
        list: arr3
      };
    case types.CHANGE_NAME:
      console.log("change")
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
      case types.SET_MONEY:{
        console.log("ss money")
        return{
          ...state,
          money:action.money||0
        }
      }
      case types.REFRESH_COUNTS:{
        let newList3 = state.list.map((item) => {
          return {
            ...item,
            count:0
          }
        })
        return{
          ...state,
          list:newList3
        }
      }
    default:
      return state;

  }
}

export default donations;
