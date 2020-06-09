import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as actions from '../Actions';
import Item from '../components/Item';
import { CommonActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { backgroundColor, activeButton, textInButton } from '../utils/Colors';

class HomeScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      message: "",
      loading: false

    };
  }

  getDonations() {
    this.props.fetchDonations();
  }

  addType() {
    this.props.addType();
  }

  removeType() {
    this.props.removeType()

  }

  renderItem(item) {
    return <Item id={item.id} text={item.item} image={item.image} edit={item.edit || false}> </Item>
  }

  continue() {
    let total = 0;
    // console.log(this.props.donations)
    // console.log(this.props.donations.length)
    for (let i = 0; i < this.props.donations.length; i++) {
      if (this.props.donations[i].item === "" && this.props.donations[i].count !== 0) {
        return;
      }
      let item = this.props.donations[i]
      let count = item.count || 0;
      total = total + Number(count);
    }
    if (total === 0) {
      return;
    }
    console.log("total number", total)
    this.createTwoButtonAlert();
  }

  createTwoButtonAlert() {
    console.log(this.props.receiveMethod);
    let message = ""
    if (this.props.receiveMethod === "1") {
      message = " لقد تم استلام مساهمتك السابقة منك هل يوجد أى تغيير فى طريقة التسليم ؟"
    }
    else if (this.props.receiveMethod === "2") {
      message = "لقد تم استلام مساهمتك السابقة من مفوض منك هل يوجد أى تغيير فى طريقة التسليم ؟"
    } else {
      message = "لقد تم استلام مساهمتك السابقة من حارس العقار هل يوجد أى تغيير فى طريقة التسليم ؟"
    }
    Alert.alert(
      "",
      "" + message,
      [
        {
          text: "لا",
          onPress: () => {
            if (this.props.receiveMethod === "1") {

              this.props.createDonation(0, this.props.user, this.props.user, this.props.donations)
              Alert.alert("", "شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من البيت")
              console.log("sss", this.props.delegate)
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Links' },
                  ],
                })
              );
            }
            else if (this.props.receiveMethod === "2") {
              this.props.createDonation(1, this.props.user, this.props.delegate, this.props.donations)
              console.log("sss", this.props.delegate)
              Alert.alert("", "شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من شقة المفوض منك")
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Links' },
                  ],
                })
              );
            } else {
              console.log("delegate", this.props.delegate)
              this.props.createDonation(2, this.props.user, this.props.delegate, this.props.donations)

              Alert.alert("", "شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من حارس العقار")
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Links' },
                  ],
                })
              );
            }
          },
          style: "cancel"
        },
        {
          text: "نعم", onPress: () => {
            this.props.navigation.navigate("Receive")
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: -20, marginLeft: 10 }}>
          <TouchableOpacity style={{ width: 80 }} onPress={() => this.props.navigation.toggleDrawer()}>
            <Foundation style={{ fontSize: 25, color: '#1e1e8e' }} name="list"></Foundation>
          </TouchableOpacity>
        </View>
        <View >
          <Text style={{ textAlign: 'center', color: '#1e1e8e', fontSize: 20 }}>بماذا تريد المساهمة ؟</Text>
        </View>
        <View style={{ alignItems: 'flex-start', marginLeft: 20 }}>
          <Text style={{ color: '#1e1e8e', fontSize: 20, marginRight: 35 }}>العدد</Text>
        </View>
        <FlatList
          data={this.props.donations}
          renderItem={({item})=>this.renderItem(item)}
          keyExtractor={(item, index)=>`${index}`}
          // initialNumToRender={10}
          // maxToRenderPerBatch={20}
          ListFooterComponent={() => {
            return (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20, marginTop: 10 }}>
                  <TouchableOpacity onPress={() => { this.addType() }}>
                    <FontAwesome name="plus" style={{ color: '#00004d', fontSize: 20, marginRight: 10 }}></FontAwesome>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.removeType() }}>
                    <FontAwesome name="minus" style={{ color: '#00004d', fontSize: 20, marginRight: 10 }}></FontAwesome>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 20 }}>أخري</Text>
                </View>
              </View>
            );
          }
          }
        />

        <View style={{ alignItems: 'center', marginBottom: 50 }}>
          <TouchableOpacity onPress={() => { this.continue() }} style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: activeButton, width: 100, flexDirection: 'row' }}>
            <Entypo name="arrow-bold-left" style={{ fontSize: 20, color: textInButton }}></Entypo>
            <Text style={{ color: textInButton, fontSize: 25 }}>تابع</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
HomeScreen2.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: backgroundColor
  },
});

const mapStateToProps = ({ user, donations }, props) => {
  return {
    user: user.user,
    deviceToken: user.deviceToken,
    receiveMethod: user.receiveMethod,
    loading: user.loading,
    donations: donations.list||[],
    donationLoading: donations.loading,
    delegate: user.delegate

  };
};

const mapDispatchToProps = dispatch => ({
  fetchDonations: () => dispatch(actions.fetchDonations()),
  addType: () => dispatch(actions.addType()),
  removeType: () => dispatch(actions.removeType()),
  createDonation: (handlingMethod, user, receivingUser, donationDetails) => dispatch(actions.createDonation(handlingMethod, user, receivingUser, donationDetails)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen2);
