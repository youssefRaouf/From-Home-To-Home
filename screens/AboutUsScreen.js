import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
    Alert,
    Linking,
    SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import { backgroundColor, activeButton, textInButton, fontFamily, fontFamilyBold, headerColor } from '../utils/Colors';
import { ScrollView } from 'react-native-gesture-handler';

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
            <ScrollView style={styles.container}>
            <SafeAreaView >
                <View style={{ paddingRight: 5, marginLeft: 5, flexDirection: 'row', borderColor: 'grey', width: Dimensions.get('screen').width - 20, justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: 80 }} onPress={() => this.props.navigation.toggleDrawer()}>
                        <Foundation style={{ marginLeft: 5, fontSize: 30, color: headerColor }} name="list"></Foundation>
                    </TouchableOpacity>
                    <Text style={{ color: headerColor, marginTop: 10, marginRight: 10, fontSize: 30, marginLeft: 10, fontFamily: fontFamily }}>من نحن</Text>
                </View>
                <Text style={{direction:'rtl', lineHeight:25,color: headerColor, marginTop: 10, marginRight: 10, fontSize: 20, marginLeft: 10, fontFamily: fontFamily }}>هيئة شباب الأسكندرية هى هيئة مسيحية تحت سنودس النيل الإنجيلى ، المجمع الأعلى للكنائس الإنجيلية فى مصر.
                نحن نقوى التضامن بين الناس فى مجتمعنا و نشجع الكنائس المحلية أن تعطى يد و تظهر الرحمة للمحتاجين بلا تفرقة .
                هذا التطبيق يسهل للمتبرعين أن يساهموا بالمواد التموينية الصالحة و هيئة شباب الأسكندرية تجمع هذه المواد التموينية و تعيد توزيعها للأشخاص المحتاجين فى مناطق مختلفة فى مدن و قرى الأسكندرية و الدلتا.
                
                </Text>
                <Text style={{ color: headerColor, marginTop: 10, marginRight: 10, fontSize: 20, marginLeft: 10, fontFamily: fontFamily }}>
                للمزيد عن المعلومات عنا ، من فضلك قم بزارة موقعنا :
                </Text>
                <View style={{ marginLeft: 10, width: Dimensions.get('window').width, justifyContent: 'center' }}>
                    <Text style={{ color: 'blue', fontSize: 20, fontFamily: fontFamily }}
                        onPress={() => Linking.openURL('https://www.the-ayc.com/')}>
                         www.the-ayc.com
                </Text>
                </View>
                <Text style={{ color: headerColor, marginTop: 10, marginRight: 10, fontSize: 20, marginLeft: 10, fontFamily: fontFamily }}>
                    This application owned by Alexandria Youth Committee AYC, a Christian organization subordinate to Synod of the Nile which is the main authority of evangelical churches in Egypt.
                    We are increasing solidarity between people in the society and helping local churches to give a hand and show mercy for the needy without discrimination.
                    This application facilitates the process to the donors to share valid food supplies, and we as an organization we redistribute it among needy people in different rural and urban areas in Alexandria and Delta.
                </Text>
                <Text style={{ color: headerColor, marginTop: 10, marginRight: 10, fontSize: 20, marginLeft: 10, fontFamily: fontFamily }}>
                For more information kindly visit our website :
                </Text>
                <Text style={{ marginLeft:10,color: 'blue', fontSize: 20, fontFamily: fontFamily ,marginBottom:20}}
                    onPress={() => Linking.openURL('https://www.the-ayc.com/')}>
                     www.the-ayc.com
                </Text>
            </SafeAreaView>
            </ScrollView>
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
