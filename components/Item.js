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
        this.props.changeNumber(this.props.id, number);
    }
    decrease() {
        let number = this.state.number;
        number = Number(number);
        number--;
        if (number < 0) {
            return;
        }
        this.setState({ number });
        this.props.changeNumber(this.props.id, number);
    }
    handleChange(number) {
        this.setState({ number })
    }
    handleChangeType(type) {
        this.setState({ type })
    }
    handleItemName() {
        this.props.changeName(this.props.id, this.state.type)
    }
    handleInput() {
        if (this.state.number === "") {
            this.setState({ number: 0 })
            this.props.changeNumber(0)
            return;
        }
        this.props.changeNumber(this.state.type, this.state.number)
    }
    render() {
        console.log("hello inside the item")
        return (
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginLeft: 20, marginBottom: 5, borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: '#EDEDED', marginRight: 20 }}>
                <Image resizeMode="center" style={{ width: 100, height: 100, borderRadius: 10 }} source={{ uri: "data:image/png;base64," + this.props.image }}></Image>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', height: 70 }}>
                    {this.state.edit ?
                        <TextInput
                            style={{ color: '#00004d', fontSize: 20, textAlign: 'right' }}
                            value={this.state.type}
                            placeholder="ادخل اسم المنتج..."
                            onChangeText={type => this.handleChangeType(type)}
                            editable={this.state.edit}
                            onEndEditing={() => this.handleItemName()}
                        >
                        </TextInput>
                        : <Text
                            style={{ color: '#00004d', fontSize: 20, textAlign: 'right',marginTop:8 }}  
                        >
                             {this.state.type}</Text>

                    }
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', flex: 1, }}>
                    <TouchableOpacity style={{ backgroundColor: '#E9E9E9', marginTop: 10, height: 30, width: 30, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.increase() }} >
                        <Entypo name="plus" style={{ fontSize: 20 }}></Entypo>
                    </TouchableOpacity>
                    <Text
                        style={{ borderRadius: 10, color: 'black', fontSize: 20, padding: 5,marginLeft:4 }}
                    >{this.state.number}</Text>
                    <TouchableOpacity style={{ backgroundColor: '#E9E9E9', height: 30, width: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.decrease() }}>
                        <Entypo name="minus" style={{ fontSize: 20 }}></Entypo>
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
    return {
    };
};

const mapDispatchToProps = dispatch => ({
    changeNumber: (id, number) => dispatch(actions.changeNumber(id, number)),
    changeName: (id, type) => dispatch(actions.changeName(id, type)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Item);
