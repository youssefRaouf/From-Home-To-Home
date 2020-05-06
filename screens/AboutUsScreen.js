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
  Dimensions,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Item from '../components/Item';
class AboutUsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complain: '',
      number: "01207330798"
    };
  }

  continue() {
    console.log(this.props.number)
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].text === "") {

        return;
      }
    }
    this.props.navigation.navigate("User")
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
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10 }}>
          <Text style={{ fontSize: 15 }}>{this.state.number}</Text>
          <Text style={{ fontSize: 15 }}> اتصل بنا: </Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginRight: 10 }}>
          <Text style={{ fontSize: 15 }}>للشكاوى أو الاستفسار يمكن أن ترسل لنا رسالة :</Text>
          <TextInput
            style={{marginTop:10, textAlignVertical: 'top', backgroundColor: '#A8A8A8', borderRadius: 10, color: 'black', fontSize: 15, marginLeft: 5, textAlign: 'right', padding: 5 }}
            value={this.state.complain}
            onChangeText={complain => this.handleChange(complain)}
            multiline={true}
            numberOfLines={8}
          />
          <View style={{ alignItems: 'center',marginTop:20 }}>
            <TouchableOpacity
              disabled={(this.state.complain === "") ? true : false}
              onPress={() => { this.continue() }}
              style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: (this.state.complain === "") ? '#DDDFE2' : '#19E363', width: 100, flexDirection: 'row' }}>
              {/* <Entypo name="arrow-bold-left" style={{ fontSize: 20, color: 'white' }}></Entypo> */}
              <Text style={{ fontSize: 23, color: 'white' }}>ارسال</Text>
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
    backgroundColor: '#e6ffee'
    // b3ffcc
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
  // fetchPosts: offset => dispatch(actions.fetchPosts(offset)),
  // postsReceived: post => dispatch(actions.postsReceived(post)),
  // getFollowings: (offset, userId) => dispatch(actions.getFollowings(offset, userId)),
});
// export default HomeScreen

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutUsScreen);
