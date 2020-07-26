import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  Image,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import { _storeUser, _storeReceiveMethod } from '../services/Api';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CommonActions } from '@react-navigation/native';
import { backgroundColor, activeButton, textInButton, fontFamily } from '../utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';


class RecieveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async continue1() {
    this.props.changeReceiveMethodOnly("1")
    await _storeReceiveMethod("1")
    this.props.createDonation(0, this.props.user, this.props.user, this.props.donations)
    Alert.alert("", "شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من البيت")
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Links' },
        ],
      })
    );
  }

  async continue2() {

    await _storeReceiveMethod("2")
    this.props.navigation.push("User", { receive: true, receiveMethod: 2, title: "من فضلك ادخل بيانات الشخص المفوض منك :" })
  }

  async continue3() {

    await _storeReceiveMethod("3")
    this.props.navigation.push("User", { receive: true, receiveMethod: 3, title: "من فضلك ادخل بيانات حارس العقار :" })
  }

  render() {

    if (this.props.user === ''||this.props.user===null) {
      return (
        <View style={{ backgroundColor: backgroundColor, justifyContent: 'center', alignItems: 'center', height: Dimensions.get('screen').height }}>
          {/* <Text>LOADING</Text> */}
          <LottieView style={{ marginTop: -50, height: Dimensions.get('screen').height }} source={require('../assets/loading3.json')} autoPlay loop />
        </View>
      );
    } else {
  
      return (
        <ScrollView style={styles.container}>
         <SafeAreaView>
          <View style={{ paddingRight: 5, marginLeft: 5, flexDirection: 'row', borderColor: 'grey', width: Dimensions.get('screen').width - 20, justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingBottom: 5 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons style={{ marginLeft: 20, fontSize: 30, color: '#1e1e8e' }} name="md-arrow-round-back" />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', color: '#1e1e8e', fontSize: 22, fontFamily: fontFamily, }}>سيتم استلام مساهمتكم من ...</Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 20, }}>
            <TouchableOpacity onPress={() => this.continue1()} style={{ flexWrap: 'wrap', flexDirection: 'row', padding: 5, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#335389', width: Dimensions.get('screen').width - 30, borderRadius: 15 }}>
              <Image style={{ width: 200, height: 200 }} resizeMode='contain' source={require("../assets/icons-04.png")}></Image>
              <View style={{
                width: 0,
                flexGrow: 1,
                flex: 1
              }}>
                <Text style={{ fontSize: 27, color: textInButton, marginRight: 10, fontFamily: fontFamily, lineHeight: 32 }}>مني شخصيا</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', marginTop: 20, }}>
            <TouchableOpacity onPress={() => this.continue2()} style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-around', alignItems: 'center', width: Dimensions.get('screen').width - 30, backgroundColor: '#335389', borderRadius: 15 }}>
              <View >
                <Image style={{ width: 200, height: 200 }} resizeMode='contain' source={require("../assets/icons-05.png")}></Image>
              </View>
              <View style={{
                width: 0,
                flexGrow: 1,
                flex: 1
              }}>
                <Text style={{ fontSize: 27, color: textInButton, marginRight: 10, fontFamily: fontFamily, lineHeight: 32 }}>من شخص مفوض في نفس العقار</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity onPress={() => this.continue3()} style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-around', alignItems: 'center', width: Dimensions.get('screen').width - 30, backgroundColor: '#84cc00', borderRadius: 15 }}>
              <Image style={{ width: 200, height: 200 }} resizeMode='contain' source={require("../assets/icons-06.png")}></Image>
              <View style={{
                width: 0,
                flexGrow: 1,
                flex: 1
              }}>
                <Text style={{ fontSize: 27, color: textInButton, marginRight: 10, fontFamily: fontFamily, lineHeight: 32 }}>من حارس العقار</Text>
              </View>
            </TouchableOpacity>
          </View>
          </SafeAreaView>
        </ScrollView>
      );
    }
  }
}

RecieveScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  input: {
    textAlign: 'right',
    width: Dimensions.get('screen').width - 30,
    borderWidth: 2,
    marginTop: 20,
    paddingRight: 10,
    height: 50,
    borderRadius: 30
  },
});



const mapStateToProps = ({ user, donations }, props) => {
  return {
    user: user.user,
    donations: donations.list,
  };
};

const mapDispatchToProps = dispatch => ({
  saveUser: (user) => dispatch(actions.saveUser(user)),
  createDonation: (handlingMethod, user, receivingUser, donationDetails) => dispatch(actions.createDonation(handlingMethod, user, receivingUser, donationDetails)),
  changeReceiveMethodOnly: (receiveMethod) => dispatch(actions.changeReceiveMethodOnly(receiveMethod)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecieveScreen);
