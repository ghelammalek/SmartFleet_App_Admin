import {
    StyleSheet
} from 'react-native';

import { Dimensions } from 'react-native';

export default homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    itemView: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    itemviewLeft: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 20,
    },
    topView: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    itemName: {
        fontSize: 16,
        color: '#1c1c1d',
        // fontWeight: 'bold',
        marginRight: 10,
    },
    bodyView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textBody: {
        fontSize: 14,
        color: '#1c1c1d',
    },
    texView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 3,
    },
    image_right: {
        width: 13,
        height: 16,
        resizeMode: 'contain',
    },
    separator: {
        backgroundColor: '#dfdfdf',
        height: 0.5,
    },

    staticView: {
        width: Dimensions.get('window').with,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 0.5,
    },

    image: {
        width: 50,
        height: 50,
        marginVertical: 8,
        resizeMode: 'contain',
    },
    rightView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 8,
    },
    titleView: {
        // paddingVertical: 10,
        height: 40,
        paddingHorizontal: 16,
        borderColor: '#dfdfdf',
        borderWidth: 0.5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    moreEvents: {
        padding: 8,
    },
    btnTitle: {
        fontSize: 14,
        color: '#24ba8e',
    },
    textView: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 8,
        marginTop: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    text1: {
        fontSize: 16,
        color: '#1c1c1d',
    },
    text2: {
        fontSize: 14,
        color: '#9797a3',
    },
    text3: {
        fontSize: 26,
        color: '#1c1c1d',
    },
    text4: {
        fontSize: 16,
        color: '#1c1c1d',
    },
    text5: {
        fontSize: 14,
        color: '#1c1c1d',
    },
});