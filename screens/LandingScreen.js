import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo'
import Geolocation from '@react-native-community/geolocation';

import * as actions from '../Actions';
import { CommonActions } from '@react-navigation/native';

class landingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchUser();
    this.findCoordinates()

  }

  findCoordinates = () => {
    // Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        const location = position
        console.log("location",location.coords)
      const coordinates=location.coords.latitude+","+location.coords.longitude;
      this.setState({coordinates})

      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };


  continue() {
    if (this.props.user !== null && this.props.user !== '') {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Links' },
          ],
        })
      );
    }
    else {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Home' },
          ],
        })
      );

    }
  }

  render() {

    return (
      <View style={styles.container}>
          <Image style={{width:Dimensions.get('screen').width-30,margin:10,height:Dimensions.get('screen').height-200}} resizeMode='contain' source={require("../assets/logo.jpeg")}></Image>
        <View style={{ alignItems: 'center', marginBottom: 50 }}>
          <TouchableOpacity onPress={() => { this.continue() }} style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: '#19E363', width: 100, flexDirection: 'row' }}>
            <Entypo name="arrow-bold-left" style={{ fontSize: 20, color: '#00004d' }}></Entypo>
            <Text style={{ fontSize: 25, color: '#00004d' }}>تابع</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

landingScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#e6ffee'
    // b3ffcc
  },
});



const mapStateToProps = ({ user, rooms }, props) => {
  // const { activePost, isLoading } = posts;
  return {
    // posts: posts.list || [],
    // post: activePost,
    // isLoading,
    // user:"ss"
    user: user.user,
    deviceToken: user.deviceToken,
    loading: user.loading
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(actions.fetchUser()),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(landingScreen);