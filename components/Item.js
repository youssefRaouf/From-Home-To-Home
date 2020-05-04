import React from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet, Button, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux';
import * as actions from '../Actions';
class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            edit: this.props.edit || false,
            type: this.props.text
        };
    }
    increase() {
        let number = this.state.number;
        number = Number(number);
        number++;
        this.setState({ number });
        // this.props.changeNumber(this.state.type,number);
    }
    decrease() {
        let number = this.state.number;
        number = Number(number);
        number--;
        if (number < 0) {
            return;
        }
        this.setState({ number });
        // this.props.changeNumber(this.state.type,number);
    }
    handleChange(number) {
        this.setState({ number })
    }
    handleChangeType(type) {
        this.setState({ type })
    }
    handleInput() {
        if (this.state.number === "") {
            this.setState({ number: 0 })
            this.props.changeNumber(0)
            return;
        }
        this.props.changeNumber(this.state.type,this.state.number)
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    style={{ borderRadius: 10, borderWidth: 1, padding: 5, marginRight: 10, fontSize: 20, width: Dimensions.get('screen').width - 100, textAlign: 'center' }}
                    value={this.state.type}
                    onChangeText={type => this.handleChangeType(type)}
                    editable={this.state.edit}
                >
                </TextInput>

                
                <View style={{ flexDirection: 'column',justifyContent:'center',alignItems:'center' }}>
                    <TouchableOpacity style={{backgroundColor:'white',marginTop:10,height:30,width:30,borderWidth:1,borderRadius:30,alignItems:'center',justifyContent:'center'}} onPress={() => { this.increase() }} >
                        <Entypo name="plus" style={{ fontSize: 20 }}></Entypo>
                    </TouchableOpacity>
                    <TextInput
                    style={{ borderRadius: 10, color: 'black', fontSize: 20, textAlign: 'center', padding: 5 }}
                    value={"" + this.state.number}
                    onChangeText={number => this.handleChange(number)}
                    keyboardType="numeric"
                    editable={false}
                    onEndEditing={() => this.handleInput()}
                />
                    <TouchableOpacity style={{backgroundColor:'white',height:30,width:30,borderWidth:1,borderRadius:15,alignItems:'center',justifyContent:'center'}} onPress={() => { this.decrease() }}>
                        <Entypo name="minus" style={{ fontSize: 20}}></Entypo>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#1F1F1F',
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
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
    changeNumber: (text,number) => dispatch(actions.changeNumber(text,number)),
    // postsReceived: post => dispatch(actions.postsReceived(post)),
    // getFollowings: (offset, userId) => dispatch(actions.getFollowings(offset, userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Item);
