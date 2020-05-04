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
import { CommonActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ text: "كيس ارز" }, { text: "كيس ارز" }, { text: "كيس ارز" }],
      showError: false,
      initialLength: 3,
      message: ""
    };
  }

  addType() {
    let arr = this.state.data;
    arr.push({ text: "", edit: true })
    this.setState({ data: arr })
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
    return <Item text={item.text} edit={item.edit || false}> </Item>
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

  render() {
    if (this.props.user !== null && this.props.user !== '' && this.props.loading) {
      // this.props.navigation.reset({index:0})
      // this.props.navigation.replace('Links')
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Links' },
          ],
        })
      );
      return null;
    }
    else if (!this.props.loading) {
      return (
        <View style={{ backgroundColor:'#ccffdc',justifyContent: 'center', alignItems: 'center',height:Dimensions.get('screen').height }}>
          <Text>LOADING</Text>
         <LottieView source={require('../assets/loading.json')} autoPlay loop />
        </View>
      );
    } else {
      return (

        <View style={styles.container}>

          <Text style={{ textAlign: 'center', color: 'blue', fontSize: 20 }}>بماذا تريد المساهمة ؟</Text>
          <Text style={{ fontSize: 20, marginRight: 35 }}>العدد</Text>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem.bind(this)}
            onEndReached={() => {

            }}
            ListFooterComponent={() => {
              return (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20, marginTop: 10 }}>
                  <TouchableOpacity onPress={() => { this.addType() }}>
                    <FontAwesome name="plus" style={{ fontSize: 20, marginRight: 10 }}></FontAwesome>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.removeType() }}>
                    <FontAwesome name="minus" style={{ fontSize: 20, marginRight: 10 }}></FontAwesome>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 20 }}>أخري</Text>
                </View>
              );
            }
            }
          />
          <View style={{ alignItems: 'center', marginBottom: 50 }}>
            <TouchableOpacity onPress={() => { this.continue() }} style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: 'grey', width: 100, flexDirection: 'row' }}>
              <Text style={{ fontSize: 25, color: 'white' }}>تابع</Text>
              <Entypo name="arrow-bold-right" style={{ fontSize: 20, color: 'white' }}></Entypo>
            </TouchableOpacity>
          </View>
        
        </View>

      );
    }
  }
}
HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#ccffdc'
    // b3ffcc
  },
});



const mapStateToProps = ({ user, rooms }, props) => {
  // const { activePost, isLoading } = posts;
  return {
    // posts: posts.list || [],
    // post: activePost,
    // isLoading,
    // user:"ss"
    number: rooms.number,
    user: user.user,
    deviceToken: user.deviceToken,
    loading: user.loading
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
)(HomeScreen);
