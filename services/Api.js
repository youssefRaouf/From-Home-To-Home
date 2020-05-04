import { AsyncStorage } from 'react-native';
// export const baseUrl = getEnv().baseUrl;
// let Token
// async function doRequest(url, options = {}, data = {}) {
//   let dataUser = await fetchUser()
//   Token = dataUser[1]
//   const queryString = Object.keys(data)
//     .map(key => key + '=' + data[key])
//     .join('&');
//   return fetch(`${baseUrl}${url}?${queryString}`, {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       token: Token
//     }
//   });
// }

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


async function fetchData() {
  try {
    let token = await AsyncStorage.getItem('deviceToken');
    let user = await AsyncStorage.getItem('user');
    user=JSON.parse(user)
    return [user, token];
  } catch (error) {
    // Error retrieving data
  }
};
const _storeUser = async (user) => {
  try {
      const strData = JSON.stringify(user);
      await AsyncStorage.setItem('user', strData);
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
export {_storeDeviceToken,_storeUser,fetchData};
