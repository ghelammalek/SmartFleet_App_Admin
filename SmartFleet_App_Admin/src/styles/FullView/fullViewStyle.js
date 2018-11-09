import {
    StyleSheet,
    Dimensions
} from 'react-native';

export default fullViewStyle = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 40
    },
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    tabbar: {
        width: Dimensions.get('window').width,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    lineStyle: {
        marginBottom: -1.5,
        width: Dimensions.get('window').width / 2,
        height: 2,
        backgroundColor: '#24ba8e',
    },
    textStyle: {
        flex: 1,
        fontSize: 20,
        // marginTop: 20,
        textAlign: 'center',
    },


    bodyView: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        paddingHorizontal: 10,
        // borderRadius: 3,
    },
    itemView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderColor: '#f3f3f3',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 10,
    },
    itemTopView: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
    },
    itemTopLeft: {
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 8,
    },
    itemTopRight: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d2d2d',
    },
    time: {
        fontSize: 12,
        color: '#adadad',
    },
    imgagRight: {
        marginLeft: 3,
        width: 10,
        height: 11,
        resizeMode: 'contain',
    },
    itemBodyView: {
        paddingTop: 10,
        paddingHorizontal: 10,
        flexDirection: 'column',
        // backgroundColor: 'red',
    },
    itemTextView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 12,
    },
    itemText: {
        fontSize: 12,
        color: '#2d2d2d',
    },
    itemClear: {
        marginLeft: 5,
        fontSize: 12,
        color: '#fff',
        padding: 3,
        backgroundColor: '#adadad',
    },
    itemClear_: {
        marginLeft: 5,
        fontSize: 12,
        color: '#fff',
        padding: 3,
        backgroundColor: '#24ba8e',
    },
    itemLevelImage: {
        marginLeft: 3,
        width: 12,
        height: 12,
        resizeMode: 'contain',
    },

    nodataView: {
        flex: 1,
        minHeight: 300,
        backgroundColor: '#fff',
    },


    refreshView: {
        position: 'absolute',
        bottom: 90,
        right: 20,
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addView: {
        position: 'absolute',
        bottom: 25,
        right: 20,
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    refreshImage: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
    },
});