import {
    StyleSheet
} from 'react-native';

import { Dimensions } from 'react-native';

export default siteDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    navBarTitle: {
        fontSize: 14,
        color: '#2d2d2d',
        fontWeight: 'bold',
    },
    topItemView: {
        // flex: 1,
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: 1,
    },
    topTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2d2d2d',
    },
    topImage: {
        width: 14,
        height: 16,
        resizeMode: 'contain',
    },
    bodyItemView: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        borderRadius: 5,
    },
    addressView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    row_left: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    row_right: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    markImage: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginRight: 3,
        // backgroundColor: 'blue'
    },
    message: {
        flex: 1,
        fontSize: 14,
        color: '#2d2d2d',
        lineHeight: 16,
    },
    weatherImage: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    weatherValue: {
        fontSize: 24,
        color: '#2d2d2d',
        fontWeight: 'bold',
    },
    eventItemView: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginTop: 12,
    },
    eventImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 7,
    },
    eventRightImage: {
        width: 14,
        height: 16,
        resizeMode: 'contain',
        marginLeft: 6,
    },
    eventTime: {
        fontSize: 12,
        color: '#adadad',
    },

    mapView: {
        flex: 1,
        height: 220,
        marginTop: 12,
    },

    detailView: {
        borderWidth: 1,
        borderColor: '#f3f3f3',
        borderRadius: 5,
        marginTop: 12,
    },
    detailItemView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 8,
    },
    line_vertical: {
        width: 1,
        height: 50,
        backgroundColor: '#f3f3f3',
    },
    line_horizontal: {
        flex: 1,
        height: 1,
        backgroundColor: '#f3f3f3',
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d2d2d',
    }


});