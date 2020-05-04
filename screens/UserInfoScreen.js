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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
class UserInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log("el data",this.props.user)
    return (
      <View style={styles.container}>
        <View style={{ paddingRight: 5, marginLeft: 5, flexDirection: 'row', borderBottomWidth: 1.5, borderColor: 'grey', width: Dimensions.get('screen').width - 20, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text style={{ marginTop: 10, marginRight: 10, fontSize: 20, marginLeft: 10, marginBottom: 5 }}>بيانات المستخدم</Text>
          <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
            <FontAwesome style={{ fontSize: 20 }} name="list-ul"></FontAwesome>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <View style={{ alignItems: 'center', backgroundColor: '#4CE964', width: 200, borderRadius: 100, height: 210 }}>
            <FontAwesome style={{ fontSize: 200, color: 'white' }} name="user" />
          </View>
        </View>
        <View style={{ backgroundColor: 'white', margin: 10 }}>
          <TouchableOpacity>
            <MaterialIcons style={{ color: 'black', fontSize: 20, marginLeft: 10, marginTop: 10 }} name="edit"></MaterialIcons>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text>الاسم :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 }}>
              <Text style={{ marginRight: 20, fontSize: 17 }}>{this.props.user.name}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text>رقم التليفون الأساسي :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 }}>
              <Text style={{ marginRight: 20, fontSize: 17 }}>{this.props.user.mobile}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text>الشارع :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 }}>
              <Text style={{ marginRight: 20, fontSize: 17 }}>{this.props.user.street}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text>المنطقة :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 }}>
              <Text style={{ marginRight: 20, fontSize: 17 }}>{this.props.user.area}</Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text>رقم التليفون البديل :</Text>
            <View style={{ backgroundColor: '#E4ECEE', borderRadius: 10 }}>
              <Text style={{ marginRight: 20, fontSize: 17 }}>{this.props.user.mobile1}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
UserInfoScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccffdc'
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



const mapStateToProps = ({ rooms, user }, props) => {
  // const { activePost, isLoading } = posts;
  return {
    // posts: posts.list || [],
    // post: activePost,
    // isLoading,
    // user:"ss"
    number: rooms.number,
    user: user.user
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
)(UserInfoScreen);
