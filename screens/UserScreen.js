import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import Entypo from 'react-native-vector-icons/Entypo'
import { CommonActions } from '@react-navigation/native';

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFocus: false,
      mobileFocus: false,
      streetFocus: false,
      areaFocus: false,
      mobile1Focus: false,
      name: "",
      mobile: "",
      street: "",
      area: "",
      mobile1: "",
      message: ""
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

  handleChange(text, type) {
    if (type === "name") {
      this.setState({ name: text })
    }
    else if (type === "mobile") {
      this.setState({ mobile: text })
    }
    else if (type === "street") {
      this.setState({ street: text })
    }
    else if (type === "area") {
      this.setState({ area: text })
    } else {
      this.setState({ mobile1: text })
    }
  }

  async continue() {
    if (!this.props.route.params.receive) {
      let user = { name: this.state.name, mobile: this.state.mobile, street: this.state.street, area: this.state.area, mobile1: this.state.mobile1 }
      this.props.createUser(user, this.props.deviceToken);
      this.props.navigation.navigate('Receive')
    } else {
      if (this.props.route.params.receiveMethod === 2) {
        this.props.createDonation(1, this.props.user, { name: this.state.name, mobile: this.state.mobile }, this.props.donations)
        alert("شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من شقة المفوض منك")
      } else {
        this.props.createDonation(2, this.props.user, { name: this.state.name, mobile: this.state.mobile }, this.props.donations)
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
            style={{ ...styles.input, borderColor: this.state.nameFocus ? '#4287f5' : '#a7b2b5' }}
            value={this.state.name}
            onChangeText={type => this.handleChange(type, "name")}
            placeholder={"الاسم"}
            onEndEditing={() => this.changeFocus("nameFocus", false)}
            onFocus={() => this.changeFocus("nameFocus", true)}
          >
          </TextInput>
          <TextInput
            style={{ ...styles.input, borderColor: this.state.mobileFocus ? '#4287f5' : '#a7b2b5' }}
            value={this.state.mobile}
            onChangeText={type => this.handleChange(type, "mobile")}
            placeholder={"رقم التليفون الأساسي"}
            keyboardType='numeric'
            onEndEditing={() => this.changeFocus("mobileFocus", false)}
            onFocus={() => this.changeFocus("mobileFocus", true)}
          >
          </TextInput>
          {!this.props.route.params.receive ?
            <TextInput
              style={{ ...styles.input, borderColor: this.state.streetFocus ? '#4287f5' : '#a7b2b5' }}
              value={this.state.street}
              onChangeText={type => this.handleChange(type, "street")}
              placeholder={"الشارع"}
              onEndEditing={() => this.changeFocus("streetFocus", false)}
              onFocus={() => this.changeFocus("streetFocus", true)}
            >
            </TextInput>
            : null
          }
          {!this.props.route.params.receive ?
            <TextInput
              style={{ ...styles.input, borderColor: this.state.areaFocus ? '#4287f5' : '#a7b2b5' }}
              value={this.state.area}
              onChangeText={type => this.handleChange(type, "area")}
              placeholder={"المنطقة"}
              onEndEditing={() => this.changeFocus("areaFocus", false)}
              onFocus={() => this.changeFocus("areaFocus", true)}
            >
            </TextInput>
            : null}
          {!this.props.route.params.receive ?
            <TextInput
              style={{ ...styles.input, borderColor: this.state.mobile1Focus ? '#4287f5' : '#a7b2b5' }}
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
            style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: (this.state.mobile === "" || this.state.name === "") ? '#DDDFE2' : '#19E363', width: 100, flexDirection: 'row' }}>
            <Entypo name="arrow-bold-left" style={{ fontSize: 20, color: '#00004d' }}></Entypo>
            <Text style={{ fontSize: 25, color: '#00004d' }}>تابع</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this.props.navigation.goBack() }}
            style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: '#19E363', width: 100, flexDirection: 'row' }}>
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
    backgroundColor: '#e6ffee'
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
    donations: donations.list
  };
};

const mapDispatchToProps = dispatch => ({
  createUser: (user, deviceToken) => dispatch(actions.createUser(user, deviceToken)),
  createDonation: (handlingMethod, user, receivingUser, donationDetails) => dispatch(actions.createDonation(handlingMethod, user, receivingUser, donationDetails)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserScreen);
