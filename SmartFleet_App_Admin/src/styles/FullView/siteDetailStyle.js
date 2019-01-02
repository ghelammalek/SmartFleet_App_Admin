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
        height: 50,
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
        marginLeft: 8,
    },
    markImage: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginRight: 3,
        // backgroundColor: 'blue'
    },

    message: {
        // flex: 1,
        fontSize: 14,
        color: '#2d2d2d',
        lineHeight: 16,
        textAlign: 'center',
        // backgroundColor: 'red'
    },
    message_: {
        flex: 1,
        fontSize: 14,
        color: '#2d2d2d',
        lineHeight: 16,
        textAlignVertical: 'center',
        // backgroundColor: 'red'
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
        height: 50,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        // marginTop: 12,
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
    mapBtn: {
        flex: 1,
        marginTop: -220,
        height: 220,
    },
    mapMsgView: {
        top: 0,
        width: Dimensions.get('window').width - 50,
        height: 95,
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column'
    },
    mapArrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderLeftColor: 'transparent',
        borderRightWidth: 8,
        borderRightColor: 'transparent',
        borderTopColor: '#fff',
        borderTopWidth: 10,
    },
    mapMsg: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 36,
        minWidth: 60,
        maxWidth: Dimensions.get('window').width * 2 / 3,
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    space: {
        backgroundColor: '#24ba8e',
        width: 4,
        height: 20,
        marginRight: 8,
    },
    timeView: {
        flex: 1,
        marginTop: 5,
        minHeight: 30,
        paddingRight: 8,
        marginBottom: -8,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: 'red',
        flexDirection: 'row',
    },
    time: {
        fontSize: 14,
        color: '#9797a3'
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 3,
        minHeight: 50,
        paddingVertical: 8,
    },
    detailItem_: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginHorizontal: 3,
        minHeight: 50,
        paddingVertical: 8,
    },
    line_vertical: {
        // flex: 1,
        width: 1,
        height: 50,

        backgroundColor: '#f3f3f3',
    },
    line_horizontal: {
        flex: 1,
        height: 1,
        backgroundColor: '#f3f3f3',
    },
    detailLabelView: {
        maxWidth: Dimensions.get('window').width / 2 - 60,
        paddingHorizontal: 3
    },
    detailLabel: {
        // flex: 2,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d2d2d',
        // backgroundColor: 'green',
    },

    chartView: {
        // flex: 1,
        height: 240,
        marginTop: 12,
    },

    trendTitleView: {
        // flex: 1,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        marginRight: 5,
        // backgroundColor: 'red'
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#24ba8e',
        borderBottomWidth: 2,
        height: 40,
        paddingBottom: 5,
    },
    btn_: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingBottom: 5,
    },
    btnTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#24ba8e',
    },
    btnTitle_: {
        fontSize: 12,
        color: '#2d2d2d',
    },
    line: {
        width: Dimensions.get('window').width,
        height: 1,
        backgroundColor: '#f3f3f3',
        marginLeft: -12,
    },
    moreView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 40,
        paddingBottom: 5,
    },
    more: {
        fontSize: 12,
        color: '#9797a3',
    },
    moreBtn: {
        width: 14,
        height: 16,
        resizeMode: 'contain',
    },

    unflodBtn: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f3f3'
    },
    unflodBtnTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#24ba8e',
    },
    messageView: {
        flex: 1,
        // alignItems: 'flex-end',
        paddingRight: 8,
    },
    messageView_: {
        flex: 1,
        // alignItems: 'flex-end',
        // paddingRight: 3,
    }
});