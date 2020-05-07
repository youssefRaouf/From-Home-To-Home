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

class IntroductionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  continue() {
    if (this.props.user !== null && this.props.user !== '') {
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
    }
    else{
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Home' },
          ],
        })
      );
  
  }
}

  render() {
    // if (this.props.user !== null && this.props.user !== '' && this.props.loading&&this.state.render!==true) {
    //   // this.props.navigation.reset({index:0})
    //   // this.props.navigation.replace('Links')
    //   this.props.navigation.dispatch(
    //     CommonActions.reset({
    //       index: 1,
    //       routes: [
    //         { name: 'Links' },
    //       ],
    //     })
    //   );
    //   return null;
    // }
    // else if (!this.props.loading) {
    //   return (
    //     <View style={{ backgroundColor:'#ccffdc',justifyContent: 'center', alignItems: 'center',height:Dimensions.get('screen').height }}>
    //       <Text>LOADING</Text>
    //      <LottieView source={require('../assets/loading.json')} autoPlay loop />
    //     </View>
    //   );
    // } else {
    //   this.state.render=true;
    return (

      <View style={styles.container}>

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

IntroductionScreen.navigationOptions = {
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
)(IntroductionScreen);
