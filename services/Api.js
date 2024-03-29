import { AsyncStorage } from 'react-native';
const baseUrl = 'https://fromhometohome.skilful-hands.org/api/';
let accessToken = ''
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
      'Authorization': 'Bearer ' + accessToken
    }
  });
}

async function getAccessToken() {
  const baseUrl = 'https://hometohome.skilful-hands.org/connect/token'
  let result = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache"
    },
    body: "client_id=HomeToHomeMobileApp&client_secret=87N3H0P5-6K79-4A12-A3D6-J42258FB89Y3&scope=HomeToHomeApi&grant_type=client_credentials",
  }).then(response => response.json())
  console.log(result.access_token)
  accessToken = result.access_token
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
  // return [
  //   {
  //     "id": "1",
  //     "item": "gebna",
  //     "imageName": "string",
  //     "image": "string",
  //     "modifierUser": "string",
  //     "lastModified": "2020-05-14T14:05:35.006Z"
  //   },
  //   {
  //     "id": "2",
  //     "item": "roz",
  //     "imageName": "string",
  //     "image": "string",
  //     "modifierUser": "string",
  //     "lastModified": "2020-05-14T14:05:35.006Z"
  //   }
  // ]
  const eventsRequest = () => {
    return doRequest('DefaultFoodDonations', { method: 'GET' }, {});
  };
  return eventsRequest()
    .then(response => response.json())
};

async function createComplain(user, complain) {
  console.log("d5lna el function bt3et el create complain", complain)
  // console.log(user.mobile1)
  let data = await fetch(baseUrl + 'Message', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify({
      concerningUserCode: user.code,
      content: complain
    }),
  }).then(response => response.json())
  console.log("ss", data)
  return data;
}

async function createUser(user, deviceToken) {
  console.log("d5lna el function bt3et el create", deviceToken)
  // console.log(user.mobile1)
  let data = await fetch(baseUrl + 'user', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify({
      name: user.name,
      phone1: user.mobile,
      phone2: user.mobile1 || null,
      address1: user.street || null,
      neigberhood1: user.area || null,
      Governorate1: "الأسكندرية",
      deviceToken: deviceToken,
      coordinates: user.coordinates
    }),
  }).then(response => response.json())
  // console.log("response el user",data);
  // let response = data.json();
  console.log("ss", data)
  await _storeUser(data)
  return data;
}

async function updateUser(code, user, deviceToken) {
  console.log("d5lna el function bt3et el update", deviceToken)
  console.log(user)
  console.log(code)
  let data = await fetch(baseUrl + 'user/' + code, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify({
      code: code,
      name: user.name,
      phone1: user.mobile,
      phone2: user.mobile1 || null,
      address1: user.street || null,
      neigberhood1: user.area || null,
      Governorate1: "الأسكندرية",
      deviceToken: deviceToken,
      coordinates: user.coordinates
    }),
  }).then(response => response.json())
  // console.log("response el user",data);
  // let response = data.json();
  console.log("ss", data)
  await _storeUser(data)
  return data;
}


async function createDelegate(delegate) {
  console.log("d5lna el function bt3et el create", delegate)
  let data = await fetch(baseUrl + 'Delegate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify({
      name: delegate.name,
      phone1: delegate.mobile,
      // phone2: user.mobile1||null,
      // address1: user.street||null,
      // deviceToken: deviceToken,
      // coordinates: user.coordinates
    }),
  }).then(response => response.json())
  // console.log("response el user",data);
  // let response = data.json();
  console.log("delegate api", data)
  await _storeDelegate(data)
  return data;
}

async function createDonation(handlingMethod, user, receivingUser, donationDetails, money) {
  let donations = [];
  // _storeDelegate(receivingUser)
  for (let i = 0; i < donationDetails.length; i++) {
    if (donationDetails[i].count && donationDetails[i].count != 0) {
      donations.push({ item: donationDetails[i].item, count: donationDetails[i].count });
    }
  }
  let data = await fetch(baseUrl + 'Donation', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify({
      handlingMethod: handlingMethod,
      donerCode: user.code,
      donerName: user.name,
      donerPhone: user.phone1,
      receivingfromCode: receivingUser.code,
      receivingFromName: receivingUser.name,
      receivingFromPhone: receivingUser.phone1,
      donationDetails: donations,
      moneyAmount: money
    }),
  }).then(response => response.json())
  // let response= data.json()
  console.log(data)
  return data;
}

const fetchData = async () => {
  try {
    // let token = await AsyncStorage.getItem('deviceToken');
    let user = await AsyncStorage.getItem('user');
    let receiveMethod = await AsyncStorage.getItem('receiveMethod');
    let delegate = await AsyncStorage.getItem('delegate')
    user = JSON.parse(user)
    delegate = JSON.parse(delegate)
    return [user, receiveMethod, delegate];
  } catch (error) {
    // Error retrieving data
    console.log(errror)
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

const _storeDelegate = async (delegate) => {
  try {
    // const strData = JSON.stringify(user);
    const strData = JSON.stringify(delegate);

    await AsyncStorage.setItem('delegate', strData);
    console.log("d5lna delegate ", delegate)
  } catch (error) {
    // Error saving data
    console.log(error)
  }
};

const _storeDeviceToken = async (deviceToken) => {
  // console.log("lol")
  try {
    // const strData = JSON.stringify(user);
    await AsyncStorage.setItem('deviceToken', deviceToken);
  } catch (error) {
    // Error saving data
    console.log(error)
  }
};
export { getAccessToken, createComplain, updateUser, createDelegate, _storeDelegate, createDonation, getDonations, createUser, _storeReceiveMethod, _storeDeviceToken, _storeUser, fetchData };
