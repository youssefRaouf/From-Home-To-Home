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
      message: "",
      render:false
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
    this.props.navigation.navigate("User",{receive:false,title:"بيانات المستخدم"})
  }

  render() {
    if (this.props.user !== null && this.props.user !== '' && this.props.loading&&this.state.render!==true) {
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
      this.state.render=true;
      return (

        <View style={styles.container}>

          <Text style={{ textAlign: 'center', color: 'blue', fontSize: 20 }}>بماذا تريد المساهمة ؟</Text>
          <Text style={{color:'#00004d', fontSize: 20, marginRight: 35 }}>العدد</Text>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem.bind(this)}
            onEndReached={() => {

            }}
            ListFooterComponent={() => {
              return (
                <View>
                  <Item text={""} edit={true}> </Item>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20, marginTop: 10 }}>
                  <TouchableOpacity onPress={() => { this.addType() }}>
                    <FontAwesome name="plus" style={{ color:'#00004d',fontSize: 20, marginRight: 10 }}></FontAwesome>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.removeType() }}>
                    <FontAwesome name="minus" style={{color:'#00004d', fontSize: 20, marginRight: 10 }}></FontAwesome>
                  </TouchableOpacity>
                  <Text style={{ color:'#00004d',fontSize: 20 }}>أخري</Text>
                </View>
                </View>
              );
            }
            }
          />
          <View style={{ alignItems: 'center', marginBottom: 50 }}>
            <TouchableOpacity onPress={() => { this.continue() }} style={{ borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: '#19E363', width: 100, flexDirection: 'row' }}>
              <Entypo name="arrow-bold-left" style={{ fontSize: 20, color: '#00004d' }}></Entypo>
              <Text style={{ fontSize: 25, color: '#00004d' }}>تابع</Text>
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
    backgroundColor: '#e6ffee'
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
