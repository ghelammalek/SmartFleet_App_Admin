import {
    StyleSheet,
    Dimensions
} from 'react-native';

export default historyStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    TabBarTop: {
        height: 40,
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
    },
    topView: {
        width: Dimensions.get('window').width,
        height: 44,
        backgroundColor: '#fff',
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
    },
    siftBtnView: {
        flex: 1,
        // minWidth: 80,
        flexDirection: 'row',
        height: 44,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    siftBtnImage: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    datePicker: {
        height: 40,
        width: Dimensions.get('window').width / 2,
    },
    siftView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 40,
        top: 1,
        position: 'absolute',
        marginTop: 40,
        // backgroundColor: 'red',
    },
    timeTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d2d2d',
    },
    timeLable: {
        fontSize: 14,
        color: '#24ba8e',
    },
    body: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    scrollView: {
        padding: 12,
    },
    trendTitleView: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    btnView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        marginRight: 12,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#24ba8e',
        borderBottomWidth: 2,
        height: 40,
        minWidth: 60,
        paddingBottom: 5,
    },
    btn_: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        minWidth: 60,
        paddingBottom: 5,
    },

    statictView: {
        flex: 1,
        paddingHorizontal: 8,
        marginTop: 12,
        backgroundColor: '#fbfbfb',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 3,
    },
    statictItem: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    statictItem_: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    statictPoint: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#adadad',
        marginRight: 7,
    },
    text14_bold: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d2d2d',
    },
    text14: {
        flex: 1,
        fontSize: 14,
        color: '#2d2d2d',
    },

    eventView: {
        flex: 1,
        marginTop: 12,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 3,
    },
    customBtnView: {
        width: 70,
        height: 40,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(28,28,29,0.3)',
    },
    itemView_: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
    },
    itemView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    itemStateView_: {
        height: 40,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0',
    },
    itemStateView: {
        height: 50,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0',
    },
    itemTimeView_: {
        height: 40,
        width: 140,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0',
        paddingHorizontal: 8,
    },
    itemTimeView: {
        height: 50,
        width: 140,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0',
        paddingHorizontal: 8,
    },
    itemMesgView_: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 40,
        paddingHorizontal: 8,
    },
    itemMesgView: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 50,
        paddingHorizontal: 8,
    },
    itemImage: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },


    detailItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        height: 50,
    },

    recordImage: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
    recordLable: {
        marginLeft: 8,
        marginRight: 12,
    },
    recordTitleView: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: -12,
        paddingHorizontal: 12,
        backgroundColor: '#fdfdfd',
    },
    recordView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    recordLeftView: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 15,
        marginRight: 13,
    },
    recordLine: {
        width: 1,
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    recordRightView: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: 30,
        // backgroundColor: 'red'
    },
    recordTimeView: {
        height: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 6,
    },
    recordTime: {
        color: '#adadad',
        fontSize: 12,
    },
    recordMsg: {
        color: '#2d2d2d',
        fontSize: 14,
    },

    mapView: {
        flex: 1,
        height: 150,
    },
    mapViewBtn: {
        top: 12,
        width: Dimensions.get('window').width,
        height: 150,
        position: 'absolute',
        // backgroundColor: 'red'
    },
    nodataView: {
        flex: 1,
        minHeight: 200,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    nodataView_: {
        flex: 1,
        minHeight: 200,
        backgroundColor: '#fff',
    },
})