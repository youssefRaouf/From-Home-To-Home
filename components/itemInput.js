import React from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet, Button, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux';
import * as actions from '../Actions';
import { fontFamily, headerColor } from '../utils/Colors';
class ItemInput extends React.Component {
    constructor(props) {
        super(props);
    }
    handleChange(text) {
        this.props.setMoney(text)
    }
    render() {
        return (
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginLeft: 20, marginBottom: 5, borderBottomColor: '#EDEDED', marginRight: 20 }}>
                <Text style={{ fontSize: 20, fontFamily: fontFamily, color: headerColor }}>مبلغ مالي</Text>
                <View style={{ justifyContent: 'center', height: 50, flexGrow: 1, }}>
                    <TextInput
                        style={{ color: headerColor, fontSize: 20, textAlign: 'right', fontFamily: fontFamily,marginRight:20 }}
                        value={this.props.money}
                        keyboardType='numeric'
                        placeholder="ادخل مبلغ مالي..."
                        onChangeText={text => this.handleChange(text)}
                    />
                </View>
                <Text style={{ fontSize: 20, fontFamily: fontFamily, color: headerColor }}>ج.م</Text>
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
const mapStateToProps = ({ donations }, props) => {
    return {
        money: donations.money
    };
};

const mapDispatchToProps = dispatch => ({
    setMoney: (text) => dispatch(actions.setMoney(text)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemInput);
