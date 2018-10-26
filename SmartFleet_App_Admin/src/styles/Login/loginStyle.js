import {
    StyleSheet
} from 'react-native';

import { Dimensions } from 'react-native';

export default loginStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    bgImage: {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height / 2) - 30,
    },
    titleView: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height / 2) - 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        fontSize: 50,
        color: '#fff',
        fontWeight: '400',
        fontFamily: 'PingFang SC',
        marginBottom: -3,
    },
    title_: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'PingFang SC',
        marginTop: -3,
    },
    body: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 20,
        alignItems: 'center',
    },
    textView: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        // paddingBottom:10,
        borderColor: '#dfdfdf',
        borderBottomWidth: 1,
    },
    img: {
        width: 20,
        height: 20,
        marginRight: 15,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        padding: 0,
    },
    buttonView_submit: {
        width: Dimensions.get('window').width - 60,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#24ba8e',
    },
    buttonView_code: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#24ba8e',
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: "bold",
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
    },
    spaceView: {
        width: Dimensions.get('window').width - 60,
        height: 40,
        paddingTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    changeTypeLabel: {
        fontSize: 13,
        color: '#24ba8e',
    },
    changeLabel: {
        fontSize: 14,
        color: '#1c1c1d',
    },

})







