import React from 'react'
import { Platform, View } from 'react-native'
import { Notifications } from 'react-native-notifications'
import { _storeDeviceToken } from './services/Api'
import { connect } from 'react-redux';
import * as actions from './Actions';

 class PushNotificationManager extends React.Component {
  componentDidMount() {
    this.registerDevice()
    this.registerNotificationEvents()
    this.props.fetchUser();
  }

  registerDevice = async () => {
    Notifications.events().registerRemoteNotificationsRegistered(async(event) => {
      // TODO: Send the token to my server so it could send back push notifications...
      console.log('Device Token Received', event.deviceToken)
    await  _storeDeviceToken(event.deviceToken);
    })
    Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
      console.error(event)
    })

    Notifications.registerRemoteNotifications()
  }

  registerNotificationEvents = () => {
    Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
      console.log('Notification Received - Foreground', notification)
      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({ alert: false, sound: false, badge: false })
    })

    Notifications.events().registerNotificationOpened((notification, completion) => {
      console.log('Notification opened by device user', notification)
      console.log(`Notification opened with an action identifier: ${notification.identifier}`)
      completion()
    })

    Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
      console.log('Notification Received - Background', notification)

      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({ alert: true, sound: true, badge: false })
    })

    Notifications.getInitialNotification()
        .then(notification => {
          console.log('Initial notification was:', notification || 'N/A')
        })
        .catch(err => console.error('getInitialNotifiation() failed', err))
  }

  render() {
    const { children } = this.props
    console.log("you",this.props.user,this.props.deviceToken);
    if(this.props.user!==null&&this.props.user!==''&&this.props.loading){
      // this.props.navigation.navigate('Links')
    }
    return <View style={{ flex: 1 }}>{children}</View>
  }
}

const mapStateToProps = ({ user}, props) => {
  // const { activePost, isLoading } = posts;
  return {
    // posts: posts.list || [],
    // post: activePost,
    // isLoading,
    // user:"ss"
    user:user.user,
    deviceToken:user.deviceToken,
    loading:user.loading
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(actions.fetchUser()),
  // postsReceived: post => dispatch(actions.postsReceived(post)),
  // getFollowings: (offset, userId) => dispatch(actions.getFollowings(offset, userId)),
});
// export default HomeScreen

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PushNotificationManager);