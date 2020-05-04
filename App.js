
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
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
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function customDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ marginRight: 10, borderBottomWidth: 1, marginLeft: 10 }}>
        <Text style={{ fontSize: 20 }}>من البيت للبيت</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
function drawer() {
  return (
    <Drawer.Navigator drawerContent={customDrawer}  drawerPosition="right" backBehavior='none' drawerStyle={{ backgroundColor: '#ccffdc' }} drawerContentOptions={{ itemStyle: { alignItems: 'flex-end', marginRight: -10 } }}>
      <Drawer.Screen options={{ headerShown: false }} name="التبرع" component={HomeScreen2} />
      <Drawer.Screen  options={{ headerShown: false }} name="صفحة الدعم" component={AboutUsScreen} />
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
            {
              <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
                <Stack.Screen options={{ headerShown: false }} name="Links" component={drawer} />
                <Stack.Screen options={{ headerShown: false, }} name="User" component={UserScreen} />
              </Stack.Navigator>
            }
          </NavigationContainer>
        </PushNotificationManager>

      </Provider>

    </>
  );
};

export default App;
