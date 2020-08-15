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
import { backgroundColor, activeButton, textInButton, fontFamily, headerColor } from '../utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
// import GradientButton from 'react-native-gradient-buttons';
import LinearGradient from 'react-native-linear-gradient';

class RecieveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async continue1() {
    this.props.changeReceiveMethodOnly("1")
    await _storeReceiveMethod("1")
const money=this.props.money
    this.props.createDonation(0, this.props.user, this.props.user, this.props.donations,money)
   this.props.setMoney(0)
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

    if (this.props.user === '' || this.props.user === null) {
      return (
        <View style={{ backgroundColor: backgroundColor, justifyContent: 'center', alignItems: 'center', height: Dimensions.get('screen').height }}>
          {/* <Text>LOADING</Text> */}
          <LottieView style={{ alignSelf:'center' }} source={require('../assets/loading3.json')} autoPlay loop />
        </View>
      );
    } else {

      return (
        <ScrollView style={styles.container}>
          <SafeAreaView>
            <View style={{ paddingRight: 5, marginLeft: 5, flexDirection: 'row', borderColor: 'grey', width: Dimensions.get('screen').width - 20, justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingBottom: 5 }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Ionicons style={{ marginLeft: 20, fontSize: 30, color: headerColor }} name="md-arrow-round-back" />
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', color: headerColor, fontSize: 22, fontFamily: fontFamily, }}>سيتم استلام مساهمتكم من ...</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20, }}>
              <TouchableOpacity onPress={() => this.continue1()}>
              <LinearGradient colors={['#4c669f', '#335389', '#192f6a']}  style={{ flexDirection: 'row', height:200, justifyContent: 'space-between', alignItems: 'center', width: Dimensions.get('screen').width - 50, borderRadius: 15 }}>
                <Image style={{ width: 80, height: 100,marginLeft:15 }} resizeMode='center' source={require("../assets/icons-04.png")}></Image>
                <View style={{
                  width: 0,
                  flexGrow: 1,
                  flex: 1
                }}>
                  <Text style={{ fontSize: 25, color: textInButton, paddingRight: 10, fontFamily: fontFamily, lineHeight: 32 }}>مني شخصيا</Text>
                </View>
              </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <TouchableOpacity onPress={() => this.continue2()} style={{justifyContent:'center'}}>
              <LinearGradient colors={['#4c669f', '#335389', '#192f6a']}  style={{  flexDirection: 'row', height:200, justifyContent: 'space-between', alignItems: 'center', width: Dimensions.get('screen').width - 50, borderRadius: 15 }}>
                <View >
                  <Image style={{ width: 100, height: 100,marginLeft:0 }} resizeMode='center' source={require("../assets/cropped.png")}></Image>
                </View>
                <View style={{
                  width: 0,
                  flexGrow: 1,
                  flex: 1
                }}>
                  <Text style={{ fontSize: 25, color: textInButton, fontFamily: fontFamily, lineHeight: 32 ,paddingRight:10}}>من شخص مفوض في نفس العقار</Text>
                </View>
              </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <TouchableOpacity onPress={() => this.continue3()} >
              <LinearGradient colors={['#4c669f', '#335389', '#192f6a']}  style={{  flexDirection: 'row', height:200, justifyContent: 'space-between', alignItems: 'center', width: Dimensions.get('screen').width - 50, borderRadius: 15 }}>
                <Image style={{ width: 100, height: 100,marginLeft:0}} resizeMode='center' source={require("../assets/icons-06.png")}></Image>
                <View style={{
                  width: 0,
                  flexGrow: 1,
                  flex: 1
                }}>
                  <Text style={{ fontSize: 25, color: textInButton, paddingRight:10, fontFamily: fontFamily, lineHeight: 32 }}>من حارس العقار</Text>
                </View>
              </LinearGradient>
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
    money:donations.money
  };
};

const mapDispatchToProps = dispatch => ({
  saveUser: (user) => dispatch(actions.saveUser(user)),
  createDonation: (handlingMethod, user, receivingUser, donationDetails,money) => dispatch(actions.createDonation(handlingMethod, user, receivingUser, donationDetails,money)),
  changeReceiveMethodOnly: (receiveMethod) => dispatch(actions.changeReceiveMethodOnly(receiveMethod)),
  setMoney: (text) => dispatch(actions.setMoney(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecieveScreen);
