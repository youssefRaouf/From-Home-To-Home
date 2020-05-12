import { AsyncStorage } from 'react-native';
 const baseUrl = '';
// let Token
async function doRequest(url, options = {}, data = {}) {
  // let dataUser = await fetchUser()
  // Token = dataUser[1]
  const queryString = Object.keys(data)
    .map(key => key + '=' + data[key])
    .join('&');
  return fetch(`${baseUrl}${url}?${queryString}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });
}

// const getPosts = (offset) => {
//   const limit = 15;
//   const eventsRequest = () => {
//     return doRequest('posts', { method: 'GET' }, { offset, limit });
//   };
//   return eventsRequest()
//     .then(response => response.json())
// };
// const getPostsByUserId = (offset, user_id) => {
//   const limit = 15;
//   const eventsRequest = () => {
//     return doRequest('users/' + user_id + '/posts', { method: 'GET' }, { offset, limit });
//   };
//   return eventsRequest()
//     .then(response => response.json())
// };
const getDonations = () => {
  const limit = 15;
  const offset=15;
  const eventsRequest = () => {
    return doRequest('donations', { method: 'GET' }, { offset, limit });
  };
  return eventsRequest()
    .then(response => response.json())
};xx
async function createUser(user) {
  let data = await fetch(baseUrl + 'Users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
      mobile: user.mobile,
      mobile1: user.mobile1,
      street:user.street,
      area:user.area,
    }),
  }).then(response => response.json())
  await _storeUser(data)
  return data;
}

async function fetchData() {
  try {
    let token = await AsyncStorage.getItem('deviceToken');
    let user = await AsyncStorage.getItem('user');
    let receiveMethod = await AsyncStorage.getItem('receiveMethod');

    user=JSON.parse(user)
    return [user, token,receiveMethod];
  } catch (error) {
    // Error retrieving data
  }
};
const _storeUser = async (user) => {
  try {
    console.log("lol yaaaa")
      const strData = JSON.stringify(user);
      await AsyncStorage.setItem('user', strData);
  } catch (error) {
    // Error saving data
    console.log(error)
  }
};
const _storeReceiveMethod = async (receiveMethod) => {
  try {
      // const strData = JSON.stringify(user);
      await AsyncStorage.setItem('receiveMethod', receiveMethod);
  } catch (error) {
    // Error saving data
    console.log(error)
  }
};
const _storeDeviceToken = async (deviceToken) => {
  try {
      // const strData = JSON.stringify(user);
      await AsyncStorage.setItem('deviceToken',deviceToken);
  } catch (error) {
    // Error saving data
    console.log(error)
  }
};
export {getDonations,createUser,_storeReceiveMethod,_storeDeviceToken,_storeUser,fetchData};
