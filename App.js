
import * as React from 'react';
import { View, Text ,StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import HomeScreen from './screens/HomeScreen'
import rootSaga from './sagas';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga'
import UserScreen from './screens/UserScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import UserInfoScreen from './screens/UserInfoScreen';
import PushNotificationManager from './PushNotificationsManager'
import HomeScreen2 from './screens/HomeScreen2';
import RecieveScreen from './screens/RecieveScreen';
import LandingScreen from './screens/LandingScreen';
import Geolocation from '@react-native-community/geolocation';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function customDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ marginRight: 10, borderBottomWidth: 1, marginLeft: 10 ,marginBottom:5}}>
        <Text style={{ fontSize: 25 ,color:'#1e1e8e'}}>من البيت للبيت</Text>
      </View>
      <DrawerItemList labelStyle={{fontSize:20}} {...props} />
    </DrawerContentScrollView>
  );
}

function drawer() {
  return (
    <Drawer.Navigator drawerContent={customDrawer}  drawerPosition="left" backBehavior='none' drawerStyle={{ backgroundColor: 'white' ,}} drawerContentOptions={{ itemStyle: { alignItems: 'flex-end', marginRight: -10, } }}>
      <Drawer.Screen options={{ headerShown: false, }}  name="التبرع" component={HomeScreen2} />
      <Drawer.Screen options={{ headerShown: false, }} name="صفحة الدعم" component={AboutUsScreen} />
      <Drawer.Screen options={{ headerShown: false }} name="بيانات المستخدم" component={UserInfoScreen} />
    </Drawer.Navigator>
  );
}

const App = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return (
    <>
      <Provider store={store}>
        <PushNotificationManager>
          <NavigationContainer>
          <StatusBar  barStyle ="light-content" hidden = {false} backgroundColor = "#1e1e8e" translucent = {false}/>
            {
              <Stack.Navigator initialRouteName='Landing'>
                <Stack.Screen options={{ headerShown:false}} name="Landing" component={LandingScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
                <Stack.Screen options={{ headerShown: false}} name="Links" component={drawer} />
                <Stack.Screen options={{ headerShown: false, }} name="User" component={UserScreen} />
                <Stack.Screen options={{ headerShown: false, }} name="Receive" component={RecieveScreen} />
              </Stack.Navigator>
            }
          </NavigationContainer>
        </PushNotificationManager>

      </Provider>
    </>
  );
};

export default App;
