import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import LottieView from 'lottie-react-native';
import { backgroundColor,activeButton, fontFamily, headerColor } from '../utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';

class UserInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log("el data", this.props.user,this.props.loading)
    if (this.props.user === '' || this.props.user === null||this.props.loading===true) {
      return (
        <View style={{ backgroundColor: backgroundColor, justifyContent: 'center', alignItems: 'center', height: Dimensions.get('screen').height }}>
          {/* <Text>LOADING</Text> */}
          <LottieView style={{ alignSelf:'center' }} source={require('../assets/loading3.json')} autoPlay loop />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View style={{ paddingRight: 5, marginLeft: 5, flexDirection: 'row', borderColor: 'grey', width: Dimensions.get('screen').width - 20, justifyContent:'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={{width:80}} onPress={() => this.props.navigation.toggleDrawer()}>
        <Foundation style={{ marginLeft:5,fontSize: 30,color:headerColor }} name="list"></Foundation>
          </TouchableOpacity>
          <Text style={{ color:headerColor,marginTop: 10, marginRight: 10, fontSize: 30, marginLeft: 10, marginBottom: 5,fontFamily:fontFamily }}>بيانات المستخدم</Text>
         
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <View style={{ alignItems: 'center', backgroundColor: headerColor, width: 200, borderRadius: 100, height: 210 }}>
            <FontAwesome style={{ fontSize: 200, color: 'white' }} name="user" />
          </View>
        </View>
        <View style={{ backgroundColor: 'white', margin: 10 }}>
          <TouchableOpacity style={{backgroundColor:headerColor,width:50,justifyContent:'center',alignItems:'center',height:50,borderRadius:25}} onPress={()=>{this.props.navigation.navigate("User", { receive:true,update: true, title: "تجديد بيانات المستخدم" ,user:this.props.user,edit:true})
        console.log(this.props.user)}}>
            <MaterialIcons style={{ color: 'white', fontSize: 25 }} name="edit"></MaterialIcons>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={{fontFamily:fontFamily}}>الاسم :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10,marginTop:5 }}>
              <Text style={{color:'grey', padding:5, marginRight: 10, fontSize: 17 ,textAlign:'right',fontFamily:fontFamily}}>{this.props.user.name}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontFamily:fontFamily}}>رقم التليفون الأساسي :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10,marginTop:5 }}>
              <Text style={{ color:'grey',padding:5,marginRight: 10, fontSize: 17 ,textAlign:'right',fontFamily:fontFamily}}>{this.props.user.phone1}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontFamily:fontFamily}}>الشارع :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 ,marginTop:5}}>
              <Text style={{ color:'grey',padding:5,marginRight: 10, fontSize: 17,textAlign:'right',fontFamily:fontFamily }}>{this.props.user.address1}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontFamily:fontFamily}}>الحي أو المنطقة :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 ,marginTop:5}}>
              <Text style={{ color:'grey',padding:5,marginRight: 10, fontSize: 17,textAlign:'right',fontFamily:fontFamily }}>{this.props.user.neigberhood1}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontFamily:fontFamily}}>المحافظة :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 ,marginTop:5}}>
              <Text style={{ color:'grey',padding:5,marginRight: 10, fontSize: 17,textAlign:'right',fontFamily:fontFamily }}>{this.props.user.governorate1}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={{fontFamily:fontFamily}}>رقم التليفون البديل :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 ,marginTop:5}}>
              <Text style={{ color:'grey',padding:5,marginRight: 10, fontSize: 17,textAlign:'right',fontFamily:fontFamily }}>{this.props.user.phone2}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

UserInfoScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor
    // b3ffcc
  },
  textContainer: {
    margin: 10,
    marginTop: 0
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



const mapStateToProps = ({ user }, props) => {
  return {
    user: user.user,
    loading:user.loading
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfoScreen);
