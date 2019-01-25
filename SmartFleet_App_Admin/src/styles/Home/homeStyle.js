import {
    StyleSheet,
    Dimensions,
} from 'react-native';

export default homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    scrollView: {
        paddingHorizontal: 10,
    },
    separator: {
        backgroundColor: '#dfdfdf',
        height: 0.5,
    },
    space_horizontal: {
        width: 20,
    },
    space_Vertical: {
        height: 20,
    },

    flex_row: {
        flexDirection: 'row',
    },
    flex_column: {
        flexDirection: 'column',
    },
    staticView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 3,
        flexWrap: 'wrap',
        paddingVertical: 5,
    },
    staticView_: {
        width: (Dimensions.get('window').width - 32) / 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 3,
        paddingLeft: 15,
        paddingRight: 3,
        marginTop: 10,
    },
    static_titleView: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    static_subView: {
        // marginTop: 3,
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    static_title: {
        fontSize: 18,
        color: '#2d2d2d',
        fontWeight: 'bold',
        marginRight: 2,
    },
    static_sunTitle: {
        fontSize: 12,
        color: '#adadad',
        marginBottom: 3,
    },
    static_image: {
        width: 40,
        height: 40,
        marginVertical: 15,
        resizeMode: 'contain',
        marginRight: 8,
    },

    bodyView: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 3,
        marginBottom: 12,
    },
    titleView: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
        height: 40,
        backgroundColor: '#fff',
    },
    btnView: {
        height: 40,
        marginRight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    btnView_: {
        height: 40,
        marginRight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#24ba8e',
        borderBottomWidth: 2,
        // backgroundColor: 'red',
    },
    btnTitle: {
        fontSize: 12,
        // fontWeight: 'bold',
        color: '#2d2d2d',
    },
    btnTitle_: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#24ba8e',
    },

    topView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    topMarkView: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginRight: 12,
        borderRadius: 10,
    },
    topMarkLabel: {
        fontSize: 12,
        color: 'white',
    },
    topMarkLabel_: {
        fontSize: 12,
        color: '#2d2d2d',
    },
    topNameView: {
        flex: 1,
        marginHorizontal: 12,
    },

    itemView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderColor: '#f3f3f3',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 10,
    },
    itemTopView: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
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
        // fontWeight: 'bold',
        color: '#2d2d2d',
    },
    time: {
        fontSize: 12,
        color: '#adadad',
    },
    imgagRight: {
        marginLeft: 3,
        width: 9,
        height: 11,
        resizeMode: 'contain',
    },
    itemBodyView: {
        paddingTop: 20,
        paddingHorizontal: 8,
        flexDirection: 'column',
    },
    itemTextView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
    },
    itemText: {
        fontSize: 12,
        color: '#2d2d2d',
    },
    itemClearView: {
        marginLeft: 5,
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: '#adadad',
        borderRadius: 3,
    },
    itemClearView_: {
        marginLeft: 5,
        paddingHorizontal: 5,
        paddingVertical: 3,
        backgroundColor: '#24ba8e',
        borderRadius: 3,
    },
    itemClear: {
        fontSize: 12,
        color: '#fff',
    },
    itemLevelImage: {
        marginLeft: 5,
        width: 14,
        height: 14,
        resizeMode: 'contain',
    },

    nodataView: {
        flex: 1,
        minHeight: 200,
        backgroundColor: '#fff',
    },
    moreView: {
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        marginRight: -12
    },
    moreImage: {
        width: 16,
        height: 16,
        resizeMode: 'contain'
    },
    line: {
        width: Dimensions.get('window').width,
        height: 1,
        backgroundColor: '#f3f3f3',
        marginLeft: -12,
        // marginBottom: 6,
    }
});