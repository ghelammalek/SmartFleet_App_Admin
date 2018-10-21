import {
    StyleSheet
} from 'react-native';

import { Dimensions } from 'react-native';

export default eventDetailStyle = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 40
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    tabbar: {
        width: Dimensions.get('window').width,
        height: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    lineStyle: {
        marginBottom: -1.5,
        width: Dimensions.get('window').width / 2,
        height: 2,
        backgroundColor: '#FF0000',
    },
    textStyle: {
        flex: 1,
        fontSize: 20,
        // marginTop: 20,
        textAlign: 'center',
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
});