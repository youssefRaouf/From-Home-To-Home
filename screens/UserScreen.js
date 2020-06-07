import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  Keyboard,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import Entypo from 'react-native-vector-icons/Entypo'
import { CommonActions } from '@react-navigation/native';
import { _storeDelegate } from '../services/Api';
import { backgroundColor, activeTextBox, activeButton } from '../utils/Colors';

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFocus: false,
      mobileFocus: false,
      streetFocus: false,
      areaFocus: false,
      mobile1Focus: false,
      mobileVerifyFocus: false,
      name: "",
      mobile: "",
      street: "",
      area: "",
      mobile1: "",
      message: "",
      coordinates: "",
      mobileVerify: ""
    };
  }

  changeFocus(type, typeFocus) {
    if (typeFocus) {
      const text = true
      console.log(type)
      if (type === "nameFocus") {
        this.setState({ nameFocus: text })
      }
      else if (type === "mobileFocus") {
        this.setState({ mobileFocus: text })
      }
      else if (type === "mobileVerifyFocus") {
        this.setState({ mobileVerifyFocus: text })
      }
      else if (type === "streetFocus") {
        this.setState({ streetFocus: text })
      }
      else if (type === "areaFocus") {
        this.setState({ areaFocus: text })
      } else {
        this.setState({ mobile1Focus: text })
      }
    } else {
      const text = false
      if (type === "nameFocus") {
        this.setState({ nameFocus: text })
      }
      else if (type === "mobileFocus") {
        this.setState({ mobileFocus: text })
      }
      else if (type === "mobileVerifyFocus") {
        this.setState({ mobileVerifyFocus: text })
      }
      else if (type === "streetFocus") {
        this.setState({ streetFocus: text })
      }
      else if (type === "areaFocus") {
        this.setState({ areaFocus: text })
      } else {
        this.setState({ mobile1Focus: text })
      }
    }
  }
  componentDidMount() {
    this.findCoordinates()
  }

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const location = position
        console.log("location", location.coords)
        const coordinates = location.coords.latitude + "," + location.coords.longitude;
        this.setState({ coordinates })

      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  handleChange(text, type) {
    console.log(type)
    if (type === "name") {
      this.setState({ name: text })
    }
    else if (type === "mobile") {
      console.log(":D")
      this.setState({ mobile: text })
    }
    else if (type === "street") {
      this.setState({ street: text })
    }
    else if (type === "area") {
      this.setState({ area: text })
    }
    else if (type === "mobile1") {
      this.setState({ mobile1: text })
    }
    else {
      console.log("ss")
      this.setState({ mobileVerify: text })
    }
  }

  async continue() {
    //  this.findCoordinates();
    if (!this.props.route.params.receive) {
      let user = { coordinates: this.state.coordinates, name: this.state.name, mobile: this.state.mobile, street: this.state.street, area: this.state.area, mobile1: this.state.mobile1 }
      this.props.createUser(user, this.props.deviceToken);
      this.props.navigation.navigate('Receive')
    }
  else  if(this.props.route.params.update){
      let user = { coordinates: this.state.coordinates, name: this.state.name, mobile: this.state.mobile, street: this.state.street, area: this.state.area, mobile1: this.state.mobile1 }
        this.props.updateUser(this.props.user.code,user,this.props.deviceToken)
        this.props.navigation.navigate('بيانات المستخدم')
        return;
      } 
    else {
      
       if (this.props.route.params.receiveMethod === 2) {
        this.props.changeReceiveMethod("2", { name: this.state.name, mobile: this.state.mobile },1, this.props.user, this.props.donations)

        alert("شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من شقة المفوض منك")
      } else {
        this.props.changeReceiveMethod("3", { name: this.state.name, mobile: this.state.mobile },2, this.props.user, this.props.donations)
        //  
        alert("شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من حارس العقار")
      }
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Links' },
          ],
        })
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 10, marginRight: 10, borderBottomWidth: 1.5, fontSize: 20, marginLeft: 10, borderColor: 'grey' }}>{this.props.route.params.title}</Text>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={{ ...styles.input, borderColor: this.state.nameFocus ? activeTextBox : '#a7b2b5' }}
            value={this.state.name}
            onChangeText={type => this.handleChange(type, "name")}
            placeholder={"الاسم"}
            onEndEditing={() => this.changeFocus("nameFocus", false)}
            onFocus={() => this.changeFocus("nameFocus", true)}
          >
          </TextInput>
          <TextInput
            style={{ ...styles.input, borderColor: this.state.mobileFocus ? activeTextBox :this.state.mobile!==""&&this.state.mobile.length!==11?'red': '#a7b2b5' }}
            value={this.state.mobile}
            onChangeText={type => this.handleChange(type, "mobile")}
            placeholder={"رقم التليفون الأساسي"}
            contextMenuHidden={true}
            keyboardType='numeric'
            onEndEditing={() => this.changeFocus("mobileFocus", false)}
            onFocus={() => this.changeFocus("mobileFocus", true)}
          >
          </TextInput>
          <TextInput
            style={{ ...styles.input, borderColor: this.state.mobileVerifyFocus ? activeTextBox : this.state.mobileVerify !== "" && this.state.mobileVerify !== this.state.mobile ? 'red' : '#a7b2b5' }}
            value={this.state.mobileVerify}
            onChangeText={type => this.handleChange(type, "mobileVerify")}
            placeholder={"تأكيد رقم التليفون"}
            contextMenuHidden={true}
            keyboardType='numeric'
            onEndEditing={() => this.changeFocus("mobileVerifyFocus", false)}
            onFocus={() => this.changeFocus("mobileVerifyFocus", true)}
          >
          </TextInput>
          {!this.props.route.params.receive ||this.props.route.params.update?
            <TextInput
              style={{ ...styles.input, borderColor: this.state.streetFocus ? activeTextBox : '#a7b2b5' }}
              value={this.state.street}
              onChangeText={type => this.handleChange(type, "street")}
              placeholder={"الشارع"}
              onEndEditing={() => this.changeFocus("streetFocus", false)}
              onFocus={() => this.changeFocus("streetFocus", true)}
            >
            </TextInput>
            : null
          }
          {!this.props.route.params.receive ||this.props.route.params.update?
            <TextInput
              style={{ ...styles.input, borderColor: this.state.areaFocus ? activeTextBox : '#a7b2b5' }}
              value={this.state.area}
              onChangeText={type => this.handleChange(type, "area")}
              placeholder={"المنطقة"}
              onEndEditing={() => this.changeFocus("areaFocus", false)}
              onFocus={() => this.changeFocus("areaFocus", true)}
            >
            </TextInput>
            : null}
          {!this.props.route.params.receive ||this.props.route.params.update ?
            <TextInput
              style={{ ...styles.input, borderColor: this.state.mobile1Focus ? activeTextBox :this.state.mobile1!==""&&this.state.mobile1.length!==11?'red': '#a7b2b5' }}
              value={this.state.mobile1}
              onChangeText={type => this.handleChange(type, "mobile1")}
              placeholder={"رقم تليفون بديل"}
              keyboardType='numeric'
              onEndEditing={() => this.changeFocus("mobile1Focus", false)}
              onFocus={() => this.changeFocus("mobile1Focus", true)}
            >
            </TextInput>
            : null}
          <Text style={{ margin: 10, fontSize: 15 }}>إذا كان مكانك الحالى هو مكان التسليم من الأفضل فتح ال location لسهولة الوصول إليك</Text>
        </View>
        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', marginBottom: 50, marginTop: 50 }}>
          <TouchableOpacity
            disabled={(this.state.mobile === "" || this.state.name === "") ? true : false}
            onPress={() => { this.continue() }}
            style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: (this.state.mobile === "" || this.state.name === ""||this.state.mobile!==this.state.mobileVerify||this.state.mobile.length!==11) ? '#DDDFE2' : activeButton, width: 100, flexDirection: 'row' }}>
            <Entypo name="arrow-bold-left" style={{ fontSize: 20, color: '#00004d' }}></Entypo>
            <Text style={{ fontSize: 25, color: '#00004d' }}>تابع</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this.props.navigation.goBack() }}
            style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: activeButton, width: 100, flexDirection: 'row' }}>
            <Text style={{ fontSize: 25, color: '#00004d' }}>السابق</Text>
            <Entypo name="arrow-bold-right" style={{ fontSize: 20, color: '#00004d' }}></Entypo>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

UserScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor
    // b3ffcc
  },
  input: {
    // b3ffcc
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
    deviceToken: user.deviceToken,
    donations: donations.list,
    delegate: user.delegate,
    delegateLoading:user.delegateLoading
  };
};

const mapDispatchToProps = dispatch => ({
  updateUser: (code,user, deviceToken) => dispatch(actions.updateUser(code,user, deviceToken)),
  createUser: (user, deviceToken) => dispatch(actions.createUser(user, deviceToken)),
  createDonation: (handlingMethod, user, receivingUser, donationDetails) => dispatch(actions.createDonation(handlingMethod, user, receivingUser, donationDetails)),
  changeReceiveMethod: (receiveMethod, delegate,handlingMethod, user, donationDetails) => dispatch(actions.changeReceiveMethod(receiveMethod, delegate,handlingMethod, user, donationDetails)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserScreen);
