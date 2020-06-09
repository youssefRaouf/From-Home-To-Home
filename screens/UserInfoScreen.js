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

import { backgroundColor,activeButton } from '../utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';

class UserInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log("el data", this.props.user)
    return (
      <ScrollView style={styles.container}>
        <View style={{ paddingRight: 5, marginLeft: 5, flexDirection: 'row', borderBottomWidth: 1.5, borderColor: 'grey', width: Dimensions.get('screen').width - 20, justifyContent:'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={{width:80}} onPress={() => this.props.navigation.toggleDrawer()}>
        <Foundation style={{ marginLeft:5,fontSize: 25,color:'#1e1e8e' }} name="list"></Foundation>
          </TouchableOpacity>
          <Text style={{ color:'#1e1e8e',marginTop: 10, marginRight: 10, fontSize: 20, marginLeft: 10, marginBottom: 5 }}>بيانات المستخدم</Text>
         
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <View style={{ alignItems: 'center', backgroundColor: '#363685', width: 200, borderRadius: 100, height: 210 }}>
            <FontAwesome style={{ fontSize: 200, color: 'white' }} name="user" />
          </View>
        </View>
        <View style={{ backgroundColor: 'white', margin: 10 }}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("User", { receive:true,update: true, title: "تجديد بيانات المستخدم" })}}>
            <MaterialIcons style={{ color: '#1e1e8e', fontSize: 25, marginLeft: 10, marginTop: 10 }} name="edit"></MaterialIcons>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text>الاسم :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 }}>
              <Text style={{padding:5, marginRight: 20, fontSize: 17 }}>{this.props.user.name}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text>رقم التليفون الأساسي :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 }}>
              <Text style={{ padding:5,marginRight: 20, fontSize: 17 }}>{this.props.user.phone1}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text>العنوان :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 }}>
              <Text style={{ padding:5,marginRight: 20, fontSize: 17 }}>{this.props.user.address1}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text>رقم التليفون البديل :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 }}>
              <Text style={{ padding:5,marginRight: 20, fontSize: 17 }}>{this.props.user.phone2}</Text>
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
    user: user.user
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfoScreen);
