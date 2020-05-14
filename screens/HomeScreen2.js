import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as actions from '../Actions';
import Item from '../components/Item';
import { CommonActions } from '@react-navigation/native';

class HomeScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ text: "كيس ارز" }, { text: "كيس ارز" }, { text: "كيس ارز" }],
      showError: false,
      initialLength: 3,
      message: "",
      donations:[]
    };
  }

  componentDidMount(){
    this.getDonations()
  }
  getDonations(){
    this.props.fetchDonations();
  }
  addType() {
    this.props.addType();
  }

  removeType() {
    let arr = this.state.data;
    if (arr.length == 3) {
      return;
    } else {
      arr.splice(arr.length - 1, 1)
    }
    this.setState({ data: arr })
  }

  renderItem(item) {
    item = item.item;
   console.log(item)
    return <Item id={item.id} text={item.item} edit={item.edit || false}> </Item>
  }

  continue() {
    let total=0;
    console.log(this.props.donations)
    console.log(this.props.donations.length)
    for(let i=0;i<this.props.donations.length;i++){
      let item = this.props.donations[i]
   let    count= item.count||0;
        total=total +Number(count);
      // }
    } 
    if(total===0){
      return ;
    }   
    console.log("total number",total)
    this.createTwoButtonAlert();
    // this.props.navigation.navigate("User",{receive:false,title:"بيانات المستخدم"})

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
      ""+message,
      [
      {
        text: "لا",
        onPress: () => {

          if (this.props.receiveMethod === "1") {
            alert("شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من البيت")
          }
          else if (this.props.receiveMethod === "2") {
            alert("شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من شقة المفوض منك")
          } else {
            alert("شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من حارس العقار")
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
    this.state.donations=this.props.donations

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -20, marginRight: 10 }}>
          <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
            <FontAwesome style={{ fontSize: 20 }} name="list-ul"></FontAwesome>
          </TouchableOpacity>
        </View>
        <View >

          <Text style={{ textAlign: 'center', color: 'blue', fontSize: 20 }}>بماذا تريد المساهمة ؟</Text>
        </View>

        <Text style={{ color: '#00004d', fontSize: 20, marginRight: 35 }}>العدد</Text>
        <FlatList
          data={this.state.donations}
          renderItem={this.renderItem.bind(this)}
          onEndReached={() => {

          }}
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
          <TouchableOpacity onPress={() => { this.continue() }} style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: '#19E363', width: 100, flexDirection: 'row' }}>
            <Entypo name="arrow-bold-left" style={{ fontSize: 20, color: '#00004d' }}></Entypo>
            <Text style={{ color: '#00004d', fontSize: 25 }}>تابع</Text>
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
    backgroundColor: '#e6ffee'
    // b3ffcc
  },
});



const mapStateToProps = ({ user, rooms,donations }, props) => {
  // const { activePost, isLoading } = posts;
  return {
    // posts: posts.list || [],
    // post: activePost,
    // isLoading,
    // user:"ss"
    number: rooms.number,
    user: user.user,
    deviceToken: user.deviceToken,
    receiveMethod: user.receiveMethod,
    loading: user.loading,
    donations:donations.list
  };
};

const mapDispatchToProps = dispatch => ({
  // fetchPosts: offset => dispatch(actions.fetchPosts(offset)),
  // postsReceived: post => dispatch(actions.postsReceived(post)),
  fetchDonations: () => dispatch(actions.fetchDonations()),
  addType: () => dispatch(actions.addType()),

  // getFollowings: (offset, userId) => dispatch(actions.getFollowings(offset, userId)),
});
// export default HomeScreen

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen2);
