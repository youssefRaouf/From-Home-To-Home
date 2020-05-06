import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  Alert,
  TextInput,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Item from '../components/Item';
import { _storeUser, _storeReceiveMethod } from '../services/Api';
import { CommonActions } from '@react-navigation/native';
class RecieveScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // nameFocus: false,
      // mobileFocus: false,
      // streetFocus: false,
      // areaFocus: false,
      // mobile1Focus: false,
      // name: "",
      // mobile: "",
      // street: "",
      // area: "",
      // mobile1: "",
      // message: ""

    };
  }
  // changeFocus(type, typeFocus) {
  //   if (typeFocus) {
  //     const text = true
  //     console.log(type)
  //     if (type === "nameFocus") {

  //       this.setState({ nameFocus: text })
  //     }
  //     else if (type === "mobileFocus") {
  //       this.setState({ mobileFocus: text })
  //     }
  //     else if (type === "streetFocus") {
  //       this.setState({ streetFocus: text })
  //     }
  //     else if (type === "areaFocus") {
  //       this.setState({ areaFocus: text })
  //     } else {
  //       this.setState({ mobile1Focus: text })
  //     }

  //   } else {
  //     const text = false
  //     if (type === "nameFocus") {

  //       this.setState({ nameFocus: text })
  //     }
  //     else if (type === "mobileFocus") {
  //       this.setState({ mobileFocus: text })
  //     }
  //     else if (type === "streetFocus") {
  //       this.setState({ streetFocus: text })
  //     }
  //     else if (type === "areaFocus") {
  //       this.setState({ areaFocus: text })
  //     } else {
  //       this.setState({ mobile1Focus: text })
  //     }
  //   }
  // }
  // handleChange(text, type) {
  //   if (type === "name") {
  //     this.setState({ name: text })
  //   }
  //   else if (type === "mobile") {
  //     this.setState({ mobile: text })
  //   }
  //   else if (type === "street") {
  //     this.setState({ street: text })
  //   }
  //   else if (type === "area") {
  //     this.setState({ area: text })
  //   } else {
  //     this.setState({ mobile1: text })
  //   }
  // }
  async continue1() {
  // const area=  this.state.area
  // const name = this.state.name
    // let user = {name:this.state.name,mobile:this.state.mobile,street:this.state.street,area:this.state.area,mobile1:this.state.mobile1}
   await _storeReceiveMethod("1")
    // this.props.navigation.navigate("Links")
    // this.props.saveUser(user);
    console.log("sss")
    alert("شكرا لمساهمتك سيتم تحديد موعد لاستلام تبرعك من البيت")

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
    // const area=  this.state.area
    // const name = this.state.name
      // let user = {name:this.state.name,mobile:this.state.mobile,street:this.state.street,area:this.state.area,mobile1:this.state.mobile1}
    
      await _storeReceiveMethod("2")
      this.props.navigation.push("User",{receive:true,receiveMethod:2,title:"من فضلك ادخل بيانات الشخص المفوض منك :"})
    
      // this.props.navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [
      //       { name: 'Links' },
      //     ],
      //   })
      // );
  
    }
    async continue3() {
      // const area=  this.state.area
      // const name = this.state.name
        // let user = {name:this.state.name,mobile:this.state.mobile,street:this.state.street,area:this.state.area,mobile1:this.state.mobile1}
       await _storeReceiveMethod("3")
      this.props.navigation.push("User",{receive:true,receiveMethod:3,title:"من فضلك ادخل بيانات حارس العقار :"})

        // this.props.navigation.dispatch(
        //   CommonActions.reset({
        //     index: 1,
        //     routes: [
        //       { name: 'Links' },
        //     ],
        //   })
        // );
    
      }
  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems:'flex-end',marginRight:20,marginTop:20}}>
          <Text style={{ textAlign: 'center', color: 'blue', fontSize: 20 }}>سيتم استلام مساهمتكم من ...</Text>
          </View>
          <View style={{alignItems:'center',marginTop:20}}>
       <TouchableOpacity onPress={()=>this.continue1()} style={{padding:5,justifyContent:'center',alignItems:'center',backgroundColor:'#19E363',width:Dimensions.get('screen').width-30,height:40,borderRadius:15}}>
         <Text style={{fontSize:23,color:'#00004d'}}>مني شخصيا</Text>
       </TouchableOpacity>
       </View>
       <View style={{alignItems:'center',marginTop:20}}>
       <TouchableOpacity onPress={()=>this.continue2()} style={{padding:5,justifyContent:'center',alignItems:'center',width:Dimensions.get('screen').width-30,backgroundColor:'#19E363',height:40,borderRadius:15}}>
         <Text style={{fontSize:23,color:'#00004d'}}>من شخص مفوض في نفس العقار</Text>
       </TouchableOpacity>
       </View>
       <View style={{alignItems:'center',marginTop:20}}>
       <TouchableOpacity onPress={()=>this.continue3()} style={{padding:5,justifyContent:'center',alignItems:'center',width:Dimensions.get('screen').width-30,backgroundColor:'#19E363',height:40,borderRadius:15}}>
         <Text style={{fontSize:23,color:'#00004d'}}>من حارس العقار</Text>
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



const mapStateToProps = ({ rooms }, props) => {
  // const { activePost, isLoading } = posts;
  return {
    // posts: posts.list || [],
    // post: activePost,
    // isLoading,
    // user:"ss"
    number: rooms.number
  };
};

const mapDispatchToProps = dispatch => ({
  saveUser: (user) => dispatch(actions.saveUser(user)),
  // postsReceived: post => dispatch(actions.postsReceived(post)),
  // getFollowings: (offset, userId) => dispatch(actions.getFollowings(offset, userId)),
});
// export default HomeScreen

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecieveScreen);