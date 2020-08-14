import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as actions from '../Actions';
import Item from '../components/Item';
import LottieView from 'lottie-react-native';
import ItemInput from '../components/itemInput';
import { backgroundColor, activeButton, textInButton, fontFamily, headerColor } from '../utils/Colors';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      message: "",
      loading: false
    };
  }

  componentDidMount() {
    // this.getDonations()
    // this.addType()
  }

  getDonations() {
    this.props.fetchDonations();
  }

  addType() {
    this.props.addType()
  }

  removeType() {
    this.props.removeType()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.money != this.props.money) {
      return false;
    };
    return true;
  }

  renderItem(item) {
    item = item.item;
    console.log("render")
    return <Item id={item.id} text={item.item} image={item.image} edit={item.edit || false}> </Item>
  }

  continue() {
    let total = 0;
    for (let i = 0; i < this.props.donations.length; i++) {
      if (this.props.donations[i].item === "" && this.props.donations[i].count !== 0) {
        return;
      }
      let item = this.props.donations[i]
      let count = item.count || 0;
      total = total + Number(count);
    }
    if (total === 0 && this.props.money === 0) {
      return;
    }
    console.log("total number", total,this.props.money)
    this.props.navigation.navigate("User", { receive: false, title: "بيانات المستخدم", edit: false })
  }

  render() {
    // if (this.props.donationLoading && !this.state.loading) {
    //   this.state.loading = true
    //   this.addType();
    // }


    return (

      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color: headerColor, fontSize: 25, fontFamily: fontFamily }}>بماذا تريد المساهمة ؟</Text>
        <View style={{ alignItems: 'flex-start', marginLeft: 20 }}>
          <Text style={{ color: headerColor, fontSize: 20, marginRight: 35, fontFamily: fontFamily }}>العدد</Text>
        </View>
        <FlatList
          data={this.props.donations}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => `${index}`}
          ListFooterComponent={() => {
            return (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20, marginTop: 10 }}>
                  <TouchableOpacity style={{ marginRight: 10, backgroundColor: headerColor, justifyContent: 'center', alignItems: 'center', height: 30, width: 30, borderRadius: 15 }} onPress={() => { this.removeType() }}>
                    <FontAwesome name="minus" style={{ color: 'white', fontSize: 20, }}></FontAwesome>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginRight: 10, backgroundColor: headerColor, justifyContent: 'center', alignItems: 'center', height: 30, width: 30, borderRadius: 15 }} onPress={() => { this.addType() }}>
                    <FontAwesome name="plus" style={{ color: 'white', fontSize: 20, }}></FontAwesome>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 20, fontFamily: fontFamily, color: headerColor }}>أخري</Text>
                </View>
                <ItemInput></ItemInput>
              </View>
            );
          }
          }
        />
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => { this.continue() }} style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: activeButton, width: 100, flexDirection: 'row' }}>
            <Entypo name="arrow-bold-left" style={{ fontSize: 30, color: textInButton }}></Entypo>
            <Text style={{ fontSize: 30, color: textInButton, fontFamily: fontFamily, paddingBottom: 5 }}>تابع</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
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
    loading: user.loading,
    donations: donations.list || [],
    donationLoading: donations.loading,
    money: donations.money
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDonations: () => dispatch(actions.fetchDonations()),
  addType: () => dispatch(actions.addType()),
  removeType: () => dispatch(actions.removeType()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
