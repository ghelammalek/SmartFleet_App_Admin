import {
    StyleSheet
} from 'react-native';

import { Dimensions } from 'react-native';

export default siteDetailStyle = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 40
    },
    container: {
        flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: '#fff',
    },
    mapView: {
        width: Dimensions.get('window').width,
        height: 180,
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
        // backgroundColor: 'green',
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

    horizontal: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    frame: {
        width: Dimensions.get('window').width / 2,
        paddingTop: 8,
        paddingRight: 5,
    },
    title: {
        flex: 0,
        fontSize: 14,
        color: '#1c1c1d',
    },
    subTitle: {
        flex: 1,
        fontSize: 14,
        color: '#9797a3',
    },
    textFont: {
        // margin: 5,
        marginTop: 8,
        marginBottom: 0,
        fontSize: 14,
        color: '#00BFFF',
    }
});