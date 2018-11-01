import {
    StyleSheet
} from 'react-native';

import { Dimensions } from 'react-native';

export default eventStyle = StyleSheet.create({
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
    datePicker: {
        height: 40,
        width: Dimensions.get('window').width / 2,
    }
});