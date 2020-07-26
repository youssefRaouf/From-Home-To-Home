import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import { backgroundColor, activeButton, textInButton, fontFamily, fontFamilyBold, headerColor } from '../utils/Colors';

class AboutUsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      complain: '',
      number: "01275321274"
    };
  }

  continue() {
    this.createComplain(this.props.user, this.state.complain)
    this.setState({ complain: '' })
    Alert.alert(
      "",
      "تم توصيل رسالتك بنجاح")
  }

  handleChange(complain) {
    this.setState({ complain })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingRight: 5, marginLeft: 5, flexDirection: 'row', borderColor: 'grey', width: Dimensions.get('screen').width - 20, justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={{width:80}} onPress={() => this.props.navigation.toggleDrawer()}>
            <Foundation style={{ marginLeft:5,fontSize: 30, color: headerColor }} name="list"></Foundation>
          </TouchableOpacity>
          <Text style={{ color:headerColor,marginTop: 10, marginRight: 10, fontSize: 30, marginLeft: 10,fontFamily:fontFamily}}>صفحة الدعم</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: '#00004d',fontFamily:fontFamily }}>{this.state.number}</Text>
          <Text style={{ fontSize: 18, color: '#00004d' ,fontFamily:fontFamily}}> اتصل بنا: </Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginRight: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: '#00004d' ,fontFamily:fontFamily}}>للشكاوى أو الاستفسار يمكن أن ترسل لنا رسالة :</Text>
        </View>
        <View style={{alignItems:'center'}}>
        <TextInput
            style={{ fontFamily:fontFamily,marginTop: 10, textAlignVertical: 'top', backgroundColor: '#DDDFE2', borderRadius: 10, color: 'black', fontSize: 15, textAlign: 'right', padding: 5, width:Dimensions.get('window').width-20,paddingRight:10,paddingTop:5 }}
            value={this.state.complain}
            placeholder={"اكتب رسالتك ..."}
            onChangeText={complain => this.handleChange(complain)}
            multiline={true}
            numberOfLines={8}
          />
          </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity
              disabled={(this.state.complain === "") ? true : false}
              onPress={() => { this.continue() }}
              style={{height:50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: (this.state.complain === "") ? '#DDDFE2' : activeButton, width:Dimensions.get('window').width-20, flexDirection: 'row' }}>
              <Text style={{ padding: 3, fontSize: 23, color: textInButton,fontFamily:fontFamily }}>ارسال</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

AboutUsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
});



const mapStateToProps = ({ user }, props) => {
  return {
    user: user.user,
  };
};

const mapDispatchToProps = dispatch => ({
  createComplain: (user, complain) => dispatch(actions.createComplain(user, complain)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutUsScreen);
