import {
    StyleSheet
} from 'react-native';

import { Dimensions } from 'react-native';

export default homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    scrollView: {
        padding: 10,
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
    },
    staticView_: {
        minWidth: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: 8,
        marginBottom: 8,
    },
    static_titleView: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    static_title: {
        fontSize: 16,
        color: '#1c1c1d',
    },
    static_sunTitle: {
        fontSize: 11,
        color: '#9797a3',
    },
    static_image: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 8,
    },

    titleView: {
        height: 40,
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 0.5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 8,
        marginTop: 16,
    },
    moreEvents: {
        padding: 10,
    },
    btnImage: {
        width: 20,
        height: 16,
        resizeMode: 'contain',
    },


    itemView: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    itemviewLeft: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 20,
    },
    itemTitleView: {
        flexDirection: 'row',
        // marginBottom: 5,
    },
    itemName: {
        fontSize: 14,
        color: '#1c1c1d',
        marginRight: 10,
    },
    textBody: {
        fontSize: 12,
        color: '#9797a3',
    },
    texView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: 8,
    },
    image_right: {
        width: 13,
        height: 16,
        marginVertical: 5,
        resizeMode: 'contain',
    },
});