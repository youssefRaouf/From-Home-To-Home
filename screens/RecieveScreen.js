import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import { _storeUser, _storeReceiveMethod } from '../services/Api';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CommonActions } from '@react-navigation/native';
import { backgroundColor, activeButton, textInButton } from '../utils/Colors';

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
    Alert.alert("","شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من البيت")
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
    return (
      <View style={styles.container}>
        <View style={{ paddingRight: 5, marginLeft: 5, flexDirection: 'row', borderBottomWidth: 1.5, borderColor: 'grey', width: Dimensions.get('screen').width - 20, justifyContent: 'space-between', alignItems: 'center',marginTop:10,paddingBottom:5 }}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons style={{ marginLeft: 20, fontSize: 30, color: '#1e1e8e' }} name="md-arrow-round-back" />
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', color: '#1e1e8e', fontSize: 20 }}>سيتم استلام مساهمتكم من ...</Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity onPress={() => this.continue1()} style={{ padding: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: activeButton, width: Dimensions.get('screen').width - 30, height: 40, borderRadius: 15 }}>
            <Text style={{ fontSize: 23, color: textInButton }}>مني شخصيا</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity onPress={() => this.continue2()} style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: Dimensions.get('screen').width - 30, backgroundColor: activeButton, height: 40, borderRadius: 15 }}>
            <Text style={{ fontSize: 23, color: textInButton }}>من شخص مفوض في نفس العقار</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity onPress={() => this.continue3()} style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: Dimensions.get('screen').width - 30, backgroundColor: activeButton, height: 40, borderRadius: 15 }}>
            <Text style={{ fontSize: 23, color: textInButton }}>من حارس العقار</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
