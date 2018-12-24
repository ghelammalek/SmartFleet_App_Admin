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
        height: Dimensions.get('window').height / 2,
    },
    body: {
        flex: 1,
        width: Dimensions.get('window').width,
        paddingHorizontal: 30,
        alignItems: 'center',
        maxHeight: 140,
    },
    body_: {
        flex: 1,
        width: Dimensions.get('window').width,
        paddingHorizontal: 30,
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    textView: {
        flex: 1,
        // height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        // paddingBottom:10,
        borderColor: '#dfdfdf',
        borderBottomWidth: 1,
        // backgroundColor: 'red',
    },
    img: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        marginRight: 15,
    },
    textInput: {
        flex: 1,
        minHeight: 40,
        fontSize: 14,
        padding: 0,
    },
    buttonView_submit: {
        width: Dimensions.get('window').width - 60,
        height: 44,
        borderRadius: 6,
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
    buttonView_code_: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        // backgroundColor: 'red',
        // borderRadius: 3,
        // borderColor: '#f3f3f3',
        // borderWidth: 1,
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
        height: 60,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red',

    },
    changeTypeLabel: {
        fontSize: 12,
        color: '#1c1c1d',
    },
    changeLabel: {
        fontSize: 14,
        color: '#1c1c1d',
    },
    changeLanguageView: {
        flex: 1,
        paddingBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    changeLabelView: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    forgetView: {
        backgroundColor: '#fff',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 30,
    },
    forgetTitleView: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    forgetTitle: {
        fontSize: 14,
        color: '#9797a3',
    },
    forgetTextView: {
        width: Dimensions.get('window').width - 100,
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        borderColor: '#f3f3f3',
        borderBottomWidth: 1,
    },

    forgetBtn: {
        width: Dimensions.get('window').width - 100,
        height: 44,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#24ba8e',
        marginTop: 40,
    },
})







