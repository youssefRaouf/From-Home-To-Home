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
import { backgroundColor, activeButton } from '../utils/Colors';

class AboutUsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      complain: '',
      number: "01207330798"
    };
  }

  continue() {
    this.createComplain(this.props.user,this.state.complain)
    this.setState({complain:''})
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
        <View style={{ paddingRight: 5, marginLeft: 5, flexDirection: 'row', borderBottomWidth: 1.5, borderColor: 'grey', width: Dimensions.get('screen').width - 20, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text style={{ marginTop: 10, marginRight: 10, fontSize: 20, marginLeft: 10, }}>صفحة الدعم</Text>
          <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
            <FontAwesome style={{ fontSize: 20 }} name="list-ul"></FontAwesome>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10,marginTop:10 }}>
          <Text style={{ fontSize: 18,color:'#00004d' }}>{this.state.number}</Text>
          <Text style={{ fontSize: 18,color:'#00004d' }}> اتصل بنا: </Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginRight: 10,marginTop:10 }}>
          <Text style={{ fontSize: 18,color:'#00004d' }}>للشكاوى أو الاستفسار يمكن أن ترسل لنا رسالة :</Text>
          <TextInput
            style={{marginTop:10, textAlignVertical: 'top', backgroundColor: '#E9EBEE', borderRadius: 10, color: 'black', fontSize: 15, marginLeft: 8, textAlign: 'right', padding: 5 }}
            value={this.state.complain}
            placeholder={"اكتب رسالتك ..."}
            onChangeText={complain => this.handleChange(complain)}
            multiline={true}
            numberOfLines={8}
          />
          <View style={{ alignItems: 'center',marginTop:20 }}>
            <TouchableOpacity
              disabled={(this.state.complain === "") ? true : false}
              onPress={() => { this.continue() }}
              style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: (this.state.complain === "") ? '#DDDFE2' : activeButton, width: 100, flexDirection: 'row' }}>
              <Text style={{ padding:3,fontSize: 23, color: '#00004d' }}>ارسال</Text>
            </TouchableOpacity>
          </View>
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



const mapStateToProps = ({  user}, props) => {
  return {
    user: user.user,
  };
};

const mapDispatchToProps = dispatch => ({
  createComplain: (user,complain) => dispatch(actions.createComplain(user,complain)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutUsScreen);
