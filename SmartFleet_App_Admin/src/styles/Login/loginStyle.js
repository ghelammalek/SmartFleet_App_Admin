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
        width: 20,
        height: 20,
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
        // backgroundColor: 'red',
    },
    changeLabelView: {
        height: 30,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})







